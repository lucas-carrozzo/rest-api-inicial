const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header
    ("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods","POST, GET, PUT, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("no autorizado");
});

app.get("/users", (req, res)=>{
    fs.readFile(__dirname + "/db/users.json", "utf8", (err, data) => {
        const users = JSON.parse(data);
        res.send(users);
    });
});

// ACA ME QUEDÉ
app.post("/user", (req, res) => {
    fs.readFile(__dirname + "/db/users.json", "utf8", (err, data) => {
        const user = req.body;
        const userId = req.body.id;
        const users = JSON.parse(data);

        users[`user${userId}`] = user;

        res.send(users);
        console.log(users)
    });
});

const server = app.listen(3001, ()=>{
    console.log("mi servidor se levanto");
});
