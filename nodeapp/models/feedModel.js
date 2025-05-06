const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema({
    feedName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    pricePerUnit: {
        type: mongoose.Types.Decimal128,
        required: true
    }
});

module.exports = mongoose.model('Feed', feedSchema)