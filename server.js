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
        //console.log(result.rows.values());

        //let location_array = result.rows.values();
        location_results = result.rows;
        /*
        (result.rows).forEach(element => {
          console.log(JSON.stringify(element));
          let location_data = JSON.parse(JSON.stringify(element));
          location_results += location_data["lat"];
          location_results += "\n|" + location_data["lng"];
          location_results += "\n|" + location_data["spotname"];
          location_results += "\n|" + location_data["spotcomment"] + "\n\n";
*/
        /*if (location_data.length > 1) {
          location_results += element + '\n';
        } else {
          location_results += '\n';
        }*/

        /*
        let loc = JSON.parse(element);
        location_results += loc["lat"];
        location_results += "\n" + loc["lng"];
        location_results += "\n" + loc["id"];
        location_results += "\n" + loc["spotname"];
        location_results += "\n" + loc["spotcomment"] + "\n\n";*/
      })
  }).catch((e) => {
    console.log(e);
    location_results = "ERROR";
  })
    .finally(() => {
      release();

      res.render("forage", { locations: location_results })
    })
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});