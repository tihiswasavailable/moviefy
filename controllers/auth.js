const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const e = require('express');
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

// logic for registration
// checking if the user already exists, if he accepts the terms and conditions, if all the fields are filled in and password matches the passwordConfirm
// hashing the password and storing the user data in the database
exports.register = (req, res) => {
    //console.log(req.body);
    const { name, email, password, passwordConfirm, acceptTerms } = req.body;

    if (!acceptTerms) {
        return res.render('register', {
            message: 'Please accept the terms and conditions',
            name: name,
            email: email
        });
    }
    if (!name || !email || !password || !passwordConfirm) {
        return res.render('register', {
            message: 'Please fill in all the fields',
            name: name,
            email: email
        });
    }
    // checking if the user already exists in the database
    db.query('SELECT userEmail FROM users WHERE userEmail = ?', [email], async (error, results) => {
        if(error) {
            console.log(error);
    }
        if (results.length > 0) {
            return res.render('register', {
                message: 'That email is already in use',
                name: name
            })
        } else if (password !== passwordConfirm) {
            return res.render('register', {
                message: 'Passwords do not match',
                name: name,
                email: email
            })
        }
        let hashedPassword = await bcrypt.hash(password, 8);
        //console.log(hashedPassword);
        // inserting the user into the database
        db.query('INSERT INTO users SET ?', {userName: name, userEmail: email, userPassword: hashedPassword}, (error, results) => {
            if(error) {
                console.log(error);
            } else {
                //console.log(results);
                return res.render('register', {
                    message: 'User registered'
                });
            }
        });
    });
};

//logic for login
// providing a token to the user upon successful login and setting a cookie with the token
// the cookie will be used to authenticate the user for protected routes like the profile page
exports.login = (req, res) => {
    //console.log("Request body: ", req.body);
    const { emailLogin, passwordLogin } = req.body;
    if (!emailLogin || !passwordLogin) {
        return res.render('login', {
            message: 'Please fill in all the fields',
        });
    }
    db.query('SELECT * FROM users WHERE userEmail = ?', [emailLogin], async (error, results) => {
        if(error) {
            return res.status(500).render('login', {
                message: 'Database error'
            });
        }
        //console.log("Results: ", results);
        if (!results || results.length === 0) {
            return res.status(401).render('login', {
                message: 'Email or password is incorrect'
            });
        } else {
            const user = results[0];
            const isMatch = await bcrypt.compare(passwordLogin, user.userPassword);
            if (!isMatch) {
                return res.status(401).render('login', {
                    message: 'Email or password is incorrect'
                });
            }
            const id = user.userId;
            //console.log("id: ", id);
            const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });
            console.log("Token: ", token);
            //console.log('Authentization Header: ', req.headers.authorization);
            const cookieOptions = {
                expires: new Date (
                    Date.now() + 90 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            //console.log("Cookie options: ", cookieOptions);
            res.cookie('jwt', token, cookieOptions);
            res.status(200).redirect('/dashboard');
        }
    });
};

// logic for logout
// clearing the cookie with the token upon logout and redirecting the user to the login page
exports.logout = (req, res) => {
    console.log('Logging out, current JWT cookie:', req.cookies.jwt);
    // set the cookie to expire in 1 second from logout
    res.cookie('jwt', '', { expires: new Date(Date.now() +1 ), httpOnly: true });
    //console.log('JWT cookie cleared.');
    res.status(200).redirect('/login');
};
