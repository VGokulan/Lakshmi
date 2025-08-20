import cloudinary
from pymongo import MongoClient
import os
from flask import jsonify
import jwt
# Cloudinary configuration
cloudinary.config(
    cloud_name="dsxc5vmly",
    api_key=os.environ.get("CLOUDINARY_API_KEY"),
    api_secret=os.environ.get("CLOUDINARY_SECRET_KEY")
)

# MongoDB configuration
mongo_client = MongoClient(os.environ.get("MONGODB_URL"))
db = mongo_client["mail_send"]
collection = db["data"]
users_collection = db['users']
events = db['events']

def verify(token):
    if not token:
        return jsonify({"error": "Token is missing!"}), 401
    try:
        decoded = jwt.decode(token,"qwertyuiopasdfghjklzxcvbnm", algorithms=["HS256"])
        email = decoded["email"]
        return email
    except():
        return jsonify({"error": "Token is invalid!"}), 401


