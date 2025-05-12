const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    feedId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Feed'
    },
    livestockId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Livestock'
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['PENDING', 'APPROVED', 'REJECTED'], 
        default: 'PENDING'
    },
    requestDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    reason:{
        type:String
    }
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);;