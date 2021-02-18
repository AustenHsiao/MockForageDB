const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const port = process.env.PORT || 5000;

app.set("view engine", "pug");
app.use("/", express.static(path.join(__dirname, '/pics')));

app.get("/", (req, res) => {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('connexion error', err);
    }
    let location_results;
    client.query("SELECT * FROM location")
      .then((result) => {
        location_results = [];

        (result.rows).forEach(element => {
          location_results.push([`Latitude: ${element.lat}`, `Longitude: ${element.lng}`, `Name: ${element.spotname}`, `Comment: ${element.spotcomment}`]);
        })
      }).catch((e) => {
        console.log(e);
        location_results = "ERROR";
      })
      .finally(() => {
        release();
        console.log(location_results);
        res.render("forage", { locations: location_results })
      })
  })
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});