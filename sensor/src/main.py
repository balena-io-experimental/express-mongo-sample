import time
from pymongo import MongoClient
from pprint import pprint

client = MongoClient('mongodb://localhost:27017/sensorData')

with client:
    db = client.sensorData

    while True:
        print("Hi!")
        print(db.list_database_names())

        status = db.command("serverStatus")
        pprint(status)

        time.sleep(2)
