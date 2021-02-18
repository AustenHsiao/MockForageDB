const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const pg = require('pg')
const Client = pg.Client();
const pool = pg.Pool();
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

const port = process.env.PORT || 5000;

app.set("view engine", "pug");
app.use("/", express.static(path.join(__dirname, '/pics')));

app.get("/", (req, res) => {
  pool.connect((err, client, release) => {
    client.query("SELECT * FROM location")
      .then((result) => {
        console.table(result.rows);
        res.render("forage", { locations: JSON.stringify(result.rows) });
      })
      .catch((e) => {
        console.log(e);
        res.render("forage", { locations: "ERROR" });
      })
      .finally(() => release())
  })



  /*client.connect()
    .then(() => console.log("Connected to DB"))
    .then(() => client.query("SELECT * FROM location"))
    .then((result) => {
      console.table(result.rows);
      res.render("forage", { locations: JSON.stringify(result.rows) });
    })
    .catch((e) => {
      console.log(e);
      res.render("forage", { locations: "ERROR"});
    })
    .finally(() => client.end())*/
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});