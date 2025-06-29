const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose Admin schema
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        minLength: 5,
        maxLength: 100
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 1024
    },
    role: {
        type: String,
        enum: ['admin', 'superadmin'],
        required: true
    }
}, { timestamps: true });

const adminModel = mongoose.model('Admin', adminSchema);

// Joi validation function
function validateAdmin(data) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(1024).required(),
        role: Joi.string().valid('admin', 'superadmin').required()
    });

    return schema.validate(data);
}

module.exports = {
    adminModel,
    validateAdmin
};
