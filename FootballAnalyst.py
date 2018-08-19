from flask import Flask
from flask import render_template
from pymongo import MongoClient
from pprint import pprint
import json
import os

app = Flask(__name__)

#MONGODB_HOST = 'localhost'
#MONGODB_PORT = 27017
#DBS_NAME = 'NFLScrapR'

MONGO_URI = os.getenv('MONGODB_URI','mongodb://ds129010.mlab.com:29010')
DBS_NAME = os.getenv('MONGO_DB_NAME','heroku_51gxnjkc')
#PBP_2017_COLLECTION_NAME = 'pbp_2017'
PBP_2017_COLLECTION_NAME = 'pbp_2017_pass_run_only'
ROSTERS_2017_COLLECTION_NAME = 'rosters_2017'


@app.route("/")
def index():
    """
    A Flask view to serve the main dashboard page.
    """
    return render_template("index.html")


@app.route("/pbp_2017")
def nfl_data():
    """
    A Flask view to serve the project data from
    MongoDB in JSON format.
    """

    # A constant that defines the record fields that we wish to retrieve.
    #PBP_FIELDS = {
    #    '_id': False, 'GameID': True, 'Date': True, 'Week':True, 'posteam': True, 'DefensiveTeam': True,'YardsGained': True, 'PassAttempt': True, 'PassLocation': True, 'PassOutcome': True,
    #    'Receiver_ID': True
    #}
    #PLAYER_FIELDS = {
    #    '_id': False, 'GSIS_ID': True, 'Pos': True
    #}
    #COMBO_FIELDS = {
    #    'Pos': True
    #}

    # Open a connection to MongoDB using a with statement such that the
    # connection will be closed as soon as we exit the with statement
    #with MongoClient(MONGODB_HOST, MONGODB_PORT) as conn:
    with MongoClient(MONGO_URI) as conn:
        # Define which collection we wish to access
        pbp_2017_collection = conn[DBS_NAME][PBP_2017_COLLECTION_NAME]
        rosters_2017_collection = conn[DBS_NAME][ROSTERS_2017_COLLECTION_NAME]

        # Retrieve a result set only with the fields defined in FIELDS
        # and limit the the results to 55000
        #pbp_2017 = pbp_2017_collection.find(projection=PBP_FIELDS, limit=100000)
        #rosters_2017 = rosters_2017_collection.find(projection=PLAYER_FIELDS, limit=100000)

        #merge collections together based on Receiver_ID and GSIS_ID

        pipeline = [
            {
                "$match":
                {
                    #"PassAttempt": 1,
                    #"PlayAttempted":1
                    #"RushAttempt":1
                    "$or": [{"PlayType":"Pass"},{"PlayType":"Run"}]
                    #"PlayType": "Pass"
                }
            },
            {
                "$lookup":
                {
                    "from": "rosters_2017",
                    "localField": "Receiver_ID",
                    "foreignField": "GSIS_ID",
                    "as": "receiverInfo"
                }
            },
            {
                "$unwind":"$receiverInfo"
            },
            {
                "$project":
                {
                    "_id": 0,
                    "GameID": 1,
                    "posteam":1,
                    "Date":1,
                    "Week":1,
                    "TimeUnder":1,
                    "DefensiveTeam":1,
                    "YardsGained":1,
                    "PlayAttempted":1,
                    "PassAttempt":1,
                    "RushAttempt":1,
                    "PassLocation":1,
                    "PassOutcome":1,
                    "RunLocation":1,
                    "RunGap":1,
                    "down":1,
                    "qtr":1,
                    "PassLength":1,
                    "PlayType":1,
                    #"Location":{"$or": [{"PassLocation"},{"RunLocation"}]},
                    "Position":"$receiverInfo.Pos"
                }
            },
            {
                "$limit": 22000
            },
        ]

        #console.log(all_2017)
        #combo_2017 = pbp_2017_collection.find(projection=COMBO_FIELDS, limit=100000)
        #combo_2017 = pbp_2017_collection.find({},limit=100000)
        # Convert projects to a list in a JSON object and return the JSON data
        #pbp_2017 = pbp_2017_collection.find({}, limit=100000)

        pbp_2017 = pbp_2017_collection.aggregate(pipeline)
        #pprint(pbp_2017)
        #print pbp_2017
        #print(list(pbp_2017))
        #for document in pbp_2017:
        #    pprint(document)

        return json.dumps(list(pbp_2017))
        #return list(pbp_2017)


if __name__ == "__main__":
    app.run(debug=True)