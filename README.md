![](https://github.com/balena-io-playground/express-mongo-sample/blob/master/assets/title.png?raw=true)

# Express and MongoDB example project

To demonstrate the use of a 64-bit container, we’ve developed a sample multi-container project that uses a few different technologies. The main idea is to plot a live chart containing the temperature and humidity of any city in the world. 

### What you will need:
- A download of the project from [GitHub](https://github.com/balena-io-playground/express-mongo-sample)
- Software to flash an SD card ([balenaEtcher](https://balena.io/etcher))
- A free [balenaCloud](https://balena.io/cloud) account to setup and manage the Pi Download and install the [balena CLI tools](https://github.com/balena-io/balena-cli/blob/master/INSTALL.md) - to be installed on your computer, allowing you to install the project code on the Raspberry Pi 4.

You will also need to [set up environment variables](https://www.balena.io/docs/learn/manage/serv-vars/#environment-and-service-variables) from the balena dashboard:

| Name             | Value  
| -----------------|------------------------------------                                   
| CITY_CODE     | The code corresponding to your city, e.g `lisbon,pt` or `london,uk`                     
| API_KEY | [api key](https://openweathermap.org/appid) retrieved after signing up at `openweathermap.org`|
| FREQ | Frequency(in minutes) with which to retrieve weather data |                                   
                    


### About the project:

The project is divided into three containers:
* A mongoDB database instance with persistent storage, in which we will store all data. 
* python 3 application that fetches the weather information from the [openweathermap](https://openweathermap.org) API and saves it to the database every minute. 
* Node.js server, where we built the front-end using ExpressJS and VueJS . The application fetches the data from the mongo database and displays it in a chart, which is refreshed automatically every minute.

![](https://github.com/balena-io-playground/express-mongo-sample/blob/master/assets/logo.png?raw=true)

> Note, the express app is based on https://zellwk.com/blog/crud-express-mongodb/
