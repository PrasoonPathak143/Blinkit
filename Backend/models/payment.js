const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose Schema
const paymentSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    method: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    transactionId: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

const paymentModel = mongoose.model('Payment', paymentSchema);

// Joi validation
function validatePayment(data) {
    const schema = Joi.object({
        order: Joi.string().required(),
        amount: Joi.number().min(0).required(),
        method: Joi.string().required(),
        status: Joi.string().required(),
        transactionId: Joi.string().required()
    });

    return schema.validate(data);
}

module.exports = {
    paymentModel,
    validatePayment
};
