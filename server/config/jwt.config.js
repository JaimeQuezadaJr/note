const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRETKEY = process.env.JWT_SECRET;

module.exports.SECRETKEY = SECRETKEY;
module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.userToken, SECRETKEY, (err, payload) => {
        if(err) {
            res.status(401).json({verified: false});
        } else {
            next();
        }
    });
}