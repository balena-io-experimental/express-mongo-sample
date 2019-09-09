import time
import random
import json
import os
from datetime import datetime
from pymongo import MongoClient
from pprint import pprint
from urllib.request import urlopen

# get CITY setting from dashboard
try:
    CITY = os.environ["CITY_CODE"]
except KeyError:
    print("using default city: lisbon,pt")
    CITY = "lisbon,pt"

# Get API key
try:
    API_KEY = os.environ["API_KEY"]
except KeyError:
    print("using balena's api key")
    API_KEY = "6b13bbc2262eedc8baecf752c9940d9c"

# Get refresh frequency
try:
    FREQ = os.environ["FREQ"]
except KeyError:
    print("using default frequency: 1 min")
    FREQ = 1


def readWeather(code, apikey):
    # apikey="6b13bbc2262eedc8baecf752c9940d9c" # sign up here https://home.openweathermap.org/api_keys

    url = "https://api.openweathermap.org/data/2.5/weather?q="+code+"&appid="+apikey

    meteo = urlopen(url).read()
    meteo = meteo.decode('utf-8')
    weather = json.loads(meteo)

    return weather


client = MongoClient('mongo', 27017)

with client:
    db = client.sensorData
    col = db.data

    while True:
        current_time = datetime.now()
        weather = readWeather(CITY, API_KEY)

        read = {"time": current_time, "weather": weather}
        x = col.insert_one(read)

        print("Data inserted...")

        # Update database every x minute
        time.sleep(60 * FREQ)
