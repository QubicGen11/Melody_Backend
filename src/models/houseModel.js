const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image:[String],
    description: {
        type: String,
        required: true
    },
    houseType: {
        type: String,
        required: true
    },
    address: {
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        }
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
           
        }
    },
    amenities: [String],
    rentalType: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    availableFrom: {
        type: Date,
        required: true
    },
    leaseType: {
        type: String,
        required: true
    },
    adType: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    ownerPhone: {
        type: String,
        required: true
    },
    ownerEmail:{
        type:String,
        required:true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

houseSchema.index({ location: '2dsphere' });

const House = mongoose.model('House', houseSchema);
module.exports = House;
