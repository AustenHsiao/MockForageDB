const { Client } = require('pg');

// Create the client object that will later connect to the db.
const client = new Client({
    user: "fvjpwaqeisxmgw",
    password: "d7d3bd8c6e4391078e1cfab9677f27a6b6ba4d6c5c74b05f5c278b8b3fbff231",
    host: "ec2-52-7-168-69.compute-1.amazonaws.com",
    port: 5432,
    database: "ddq07uk2vk6qv6"
})

// returns promise
// Connect to db Client (capital C) with the object, client. If no connection is made, 
// give the error. In either case, end the connection. We don't want to keep it open.
client.connect()
    .then(() => console.log("We're connected"))
    .catch((e) => console.error(e))
    .finally(() => client.end())