from flask import Blueprint, jsonify
from datetime import datetime
import pandas as pd
from pymongo import MongoClient
import os
from flask_cors import cross_origin

# Use os.path to create a platform-independent path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BIN_DATA_FILE = os.path.join(BASE_DIR, '..', 'data', 'garbage_data_check2.csv')

cluster = MongoClient(os.getenv('MONGODB_URL'))
db = cluster['final']
collection = db['garbages']

dashboard = Blueprint("dashboard", __name__)

@dashboard.route("/", methods=["GET"])
@cross_origin() # Allow CORS requests from any origin
def index():
    blocs = {
        "bins": 81,
        "trucs": 20,
        "events": 8,
        "overfill": 16,
        "fuel": 60,
        "garbageCollected": 1303,
        "costs": 5200,
        "distance": 350
    }

    # Load top locations from MongoDB
    locations = get_top_locations()

    response_data = {
        "blocs": blocs,
        "locations": locations
    }
    return jsonify(response_data)

def get_top_locations(top_n=5):
    try:
        today = datetime.now().strftime('%Y-%m-%d')
        today_data = list(collection.find({"Timestamp": {"$regex": f"^{'2022-04-13'}"}}))

        if not today_data:
            return {"message": "No data found for today."}

        df = pd.DataFrame(today_data)

        #sample
        df1 = pd.read_csv(BIN_DATA_FILE)
        today1 = '2021-01-01'
        today_data1 = df1[df1['Timestamp'].str.startswith(today1)]


        top_locations = today_data1.groupby('Location').agg({
            'Weight (kg)': 'sum',
            'Fill Level (%)': 'mean',
            'Latitude': 'first',
            'Longitude': 'first'
        }).nlargest(top_n, 'Weight (kg)').reset_index()
        top_locations[['Weight (kg)', 'Fill Level (%)', 'Latitude', 'Longitude']] = \
    top_locations[['Weight (kg)', 'Fill Level (%)', 'Latitude', 'Longitude']].round(2)
        return top_locations.to_dict(orient='records')

    except Exception as e:
        return {"error": str(e)}
