const jwt = require('jsonwebtoken');


// verify token (needed for protected routes -> process of authorization : protecting routes from unauthorized access)
exports.verifyToken = (req, res, next) => {
    //console.log('Verifying token');
    //console.log('Cookies:', req.cookies);
    //console.log('Headers:', req.headers);
    //console.log('Path:', req.path);

    // extracting token from the request headers
    const token = req.cookies.jwt;
    if (token) {
        // verifying the token with the secret key stored in the .env file
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error('Error verifying token', err);
                return res.render('login', {
                    message: 'Error verifying Token! Please login again.'
                });
            }
            // if the token is verified, the user object is added to the request object
            // next() is called to pass the request
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


