import pandas as pd
import ast
import requests
from geopy.distance import geodesic
import googlemaps
import time
import os
import folium
import polyline
from flask import Blueprint, request, jsonify
from flask_cors import CORS
import requests
import polyline

# Replace with your actual Google Maps API key
if not os.path.exists('static/vehicle_maps'):
    os.makedirs('static/vehicle_maps')

# Load Google Maps API key from environment variables
API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")
if not API_KEY:
    raise ValueError("Google Maps API Key not set. Please set the environment variable 'GOOGLE_MAPS_API_KEY'.")
gmaps = googlemaps.Client(key=API_KEY)

routes = Blueprint('routes', __name__)

def get_coordinates(location):
    """Get latitude and longitude of a location using Google Maps API."""
    try:
        url = f"https://maps.googleapis.com/maps/api/geocode/json?address={location}&key={API_KEY}"
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        coords = data['results'][0]['geometry']['location']
        return [coords['lat'], coords['lng']]
    except Exception as e:
        print(f"Error fetching coordinates for {location}: {e}")
        return None

@routes.route('/api/get_vehicle_map', methods=['POST'])
def get_vehicle_map():
    """API to get vehicle route map data including polyline and waypoints."""
    try:
        # Extract vehicle name and checkpoints from the request
        data = request.json
        vehicle_name = data.get('vehicle_name')
        checkpoints = data.get('checkpoints', [])

        # Define the start and end points
        start_point = "Reddiarpalayam, Puducherry"
        end_point = "Kurumbapet Dumpyard, Puducherry"
        waypoints = '|'.join(checkpoints)

        # Get directions from Google Maps API
        directions_url = (
            f"https://maps.googleapis.com/maps/api/directions/json"
            f"?origin={start_point}&destination={end_point}"
            f"&waypoints={waypoints}&key={API_KEY}"
        )
        response = requests.get(directions_url)
        print(response.text)
        response.raise_for_status()
        directions = response.json()

        # Extract polyline points and decode them
        polyline_points = directions['routes'][0]['overview_polyline']['points']
        decoded_points = polyline.decode(polyline_points)

        # Prepare response data with coordinates and polyline
        result = {
            "start": get_coordinates(start_point),
            "end": get_coordinates(end_point),
            "checkpoints": [
                {"name": checkpoint, "coords": get_coordinates(checkpoint)}
                for checkpoint in checkpoints
            ],
            "polyline": decoded_points
        }

        return jsonify(result), 200

    except Exception as e:
        print(f"Error generating map data: {e}")
        return jsonify({"error": "Failed to generate map data"}), 500



# wait karoo




# Function to get coordinates of a district using Google Maps API
def get_coordinates(district_name):
    try:
        url = f"https://maps.googleapis.com/maps/api/geocode/json?address={district_name}&key={API_KEY}"
        response = requests.get(url)
        response.raise_for_status()
        results = response.json().get('results', [])
        if results:
            location = results[0]['geometry']['location']
            return location['lat'], location['lng']
    except Exception as e:
        print(f"Error fetching coordinates for {district_name}: {e}")
    return None

# Load districts from location.txt and fetch their coordinates
def load_districts(file_path):
    with open(file_path, 'r') as file:
        districts = ast.literal_eval(file.read().strip())

    district_coordinates = {}
    for district in districts:
        coords = get_coordinates(district)
        if coords:
            district_coordinates[district] = coords
        time.sleep(1)  # Avoid hitting API rate limits
    return districts, district_coordinates

# Load bin data from a CSV file
def load_bin_data(file_path):
    return pd.read_csv(file_path)

# Calculate the total weight for each district on a given date
def calculate_weights(bin_data, districts, selected_date):
    weights = {}
    filtered_data = bin_data[bin_data['Timestamp'].str.startswith(selected_date)]
    for district in districts:
        total_weight = filtered_data[filtered_data['Location'] == district]['Weight (kg)'].sum()
        weights[district] = total_weight
    return weights

# Calculate the geodesic distance between two districts
def calculate_distance(district1, district2, district_coordinates):
    coords1 = district_coordinates[district1]
    coords2 = district_coordinates[district2]
    return geodesic(coords1, coords2).km

# Create clusters of districts using DFS
def create_clusters_with_dfs(districts, district_coordinates, max_distance=5, max_stops=2):
    clusters = []
    visited = set()

    for district in districts:
        if district not in visited:
            stack = [district]
            cluster = []

            while stack and len(cluster) < max_stops:
                current = stack.pop()
                if current not in visited:
                    cluster.append(current)
                    visited.add(current)

                    for neighbor in districts:
                        if neighbor not in visited and len(cluster) < max_stops:
                            if calculate_distance(current, neighbor, district_coordinates) <= max_distance:
                                stack.append(neighbor)
            if cluster:
                clusters.append(cluster)
    return clusters

# Allocate vehicles based on clusters
def allocate_vehicles(clusters):
    vehicle_allocations = {}
    for i, cluster in enumerate(clusters):
        vehicle_allocations[f"Vehicle {i + 1}"] = cluster
    return vehicle_allocations

@routes.route('/api/run_allocation', methods=['POST'])
def run_allocation():
     try:
        # Use '01-01-2021' as the default date if no date is provided in the request
        selected_date = request.json.get('selected_date', '01-01-2021')

        # Load data
        districts, district_coordinates = load_districts('data/location.txt')
        bin_data = load_bin_data('data/garbage_data_check2.csv')

        # Calculate weights and create clusters
        weights = calculate_weights(bin_data, districts, selected_date)
        clusters = create_clusters_with_dfs(districts, district_coordinates)

        # Allocate vehicles and generate maps
        vehicle_allocations = allocate_vehicles(clusters)
        vehicles_data = []

        for vehicle, allocated_districts in vehicle_allocations.items():
            vehicles_data.append({
                "vehicle_id": vehicle,
                "assigned_districts": allocated_districts,
            })

        return jsonify(vehicles_data)
     
     except Exception as e:
        print(f"Error during allocation: {e}")
        return jsonify({"error": "An error occurred during allocation."}), 500
