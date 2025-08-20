from flask import Flask
from routes.dashboard import dashboard
from routes.predictions import predictions
from routes.routes import routes
from routes.appCrud import appCrud
from routes.schedule import schedule
from dotenv import load_dotenv
import pandas as pd
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "PUT", "DELETE"]}})

load_dotenv()
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BIN_DATA_FILE = os.path.join(BASE_DIR, 'data', 'garbage_data_check2.csv')


app.register_blueprint(dashboard, url_prefix='/dashboard')
app.register_blueprint(predictions, url_prefix='/predictions')
app.register_blueprint(schedule, url_prefix='/schedule')
app.register_blueprint(routes, url_prefix='/routes')
app.register_blueprint(appCrud, url_prefix='/appCrud')



@app.route('/')
def hello():
    return 'Hello World!'


if __name__ == '__main__':
    app.run(debug=True)