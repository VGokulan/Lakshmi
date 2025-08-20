from flask import Blueprint, jsonify
import io
import base64
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import os

# Ensure non-GUI backend is used to avoid Matplotlib runtime errors
import matplotlib
matplotlib.use('Agg')

predictions = Blueprint('predictions', __name__)

# File paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BIN_DATA_FILE = os.path.join(BASE_DIR, '..', 'data', 'your_predictions_file.csv')

# Load the data once when the server starts
try:
    df1 = pd.read_csv(BIN_DATA_FILE)
except FileNotFoundError:
    raise Exception(f"Data file not found at {BIN_DATA_FILE}")


def create_static_main_graph():
    plt.figure(figsize=(10, 7))
    overall_avg = df1.groupby('Day')['Predicted Fill Level (%)'].mean()  # Calculate average for all locations
    plt.plot(overall_avg.index, overall_avg.values, marker='o', color='green', label='Overall Average Fill Level (%)')
    plt.title('Overall Garbage Fill Level')
    plt.xlabel('Days')
    plt.ylabel('Predicted Fill Level (%)')
    plt.xticks(rotation=45)
    plt.grid()
    plt.legend()

    # Save plot to a PNG in memory
    img = io.BytesIO()
    plt.savefig(img, format='png', bbox_inches='tight')
    img.seek(0)
    plt.close()
    return base64.b64encode(img.getvalue()).decode()


# Create density plot for a given location
def create_density_plot(location):
    specific_data = df1[df1['Location'] == location]
    if specific_data.empty:
        return None  # Handle case where location data is not found

    plt.figure(figsize=(10, 7))
    sns.kdeplot(data=specific_data, x='Predicted Fill Level (%)', fill=True, color='green', alpha=0.5)
    plt.title(f'Density Plot of Predicted Fill Level for {location}')
    plt.xlabel('Predicted Fill Level (%)')
    plt.ylabel('Density')
    plt.grid()

    # Save plot to PNG in memory and encode as base64
    img = io.BytesIO()
    plt.savefig(img, format='png', bbox_inches='tight')
    img.seek(0)
    plt.close()
    return base64.b64encode(img.getvalue()).decode()

# Route to update the graph for a specific location
@predictions.route('/update/<location>')
def update(location):
    density_graph = create_density_plot(location)
    if not density_graph:
        return jsonify({'error': 'Location data not found'}), 404  # Handle invalid location

    return jsonify({'density_graph': density_graph})

# Route to get the initial graph and list of locations
@predictions.route('/get')
def get():
    locations = df1['Location'].unique().tolist()
    if not locations:
        return jsonify({'error': 'No locations available'}), 404  # Handle no locations case

    density_graph = create_density_plot(locations[0])

    return jsonify({'density_graph': density_graph, 'locations': locations, 'main_graph': create_static_main_graph()})
