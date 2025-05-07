const mongoose = require('mongoose');

const livestockSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    healthCondition: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    vaccinationStatus: {
        type: String,
        required: true,
        enum: ['vaccinated', 'not vaccinated' , 'Up to date'],
    },
    attachment: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Livestock', livestockSchema);