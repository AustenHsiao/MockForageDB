const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const { Client } = require('pg')
console.log(process.env.DATABASE_URL)
const client = new Client({
  connectionString: process.env.DATABASE_URL
})

const port = process.env.PORT || 5000;

app.set("view engine", "pug");
app.use("/", express.static(path.join(__dirname, '/pics')));

app.get("/", (req, res) => {
  console.log("Trying");
  client.connect()
    .then(() => console.log("Connected to DB"))
    .then(() => client.query("SELECT * FROM user"))
    .then((result) => {
      console.table(result);
      res.render("forage", { locations: "work" });
    })
    .catch((e) => {
      console.log(e);
      res.render("forage", { locations: "no work" });
    })
    .finally(() => client.end())

});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});