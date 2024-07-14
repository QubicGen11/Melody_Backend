const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  houseType: { type: String, required: true },
  address: {
    city: { type: String, required: true },
    state: { type: String, required: true },
    street: { type: String, required: true },
    zip: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
  },
  amenities: [{ type: String }],
  rentalType: { type: String, required: true },
  price: { type: Number, required: true },
  availableFrom: { type: Date, required: true },
  leaseType: { type: String, required: true },
  adType: { type: String, required: true },
  ownerName: { type: String, required: true },
  ownerPhone: { type: String, required: true },
  ownerEmail: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true },
  },
  image: { type: String, required: true }, // Store image as base64 string
});

const House = mongoose.model('House', houseSchema);

module.exports = House;