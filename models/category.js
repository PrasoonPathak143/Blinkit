// category.js

const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose Schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        unique: true,
        maxlength: 50
    }
}, { timestamps: true });

const categoryModel = mongoose.model('Category', categorySchema);

// Joi validation function
function validateCategory(data) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required()
    });

    return schema.validate(data);
}

module.exports = {
    categoryModel,
    validateCategory
};
