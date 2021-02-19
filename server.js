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
app.use("/", express.static(path.join(__dirname, '/views')));

app.get("/", (req, res) => {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('connexion error', err);
    }
    let location_results = [];
    let userid = [];
    client.query("SELECT * FROM location")
      .then((result) => {
        (result.rows).forEach(element => {
          location_results.push([`Latitude: ${element.lat}`, `Longitude: ${element.lng}`, `Name: ${element.spotname}`, `Comment: ${element.spotcomment}`]);
          userid.push(`${element.id}`);
        })
      }).catch((e) => {
        location_results = [["ERROR"]];
      })
      .finally(() => {
        release();
        res.render("forage", { locations: location_results, id_info: userid })
      })
  })
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});