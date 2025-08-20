# Laxmi - Smart Waste Management Backend

## Overview
The backend of the Laxmi Smart Waste Management system is built using Flask and is responsible for handling API requests, managing database operations, and processing machine learning predictions. It also facilitates communication between the IoT sensors, client-side application, and admin panel.

## Tech Stack
- **Framework**: Flask (Python)
- **Database**: MongoDB
- **Routing**: Flask Blueprints
- **Machine Learning Models**:
  - **Fill Prediction Model**: Predicts when each dustbin will be full based on historical data.
  - **Routing Model**: Optimizes garbage collection routes based on real-time data and vehicle capacity.
- **IoT Communication**: ESP Files (for transferring data from ESP sensors to the database)

## Features

### 🗑 IoT Sensor Data Handling
- ESP-based sensors send real-time waste level data to the backend.
- The backend processes and stores this data in MongoDB.

### 🔮 Waste Fill Prediction
- Uses a machine learning model to predict which dustbins will be full in the next 24 hours or a week.
- Helps in planning efficient waste collection schedules.

### 🚛 Optimal Route Planning
- Generates an optimized waste collection route based on:
  - Real-time waste levels
  - Vehicle capacity
  - Landfill/dumpster location
- Ensures efficient waste collection with minimal resource usage.

### 🌐 API Endpoints
The backend provides RESTful API endpoints for:
- **Admin Panel**: Fetching live dustbin statuses, managing complaints, and sending notifications.
- **Client Application**: Allowing users to report complaints, view waste data, and receive notifications.
- **IoT Sensors**: Receiving sensor data and updating the database.

## Installation & Setup
```bash
# Clone the repository
git clone https://github.com/Vickeysvibe/lakshmi-smart-waste-backend

# Navigate to the backend folder
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows
venv\Scripts\activate
# On Mac/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the Flask application
python app.py
```

## Contribution
1. Fork the repository
2. Create a new branch (`feature-branch`)
3. Commit changes and push to your branch
4. Open a pull request

## License
This project is licensed under the MIT License.

