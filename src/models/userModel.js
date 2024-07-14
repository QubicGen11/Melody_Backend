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
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            default: [0, 0]
        }
    },
    houses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'House'
    }],
    bookmarks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'House'
    }]
}, { timestamps: true });

userSchema.index({ location: '2dsphere' }); // Index for geospatial queries

const User = mongoose.model('User', userSchema);

module.exports = User;
