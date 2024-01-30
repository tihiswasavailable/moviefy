const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Homepage</h1>")
});

app.listen(5501, () => {
    console.log("Server started on Port 5501")
});