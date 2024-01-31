const express = require("express");
const mysql2 = require("mysql2");

const app = express();
const db = mysql2.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'moviefy-login'
});

db.connect( (error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("MYSQL Connected...")
    }
})

app.get("/", (req, res) => {
    res.send("<h1>Homepage</h1>")
});

app.listen(3306, () => {
    console.log("Server started on Port 3306")
});