# Lakshmi Smart Waste Management System

## Overview

Even in developing areas, garbage overflow and street littering persist despite existing waste collection systems. Poor waste management practices contribute to environmental degradation and pose serious public health risks.

The **Lakshmi Smart Waste Management System** is an innovative solution designed to address these urban challenges. By leveraging real-time sensor data and predictive analytics, Lakshmi optimizes waste collection, prevents bin overflow, ensures timely responses to cleanliness issues, and enhances both operational efficiency and environmental sustainability.

---

## Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Installation](#installation)
* [Usage](#usage)
* [Technologies Used](#technologies-used)
* [Project Structure](#project-structure)
* [Contributing](#contributing)
* [Contact](#contact)

---

## Features

### 1. Optimized Waste Collection

Real-time sensor data tracks bin levels, ensuring efficient collection and reduced operational costs.
![Real-time Monitoring](https://github.com/user-attachments/assets/a8315530-5513-43e3-a541-2e4bbc7b5715)

---

### 2. Preventing Overflow & Littering

Predictive models forecast waste patterns, especially during public events, reducing the chance of overflow.
![Prediction in Action](https://github.com/user-attachments/assets/ab871093-86ae-49ef-bf9d-df186e79b358)

---

### 3. Dynamic Event-Based Allocation

When an event is scheduled, the system automatically allocates garbage collection resources at the event location via the app.
![Event Allocation](https://github.com/user-attachments/assets/a1c66967-e540-4956-8999-4a49be12a12f)

![Dynamic Allocation UI](https://github.com/user-attachments/assets/71833b44-1bd1-414f-8cec-73d6bb85765b)


---

### 4. Immediate Response to Cleanliness Issues

A public photo-reporting feature enables rapid response to cleanliness complaints.
![Photo Reporting](https://github.com/user-attachments/assets/37c00237-4ff2-4336-8d57-21239e476c3e)

![Complaint Management](https://github.com/user-attachments/assets/2975e959-b69b-4943-baed-850bf60c926f)


---

### 5. Efficient Fleet Utilization

Predictive vehicle allocation minimizes fuel usage and vehicle wear and tear.
![Fleet Efficiency](https://github.com/user-attachments/assets/cbe3d895-32ae-4685-ba20-8ff173b95098)

---

### 6. Announcements

Events and critical updates can be broadcast to users and authorities to coordinate actions.
![Announcements Panel](https://github.com/user-attachments/assets/df5fcab8-07f5-46ab-87ba-3d4b55b3fd49)

![Event Notification](https://github.com/user-attachments/assets/86518b20-ad33-48ff-89ba-a0852dcaac57)


---

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/username/smart-waste-management.git
cd smart-waste-management
```

### Step 2: Set Up Virtual Environment

```bash
python -m venv env
# Linux/MacOS
source env/bin/activate
# Windows
env\Scripts\activate
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 4: Setup Backend

Ensure backend files are configured properly.

```bash
python app.py
```

### Step 5: Setup Frontend (AHP32)

```bash
npm install
npm run build
```

### Step 6: Setup IoT Sensors (ESP32)

* Connect ultrasonic sensors to bins
* Configure ESP32 with the appropriate MQTT broker or HTTP server
* Use libraries such as `wifi.h`, `httpclient.h`, and `newping.h`

---

## Usage

### 1. Start Sensor Data Collection

```bash
python sensor_data_collection.py
```

### 2. Run Predictive Model

```bash
python waste_prediction.py
```

### 3. Access Dashboard

```bash
python dashboard.py
```

### 4. Launch Chatbot Interface

```bash
python chatbot.py
```

---

## Technologies Used

| Category      | Tools/Technologies                                              |
| ------------- | --------------------------------------------------------------- |
| Frontend      | HTML, CSS, JavaScript                                           |
| Backend       | Python (Flask), MongoDB                                         |
| Frameworks    | TensorFlow, PyTorch, Google Maps API                            |
| ML Models     | Ensemble Model (Random Forest, XGBoost, Gradient Boosting), KNN |
| IoT Hardware  | ESP32, Ultrasonic Sensors                                       |
| IoT Libraries | `wifi.h`, `httpclient.h`, `newping.h`                           |
| Storage       | MongoDB                                                         |

---

## Project Structure

```
smart-waste-management/
│
├── backend/
│   ├── app.py
│   ├── dashboard.py
│   ├── waste_prediction.py
│   └── chatbot.py
│
├── frontend/
│   └── [React or HTML/CSS/JS files]
│
├── sensors/
│   └── sensor_data_collection.py
│
├── requirements.txt
└── README.md
```

![Folder Structure](https://github.com/user-attachments/assets/be5bb119-7b27-4e64-a66c-50029ab00a90)

---
