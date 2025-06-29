const express = require('express');
const router = express.Router();
const { productModel, validateProduct } = require('../models/product');
const upload = require('../config/multer_config');

router.get('/', async (req, res) => {
    try {
        let products = await productModel.find();
        res.send(products);
    } catch (err) {
        res.send(err.message);
    }
});

router.post('/', async (req, res) => {
    try {
        let {name, price, category, stock, description, image} = req.body;
        let {error} = validateProduct({name, price, category, stock, description, image});
        if(error) {
            return res.send(error.message);
        }
        
    }
    catch (err) {
        res.send(err.message);
    }
});

module.exports = router;