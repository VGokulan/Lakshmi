from flask import Flask, request
import snowflake.connector
from datetime import datetime
import holidays

app = Flask(__name__)

# Snowflake connection details
SNOWFLAKE_USER = 'srikanth'
SNOWFLAKE_PASSWORD = 'Srik@2005'
SNOWFLAKE_ACCOUNT = 'mvzaemy-ha30008'
SNOWFLAKE_WAREHOUSE = 'COMPUTE_WH'
SNOWFLAKE_DATABASE = 'WASTE_MANGE'
SNOWFLAKE_SCHEMA = 'DATA'
SNOWFLAKE_ROLE = 'ACCOUNTADMIN'

# Create a holiday object for your country (e.g., India, USA)
indian_holidays = holidays.India()  # Replace 'India()' with the country of interest

# Snowflake connection function
def get_snowflake_connection():
    conn = snowflake.connector.connect(
        user=SNOWFLAKE_USER,
        password=SNOWFLAKE_PASSWORD,
        account=SNOWFLAKE_ACCOUNT,
        warehouse=SNOWFLAKE_WAREHOUSE,
        database=SNOWFLAKE_DATABASE,
        schema=SNOWFLAKE_SCHEMA,
        role=SNOWFLAKE_ROLE
    )
    return conn

@app.route('/upload', methods=['POST'])
def upload():
    # Receiving data from the form (with dummy values for fields other than fill_level)
    bin_id = "B0001"  # Dummy bin_id, could be dynamic
    location = "Arasur, Coimbatore"
    latitude =  "11.1363"
    longitude = "77.0123"
    # Get current timestamp
    current_timestamp = datetime.now()
    timestamp = current_timestamp.strftime('%Y-%m-%d %H:%M:%S')  # Format the timestamp 
    day = current_timestamp.strftime('%A') 
    # Check if the current date is a holiday
    is_holiday = 1 if current_timestamp.date() in indian_holidays else 0  # 1 if holiday, 0 if not
    fill_level = request.form.get('garbage_fill')  # This comes from POST request
    weight=(float(fill_level)/100)*2
    # Basic validation for fill_level (required value)
    if fill_level:
        try:
            fill_level = float(fill_level)  # Convert fill_level to float for validation
            if fill_level < 0 or fill_level > 100:
                return "Invalid Garbage Fill Percentage. Must be between 0 and 100.", 400

            # Print or log received data for testing purposes
            print(f"Bin ID: {bin_id}, Location: {location}, Latitude: {latitude}, Longitude: {longitude}, "
                  f"Day: {day}, Timestamp: {timestamp}, Fill Level: {fill_level}%, Weight: {weight}kg, Holiday: {is_holiday}")

            # Snowflake database insertion
            conn = get_snowflake_connection()
            try:
                cur = conn.cursor()
                query = """
                INSERT INTO bins (Bin_ID, Location, Latitude, Longitude, Day, Timestamp, Fill_Level_Percentage, Weight_kg, Holiday)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                """
                values = (bin_id, location, latitude, longitude, day, timestamp, fill_level, weight, is_holiday)
                cur.execute(query, values)
                conn.commit()
                cur.close()
                return "Data Inserted Successfully into Snowflake", 200
            except Exception as e:
                return f"Database error: {e}", 500
            finally:
                conn.close()

        except ValueError:
            return "Invalid data. Please provide a valid percentage.", 400
    else:
        return "No Garbage Fill Data Received", 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
