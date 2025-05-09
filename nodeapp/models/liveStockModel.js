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
        enum: ['Vaccinated', 'Not Vaccinated' , 'Up to date'],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    attachment:{
       filename:{
           type:String
       },
       path:{
           type:String
       },
       mimetype:{
           type:String
       },
       size:{
           type:Number
       }
    }
}, { timestamps: true });

module.exports = mongoose.model('Livestock', livestockSchema);