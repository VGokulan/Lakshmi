from config import collection, events
from flask import Blueprint, jsonify, request
from bson import ObjectId  # Import ObjectId to check for it

schedule = Blueprint('schedule', __name__)

def serialize_document(doc):
    """Convert MongoDB document to a serializable format."""
    if isinstance(doc['_id'], ObjectId):
        doc['_id'] = str(doc['_id'])  # Convert ObjectId to string
    return doc

@schedule.route('/queries', methods=['GET'])
def get_queries():
    try:
        queries = list(collection.find())
        # Serialize each document in the queries list
        serialized_queries = [serialize_document(doc) for doc in queries]
        return jsonify(serialized_queries), 200  # Return as JSON list
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@schedule.route('/events', methods=['GET'])
def get_events():
    try:
        event_list = list(events.find())
        # Serialize each document in the event list
        serialized_events = [serialize_document(doc) for doc in event_list]
        return jsonify(serialized_events), 200  # Return as JSON list
    except Exception as e:
        return jsonify({"error": str(e)}), 500
@schedule.route('/insert', methods=['POST'])
def insert_schedule():
    data = [
    {
      "date": "2024-10-19",
      "email": "vickeydvk4@gmail.com",
      "type": "Hackathon",
      "address": "https://maps.google.com/?q=Tech+Park,+Block+B",
      "vehicleNeeded": 3,
      "personnelNeeded": 10,
    },
    {
      "date": "2024-10-21",
      "email": "vickeydvk4@gmail.com",
      "type": "Team Meeting",
      "address": "https://maps.google.com/?q=Room+101",
      "vehicleNeeded": 2,
      "personnelNeeded": 5,
    },
    {
      "date": "2024-10-25",
      "email": "vickeydvk4@gmail.com",
      "type": "Project Deadline",
      "address": "https://maps.google.com/?q=Main+Office",
      "vehicleNeeded": 1,
      "personnelNeeded": 0,
    },
  ]
    events.insert_many(data)
    return "null", 200