const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    clothId: { type: String, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Stock', stockSchema);