const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

// get user profile for profile page
// set the name and email in the profile page to the user's name and email from the database
// using the user's id from the token to get the user's name and email from the database
// in profile.ejs, the name and email are set to the user's name and email from the database
exports.getProfile = (req, res) => {
    const { name, email } = req.body;
    console.log('get userData');
    const userId = req.user.id;
    console.log(userId);
    db.query('SELECT userName, userEmail FROM users WHERE userId = ?', [userId], (error, results) => {
        if (error) {
            console.log(error);
            return res.render('profile', {
            message: 'Error getting user profile'
        });
        }
        const userData = results[0];
        console.log(userData);
        res.render('profile', {
            name: userData.userName,
            email: userData.userEmail,
            message: '',
            showSearchForm: false
        });
    });
}

// update user profile
// using the user's id from the token to update the user's name, email, and password in the database
// in profile.ejs, the user can update their name, email, and password
// if the user updates their password, the password is hashed and updated in the database
exports.updateProfile = async (req, res) => {
        console.log('updateProfile');
        const { name, email, password, passwordConfirm } = req.body;
        console.log(req.body);
        const userId = req.user.id;
        console.log(userId);

        if (password !== passwordConfirm) {
            console.log(password);
            console.log(passwordConfirm);
            return res.render('profile', {
                message: 'Passwords do not match',
                name: name,
                email: email,
                showSearchForm: false
            })
        }
        try {
        const hashedPassword = await bcrypt.hash(password, 8);
        db.query('UPDATE users SET userName = ?, userEmail = ?, userPassword = ? WHERE userId = ?', [name, email, hashedPassword, userId], (error, results) => {
            if (error) {
                console.log(error);
                return res.render('profile', {
                    message: 'Error updating user profile',
                    showSearchForm: false
                });
            }
            res.render('profile', {
                message: 'Successfully updated user profile',
                name: name,
                email: email,
                showSearchForm: false
                });
        });
    } catch (error) {
        console.log(error);
        res.render('profile', {
            message: 'Error updating user profile',
            showSearchForm: false
        });
    }
}
