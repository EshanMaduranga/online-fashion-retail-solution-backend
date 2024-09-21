const mongoose = require('mongoose')
const Schema = mongoose.Schema

const inquirySchema =new Schema({
    name: String,
    inquiry: String,
    phoneNum: String,
    state: String
})
const Inquiry = mongoose.model('Inquiry', inquirySchema)

module.exports = Inquiry