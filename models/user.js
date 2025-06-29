const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose Address sub-schema
const AddressSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255
    },
    city: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50
    },
    state: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50
    },
    zip: {
        type: Number,
        required: true,
        min: 100000,
        max: 999999
    }
});

// Mongoose User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
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
        minLength: 6,
        maxLength: 1024
    },
    phone: {
        type: Number,
        match: /^[0-9]{10}$/ // Assuming a 10-digit phone number
    },
    addresses: {
        type: [AddressSchema],
        default: []
    }
}, { timestamps: true });

const userModel = mongoose.model('User', userSchema);

// Joi validation function for incoming requests
function validateUser(data) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(1024).required(),
        phone: Joi.string().required().length(10).pattern(/^[0-9]+$/),
        addresses: Joi.array().items(
            Joi.object({
                address: Joi.string().min(5).max(100).required(),
                city: Joi.string().min(2).max(50).required(),
                state: Joi.string().min(2).max(50).required(),
                zip: Joi.number().required().min(100000).max(999999)
            })
        )
    });

    return schema.validate(data);
}

module.exports = {
    userModel,
    validateUser
};
