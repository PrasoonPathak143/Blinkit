const express = require('express');
const router = express.Router();
const {adminModel} = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validateAdmin = require('../middlewares/admin');
require('dotenv').config();


if(typeof process.env.NODE_ENV !== undefined && process.env.NODE_ENV === 'DEVELOPMENT'){
  router.get('/create', async (req, res) => {
    try{
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash("Admin@123", salt);
        let user = new adminModel({
            name:"Prasoon Pathak",
            email:"admin@test.com",
            password: hash,
            role:"admin",
        });
        await user.save();
        let token = jwt.sign({email: user.email}, process.env.JWT_KEY);
        res.cookie("token", token);
        res.send("Admin created successfully");
    }
    catch(err){
        res.send(err.message);
    }
  });
}

router.get('/login', (req, res) => {
    res.render('admin_login');
});

router.post('/login', async (req, res) => {
    let {email, password} = req.body;
    let admin = await adminModel.findOne({email: email});
    if(!admin){
        return res.send("Admin not found");
    }
    let valid = await bcrypt.compare(password, admin.password);
    if(!valid){
        return res.send("Invalid password");
    }
    else{
        let token = jwt.sign({email: admin.email}, process.env.JWT_KEY);
        res.cookie("token", token);
        res.redirect('/admin/dashboard');
    }
});

router.get('/dashboard', validateAdmin, (req, res) => {
    res.render('admin_dashboard');
});

router.get('/logout', (req, res) => {
    res.cookie("token", '');
    res.redirect('/admin/login');
});

module.exports = router;