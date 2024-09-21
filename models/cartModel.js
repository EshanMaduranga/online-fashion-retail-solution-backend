const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema =new Schema({
    id: String,
    pid: String,
    size: String,
    color: String,
    qty: Number
})
const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart