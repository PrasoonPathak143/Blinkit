const express = require('express');
const router = express.Router();
const { productModel, validateProduct } = require('../models/product');
const { categoryModel, validateCategory } = require('../models/category');
const upload = require('../config/multer_config');

router.get('/', async (req, res) => {
    try {
        let products = await productModel.find();
        res.send(products);
    } catch (err) {
        res.send(err.message);
    }
});

router.post('/', upload.single("image"), async (req, res) => {
    try {
        let {name, price, category, stock, description, image} = req.body;
        let {error} = validateProduct({name, price, category, stock, description, image});
        if(error) {
            return res.send(error.message);
        }

        let isCategory = await categoryModel.findOne({name: category});
        if(!isCategory) {
            await categoryModel.create({name: category});
        }
        
        let product = await productModel.create({
            name,
            price,
            category,
            image: req.file.buffer,
            description,
            stock
        });

        res.redirect('/admin/dashboard');
    }
    catch (err) {
        res.send(err.message);
    }
});

module.exports = router;