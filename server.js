const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

//const { Client } = require('pg')
/*const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})*/

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
        location_results = result.rows;
        //console.table(result.rows);
        //res.render("forage", { locations: JSON.stringify(result.rows) });
      }).catch((e) => {
        console.log(e);
        location_results = "ERROR";
        //res.render("forage", { locations: "ERROR" });
      })
      .finally(() => {
        release();
        res.render("forage", { locations: location_results })
      })
  })








  /*client.connect()
    .then(() => console.log("Connected to DB"))
    .then(() => client.query("SELECT * FROM location"))
    .then((result) => {
      let rows = result.rows
      client.end();
      console.table(rows);
      res.render("forage", { locations: JSON.stringify(rows) });
    })
    .catch((e) => {
      console.log(e);
      res.render("forage", { locations: "ERROR" });
    })
    .finally(() => client.end())*/
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});