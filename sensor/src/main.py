import time
import random
import json
from datetime import datetime
from pymongo import MongoClient
from pprint import pprint
from urllib.request import urlopen

def readWeather(code, apikey):
    # apikey="6b13bbc2262eedc8baecf752c9940d9c" # sign up here https://home.openweathermap.org/api_keys

    url="https://api.openweathermap.org/data/2.5/weather?q="+code+"&appid="+apikey

    meteo = urlopen(url).read()
    meteo = meteo.decode('utf-8')
    weather = json.loads(meteo)

    return weather


client = MongoClient('localhost',27017)

with client:
    db = client.sensorData
    col = db.data

    while True:
        current_time = datetime.now()
        weather = readWeather("lisbon,pt","6b13bbc2262eedc8baecf752c9940d9c")

        read = { "time": current_time, "weather": weather }
        x = col.insert_one(read)

        print("Data inserted...")

        # Update database every minute
        time.sleep(60)
