const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose Schema
const orderSchema = new mongoose.Schema({
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
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        required: true
    },
    delivery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Delivery'
    }
}, { timestamps: true });

const orderModel = mongoose.model('Order', orderSchema);

// Joi Validation
function validateOrder(data) {
    const schema = Joi.object({
        user: Joi.string().required(),
        products: Joi.array().items(Joi.string().required()).required(),
        totalPrice: Joi.number().min(0).required(),
        address: Joi.string().required(),
        status: Joi.string().valid('pending', 'processing', 'shipped', 'delivered', 'cancelled').required(),
        payment: Joi.string().required(),
        delivery: Joi.string().optional()
    });

    return schema.validate(data);
}

module.exports = {
    orderModel,
    validateOrder
};
