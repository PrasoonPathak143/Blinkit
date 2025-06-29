const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose Schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 100
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        default: true
    },
    images: {
        type: Buffer,
    }
}, { timestamps: true });

const productModel = mongoose.model('Product', productSchema);

function validateProduct(data) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(100).required(),
        description: Joi.string().optional(),
        price: Joi.number().min(0).required(),
        category: Joi.string().required(),
        stock: Joi.number().optional(),
        images: Joi.string().optional()
    });

    return schema.validate(data);
}

module.exports = {
    productModel,
    validateProduct
};
