from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
import cloudinary.uploader
import jwt
import uuid
from datetime import datetime, timedelta
from config import collection, users_collection

appCrud = Blueprint('appCrud', __name__)

# Configure a secret key for JWT

def generate_token(email):
    """Generate a JWT token for authentication."""
    return jwt.encode(
        {"email": email, "exp": datetime.utcnow() + timedelta(hours=24)},
        "qwertyuiopasdfghjklzxcvbnm",
        algorithm="HS256"
    )

@appCrud.route('/upload', methods=['POST'])
def upload_image():
    try:
        name = request.form.get('name')
        email = request.form.get('email')
        description = request.form.get('description')
        latitude = float(request.form.get('latitude'))
        longitude = float(request.form.get('longitude'))

        if not (name and email and description and latitude and longitude):
            return jsonify({"error": "All fields are required"}), 400

        if 'image' not in request.files:
            return jsonify({"error": "Image file is required"}), 400

        image = request.files['image']

        # Upload image to Cloudinary
        upload_result = cloudinary.uploader.upload(image, folder="complaints")
        image_url = upload_result.get('secure_url')

        # Insert complaint into MongoDB
        document = {
            "complaint_id": str(uuid.uuid4()),
            "name": name,
            "email": email,
            "description": description,
            "status": "pending",
            "latitude": latitude,
            "longitude": longitude,
            "timestamp": datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            "image_url": image_url
        }
        collection.insert_one(document)

        return jsonify({
            "message": "Complaint registered successfully",
            "complaint_id": document["complaint_id"],
            "image_url": image_url
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@appCrud.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        if users_collection.find_one({"email": email}):
            return jsonify({"error": "User already exists"}), 400

        hashed_password = generate_password_hash(password)
        users_collection.insert_one({"email": email, "password": hashed_password})

        return jsonify({"message": "User signed up successfully!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@appCrud.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        user = users_collection.find_one({"email": email})
        if not user or not check_password_hash(user["password"], password):
            return jsonify({"error": "Invalid email or password"}), 401

        token = generate_token(email)
        return jsonify({"message": "Login successful!", "token": token}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@appCrud.route('/profile', methods=['GET'])
def profile():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({"error": "Token is missing!"}), 401

    try:
        decoded = jwt.decode(token,"qwertyuiopasdfghjklzxcvbnm", algorithms=["HS256"])
        email = decoded["email"]

        user = users_collection.find_one({"email": email}, {"_id": 0, "password": 0})
        if not user:
            return jsonify({"error": "User not found"}), 404

        return jsonify({"user": user}), 200

    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token has expired!"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid token!"}), 401
