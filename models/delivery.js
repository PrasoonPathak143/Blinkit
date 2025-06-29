const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose Schema
const deliverySchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    deliveryBoy: {
        type: String,
        required: true,
        //trim: true,
        minlength: 3,
        maxlength: 50
    },
    status: {
        type: String,
        enum: ['pending', 'in transit', 'delivered', 'cancelled'],
        required: true
    },
    estimatedDeliveryTime: {
        type: Number,
        required: true,
        min: 0 // in minutes or hours, based on your app logic
    },
    trackingURL: {
        type: String,
        //trim: true
    }
}, { timestamps: true });

const deliveryModel = mongoose.model('Delivery', deliverySchema);

// Joi Validation
function validateDelivery(data) {
    const schema = Joi.object({
        order: Joi.string().required(),
        deliveryBoy: Joi.string().min(3).max(50).required(),
        status: Joi.string().valid('pending', 'in transit', 'delivered', 'cancelled').required(),
        estimatedDeliveryTime: Joi.number().min(0).required(), // in minutes or hours, based on your app logic
        trackingURL: Joi.string().uri()
    });

    return schema.validate(data);
}

module.exports = {
    deliveryModel,
    validateDelivery
};
