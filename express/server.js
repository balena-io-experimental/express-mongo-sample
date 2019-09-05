const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

var db;

MongoClient.connect(
  `mongodb://localhost:27017/sensor-data`,
  (err, database) => {
    if (err) return console.log(err);
    db = database.db("sensorData");
    app.listen(process.env.PORT || 80, () => {
      console.log("listening on 80");
    });
  }
);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.get("/data", (req, res) => {
  db.collection("data")
    .find()
    .sort({ $natural: -1 })
    .limit(30)
    .toArray((err, result) => {
      if (err) {
        console.log(err);
        res.status(404).send();
        return;
      }
      res.send(result);
    });
});

