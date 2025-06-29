const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose Cart schema
const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true });

const cartModel = mongoose.model('Cart', cartSchema);

// Joi validation function
function validateCart(data) {
    const schema = Joi.object({
        user: Joi.string().hex().length(24).required(),
        products: Joi.array().items(Joi.string().hex().length(24)).required(),
        totalPrice: Joi.number().min(0).required()
    });

    return schema.validate(data);
}

module.exports = {
    cartModel,
    validateCart
};
