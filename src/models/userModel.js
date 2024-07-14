const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    socials:{
        instagram:{
            type:String
        },
        twitter:{
            type:String
        },
        whatsapp:{
            type:String
        },
        linkedin:{
            type:String
        }
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
          
        },
        coordinates: {
            type: [Number],
         
        }
    },
    houses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'House'
    }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
