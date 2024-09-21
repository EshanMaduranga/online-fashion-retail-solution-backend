const mongoose = require('mongoose');

const subSchema = new mongoose.Schema({
    color: String,
    code:String,
    qty: String
});

const inventorySchema = new mongoose.Schema({
    desc: String,
    fullDesc: String,
    clothType: String,
    colorData: [{}],
    gender: String,
    age: String,
    price: String,
    supplier: String,
    qty: String,
    date: String,
    img: String

});

module.exports = mongoose.model('Inventory', inventorySchema);