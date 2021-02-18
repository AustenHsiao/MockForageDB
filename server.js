const { Client } = require('pg');
const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const { send } = require('process');

const port = process.env.PORT || 5000;

app.set("view engine", "pug");
app.use("/", express.static(path.join(__dirname, '/pics')));

/*
 Create the client object that will later connect to the db.
 these credentials are taken from the Heroku DB details
*/
const client = new Client({
  user: "fvjpwaqeisxmgw",
  password: "d7d3bd8c6e4391078e1cfab9677f27a6b6ba4d6c5c74b05f5c278b8b3fbff231",
  host: "ec2-52-7-168-69.compute-1.amazonaws.com",
  port: 5432,
  database: "ddq07uk2vk6qv6"
})

/* returns promise
 Connect to db Client (capital C) with the object, client. On a successful query,
 print out all of the information (this is just to test and I know the bounds of the data)
 If no connection is made, give the error. In either case, end the connection. We don't want to keep it open.
*/
function test_Query() {
  client.connect()
    .then(() => console.log("We're connected"))
    .then(() => client.query("SELECT * FROM user"))
    .then((result) =>
      console.table(result.rows)
    )
    .catch((e) => console.error(e))
    .finally(() => client.end())
}

app.get("/", (req, res) => {
  res.render("forage", { locations: test_Query() });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});