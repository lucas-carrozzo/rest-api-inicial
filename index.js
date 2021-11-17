const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("no autorizad");
});

app.get("/users", (req, res) => {
  fs.readFile(__dirname + "/db/users.json", "utf8", (err, data) => {
    const users = JSON.parse(data);
    res.send(users);
  });
});

app.post("/user", (req, res) => {
  fs.readFile(__dirname + "/db/users.json", "utf8", (err, data) => {
    const user = req.body;
    const userId = req.body.id;
    const users = JSON.parse(data);

    users[`user${userId}`] = req.body;

    res.send(users);
  });
});

app.put("/user/:id", (req, res) => {
  fs.readFile(__dirname + "/db/users.json", "utf8", (err, data) => {
    const users = JSON.parse(data);
    const userId = req.params.id;
    users[`user${userId}`].name = req.body.name;
    res.status(201).send(users);
  });
});

app.delete("/user/:id", (req, res) => {
  fs.readFile(__dirname + "/db/users.json", "utf8", (err, data) => {
    const users = JSON.parse(data);
    const userId = req.params.id;
    delete users[`user${userId}`];
    res.status(200).send(users);
  });
});

const server = app.listen(4000, () => {
  console.log("mi servidor se levanto");
});