const mongoose = require('mongoose')
const Schema = mongoose.Schema
const orderSchema = new Schema({
    id: String,
    pid: String,
    color: String,
    size: String,
    qty: Number,
    status: String,
    address: String
})

const Order = mongoose.model('Order', orderSchema)


module.exports = Order