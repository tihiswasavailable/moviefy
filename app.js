/*Author : Stefan Jovic
Version: 1.0.0
Date : 30.05.2021.
*/


// require 
const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');


// dotenv config
dotenv.config({ path: './.env'});

const app = express();

// create connection to database
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

// define paths for public directory and set static files
const publicDirectory = path.join(__dirname, 'public');
app.use(express.static(publicDirectory));

// parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false}));
// parse JSON bodies
app.use(express.json());
// cookie parser
app.use(cookieParser());


// set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// check connection to database
db.connect(err => {
    if (err) {
        console.error('Error connecting to database', err);
        return;
    } 
    console.log('Connected to database');
});


// Define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));

// app.get('/test', verifyToken, (req, res) => {
//     res.send('Middleware test passed.');
//   });

// port 5001 
app.listen(5501, () => {
    console.log('Server started on Port 5501')
});