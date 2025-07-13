const express = require('express');
const router = express.Router();
const {adminModel} = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {productModel} = require('../models/product');
const {categoryModel} = require('../models/category');
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
        let token = jwt.sign({email: user.email, admin: true}, process.env.JWT_KEY);
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
        let token = jwt.sign({email: admin.email, admin: true}, process.env.JWT_KEY);
        res.cookie("token", token);
        res.redirect('/admin/dashboard');
    }
});

router.get('/dashboard', validateAdmin, async (req, res) => {
    let prodcount = await productModel.countDocuments();
    let categcount = await categoryModel.countDocuments();
    res.render('admin_dashboard', {prodcount, categcount});
});

router.get('/products', validateAdmin, async (req, res) => {
    const result = await productModel.aggregate([
        {
            $group: {
                _id: "$category",
                products: { $push: "$$ROOT" },
            },
        },
        {
            $project: {
                _id: 0,
                category: "$_id",
                products: { $slice: ["$products", 10] } // Limit to 10 products per category
            }
        }
    ]);

    const products = result.reduce((acc, item) => {
        acc[item.category] = item.products;
        return acc;
    }, {});
    res.render('admin_products', { products });
});

router.get('/logout', (req, res) => {
    res.cookie("token", '');
    res.redirect('/admin/login');
});

module.exports = router;