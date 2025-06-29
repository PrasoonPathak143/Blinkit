const jwt = require('jsonwebtoken');
require('dotenv').config();


function validateAdmin(req, res, next) {
    try{
        let token = req.cookies.token;
        if (!token) {
            return res.send('Access denied. You need to login first.');
        }
        let data = jwt.verify(token, process.env.JWT_KEY);
        req.user = data;
        next();
    }
    catch(err){
        return res.send(err.message);
    }

}

module.exports = validateAdmin;