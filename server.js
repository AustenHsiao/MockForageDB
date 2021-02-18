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
        location_results = "";
        JSON(result.rows).foreach(element => {
          location_results += element[0];
          location_results += "\n" + element[1];
          location_results += "\n" + element[2];
          location_results += "\n" + element[3];
          location_results += "\n" + element[4] + "\n\n";
        })
      }).catch((e) => {
        console.log(e);
        location_results = "ERROR";
      })
      .finally(() => {
        release();

        res.render("forage", { locations: location_results })
      })
  })
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});