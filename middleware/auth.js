const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {

    const token =  req.headers['authorization']?.split(' ')[1] || req.cookies.token;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(401).redirect('/');
        }
    } else {
        return res.status(401).redirect('/');
    }
};