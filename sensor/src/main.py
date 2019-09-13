import time
import json
import os
import sys
from datetime import datetime
from pymongo import MongoClient
from urllib.request import urlopen


# readWeather uses the api-key and city code to fetch the json data for the current weather information
def read_weather(code, apikey):
    url =  "https://api.darksky.net/forecast/"+apikey+"/"+code+"?exclude=daily,hourly,flags&units=si" #[latitude],[longitude]

    meteo = urlopen(url).read()
    meteo = meteo.decode('utf-8')
    weather = json.loads(meteo)

    return weather

# Fetch environment data
try:
    CITY = os.environ["CITY_CODE"]
    API_KEY = os.environ["API_KEY"]
except KeyError:
    print("Please set environment variables")
    sys.exit()

# Set refresh frequency
if os.environ.get("FREQ") is None:
    FREQ = 5
else:
    FREQ = int(os.environ["FREQ"])
    
client = MongoClient('mongo', 27017)

# Code start
print("Starting")
print("City: %s " % (CITY))
print("Frequency: %d mins " % (FREQ))

with client:
    db = client.sensorData
    col = db.data

    # Read data and save to database
    while True:

        current_time = datetime.now()
        weather = read_weather(CITY, API_KEY)

        read = {"time": current_time, "weather": weather}
        x = col.insert_one(read)

        print("Data inserted...")

        # Update database every x minute
        time.sleep(60 * FREQ)
