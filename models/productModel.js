const mongoose = require('mongoose')
const Schema = mongoose.Schema
const productSchema = new Schema({
    desc: String,
    clothType: String,
    colorData: [{
        color: String,
        code: String,
        qty: Number
    }],
    gender: String,
    age: String,
    price: String,
    supplier: String,
    qty: String,
    date: String,
    img: String
})

const Product = mongoose.model('Product', productSchema)


module.exports = Product
