const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

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

exports.update = async (req, res) => {
    try {
        const { userId, username, email, password, passwordConfirm } = req.body;
        const hashedPassword = await bcrypt.hash(password, 8);
        db.query('UPDATE users SET username = ?, email = ?, password = ? WHERE userId = ?', [username, email, hashedPassword, userId], (error, results) => {
            if (error) {
                console.log(error);
            }
            res.redirect('/profile');
        });
    } catch (error) {
        console.log(error);
    }
}
