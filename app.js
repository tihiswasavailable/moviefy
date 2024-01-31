const express = require("express");
const mysql = require("mysql2");

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'moviefy_user',
    password: '0305',
    database: 'moviefy-login'
});

db.connect(err => {
    if (err) {
        console.log("Error connecting to database") + err.stack;
        return;
    } 
    console.log("Connected to database");
});

app.get("/", (req, res) => {
    res.send("<h1>Homepage</h1>")
});

app.listen(5001, () => {
    console.log("Server started on Port 5001")
});