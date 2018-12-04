from flask import Flask
from flask import render_template
from pymongo import MongoClient
from pprint import pprint
import json
import os
from os.path import join, dirname
from dotenv import load_dotenv

app = Flask(__name__)

dotenv_path = join(dirname(__file__),'.env')
load_dotenv(dotenv_path)

MONGO_URI = os.environ.get('MONGODB_URI')
DBS_NAME = os.environ.get('MONGO_DB_NAME')

PBP_2017_COLLECTION_NAME = 'pbp_2017_bare_min_merged'

@app.route('/')
def index():
    """
    A Flask view to serve the main dashboard page.
    """
    return render_template('index.html')


@app.route('/pbp_2017')
def nfl_data():
    """
    A Flask view to serve the project data from
    MongoDB in JSON format.
    """

    # A constant that defines the record fields that we wish to retrieve.
    PBP_FIELDS = {
        '_id': False, 'RunLocation': True, 'PassOutcome': True, 'down': True, 'PlayType': True, 'YardsGained': True, 'qtr': True, 'Position': True, 'posteam': True, 'GameID': True, 'PassLength': True, 'RunGap': True, 'PassLocation': True, 'Week': True
    }

    # Open a connection to MongoDB using a with statement such that the
    # connection will be closed as soon as we exit the with statement
    #with MongoClient(MONGODB_HOST, MONGODB_PORT) as conn:
    with MongoClient(MONGO_URI) as conn:
        # Define which collection we wish to access
        pbp_2017_collection = conn[DBS_NAME][PBP_2017_COLLECTION_NAME]

        # Retrieve a result set only with the fields defined in FIELDS
        # and limit the the results to 100000
        pbp_2017 = pbp_2017_collection.find(projection=PBP_FIELDS, limit=100000)

        return json.dumps(list(pbp_2017))

if __name__ == '__main__':
    app.run(debug=False)