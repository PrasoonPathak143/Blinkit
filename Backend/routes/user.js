const express = require('express');
const router = express.Router();
const { userModel, validateUser } = require('../models/user');

router.get('/login', (req, res) => {
    res.render('user_login');
});


module.exports = router;