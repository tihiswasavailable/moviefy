const jwt = require('jsonwebtoken');


// verify/authenticate token
exports.verifyToken = (req, res, next) => {
    console.log('Verifying token');
    //console.log('Cookies:', req.cookies);
    console.log('Headers:', req.headers);
    console.log('Path:', req.path);
    const token = req.cookies.jwt; // Example for extracting token from cookies
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error('Error verifying token', err);
                return res.render('login', {message: 'Error verifying Token! Please login again.'});
            }
            req.user = decoded;
            console.log('User:', decoded);
            console.log('Token verified');
            return next();
        });
    } else {
        console.error('Token not found');
        return res.render('login', {message: 'Access denied! Please login again.'});
    }
}


