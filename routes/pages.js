const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login', {message: ''});
});

router.get('/register', (req, res) => {
    res.render('register', {message: ''});
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard', {message: ''});
});

module.exports = router;