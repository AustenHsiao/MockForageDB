const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const { Client } = require('pg')
const client = new Client({
  host: 'ec2-52-7-168-69.compute-1.amazonaws.com',
  port: 5432,
  user: 'fvjpwaqeisxmgw',
  password: 'd7d3bd8c6e4391078e1cfab9677f27a6b6ba4d6c5c74b05f5c278b8b3fbff231',
})

const port = process.env.PORT || 5000;

app.set("view engine", "pug");
app.use("/", express.static(path.join(__dirname, '/pics')));

app.get("/", (req, res) => {
  client.connect()
    .then(() => console.log("Connected to DB"))
    .then(() => client.query("SELECT * FROM user"))
    .then((result) => {
      console.table(result);
      res.render("forage", { locations: "hi" });
    })
    .catch((e) => { console.log(e) })
    .finally(() => client.end())
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});