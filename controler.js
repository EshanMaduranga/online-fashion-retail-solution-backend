
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')
require('dotenv').config()
const Product = require('./models/productModel')
const Cart = require('./models/cartModel')
const Order = require('./models/orderModel')
const Comment = require('./models/commentModel')
const User = require('./models/tokenModel')
const Token = require('./models/tokenModel')
const Address = require('./UserManagement/models/addressModel')

const imgupload = (req, res) => {
    const token = jwt.sign({username: 'eshan'}, process.env.KEY)

    res.status(401).json({token})
}
const loginHandeler = (req, res) => {
    const token = jwt.sign({username: 'eshan'}, process.env.KEY)

    res.status(401).json({token})
}


const verifyToken = (req, res) => {

    const {token} = req.body

    jwt.verify(token, process.env.KEY, (error, decoded) => {
        if(error) return res.status(401).json({error})

        res.json({decoded})
    })
}


const students = (req,res) => {

    const student = {name: 'eshan'}
    //console.log(req)
    res.json(req.user)
}
const logout = (req, res) => {
    const refreshToken = req.body.refreshToken

    Token.findOneAndDelete({refreshToken})
    .then(resp => res.json({resp}))
    .catch(error => res.json({error}))
}

const token =(req, res) =>{

    const refreshToken = req.body.refreshToken
    if(refreshToken == null) return res.sendStatus(401)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN,(err, decoded) => {
        if(err) return res.sendStatus(403)

        Token.findOne({refreshToken, email: decoded.email})
        .then(resp => {
            if(resp == null) return res.sendStatus(401)
            const token = jwt.sign({email: decoded.email,role: decoded.role}, process.env.ACCESS_TOKEN, {expiresIn: '20s'})
            res.json({token})
        })
        .catch(err => res.sendStatus(500))

    })

}

//////////////////////////////////////

const getAllProducts = (req, res) => {

    Product.find()
    .then(response => res.json({response}))
    .catch(error => res.json({error}))
}

const getProductById = (req, res) => {

    const id = req.body.id

    Product.findOne({id: id})
    .then(response => res.json({response}))
    .catch(error => res.json({error}))
}

const addNewProduct = (req, res) => {

    const {id, desc, price, cat, color, code, qty} = req.body

    const product = new Product({
        id: id,
        desc: desc,
        price: price,
        cat: cat,
        colorData: [{
            color: color,
            code: code,
            qty: qty
        }]
    })

    product.save()
    .then(response => res.json({response}))
    .catch(error => res.json({error}))
}

const updateProduct = async (req, res) => {

    const {id,color, code, qty} = req.body

    const data = {color: color, code: code, qty: qty}

    const product = await Product.findOne({ id })

    product.colorData.push({
        color: color,
        code: code,
        qty: qty
    })

    product.save()
    .then(response => res.json({response}))
    .catch(error => res.json({error}))

    
}

/////////////////////////////////////////////

const addCartItem = (req, res) => {
    const {id, pid, size, color, qty} = req.body

    console.log(req.body.id)

    const crtItem = new Cart({
        id,
        pid,
        size,
        color,
        qty
    })

    crtItem.save()
    .then(response => res.json({response}))
    .catch(error => res.json({error}))
}

const getcartItem = (req, res) => {
    const id = req.body.id

    Cart.find({id})
    .then(response => res.json({response}))
    .catch(error => res.json({error}))

}

const deleteCartItem = (req, res) => {
    const _id = req.body._id

    Cart.deleteOne({_id})
    .then(response => res.json({response}))
    .catch(error => res.json({error}))

}




//////////////////////////////////////////////

const addOrder = (req, res) => {
    const {id, pid, color,size, qty, status, address} = req.body
    const order = new Order({
        id,
        pid,
        color,
        size,
        qty,
        status,
        address
    })

    order.save()
    .then(response => res.json({response}))
    .catch(error => res.json({error}))

    
}


const getAllOrders = (req, res) => {

    const status = req.body.status

    Order.find({status})
    .then(response => res.json({response}))
    .catch(error => res.json({error}))
}

const getOrdersByUid = (req, res) => {
    const  id = req.body.id

    Order.find({id})
    .then(response => res.json({response}))
    .catch(error => res.json({error}))
}

const getOrderByOrderId = (req, res) => {
    const  _id = req.body.orderId

    Order.findOne({_id})
    .then(response => res.json({response}))
    .catch(error => res.json({error}))
}

const updateOrderSateByOrderId = (req, res) => {
    const  {_id, status} = req.body

    Order.findOneAndUpdate({_id},{status})
    .then(response => res.json({response}))
    .catch(error => res.json({error}))
}
//////////////////////////////////////////////////////

const createNewUser = (req, res) => {

    const {firstName, lastName, email, password} = req.body

    const user = new User({
        firstName,
        lastName,
        email,
        password
    })

    user.save()
    .then(response => res.json({response}))
    .catch(error => res.json({error}))
}

const getUserById = (req, res) => {

    const _id = req.body._id
console.log(_id)
    User.findOne({_id})
    .then(response => res.json({response}))
    .catch(error => res.json({error}))
}
//////////////////////////////////////////////////////
//////////////////// Shehan //////////////////////////
//////////////////////////////////////////////////////

const addNewComment = (req, res) => {
    const {pid, uid, orderId, comment} = req.body

    const newComment = new Comment({
        pid,
        uid,
        orderId,
        comment
    })

    newComment.save()
    .then(response => res.json({response}))
    .catch(error => res.json({error}))
}

const getCommentsByPid = (req, res) => {
    const pid = req.body.pid

    Comment.find({pid})
    .then(response => res.json({response}))
    .catch(error => res.json({error}))
}

const getCommentsByUid = (req, res) => {
    const uid = req.body.uid

    Comment.find({uid})
    .then(response => res.json({response}))
    .catch(error => res.json({error}))
}

const getCommentByOrderId = (req, res) => {
    const orderId = req.body.orderId

    Comment.findOne({orderId})
    .then(response => res.json({response}))
    .catch(error => res.json({error}))
}

const updateCommentByOrderId = (req, res) => {
    const {orderId, comment} = req.body

    Comment.findOneAndUpdate({orderId}, {comment})
    .then(response => res.json({response}))
    .catch(error => res.json({error}))
}

const deleteCommentByOrderId = (req, res) => {
    const orderId= req.body.orderId
    Comment.deleteOne({orderId})
    .then(response => res.json({response}))
    .catch(error => res.json({error}))
}

const updateProfileUserdataFname = (req, res) => {
    const {_id, firstName} = req.body
    User.findOneAndUpdate({_id}, {firstName})
    .then(response => res.json({response}))
    .catch(error => res.json({error}))
}

const updateProfileUserdataLname = (req, res) => {
    const {_id, lastName} = req.body
    
    User.findOneAndUpdate({_id}, {lastName})
    .then(response => res.json({response}))
    .catch(error => res.json({error}))
}

const updateProfileUserdataPw = (req, res) => {
    const {_id, password} = req.body
    
    User.findOneAndUpdate({_id}, {password})
    .then(response => res.json({response}))
    .catch(error => res.json({error}))
}

const updateProfileUserdataAddr = (req, res) => {
    const {ownerId, address} = req.body
    


    Address.findOne({ownerId})
    .then(response => {
        if(response == null) {
            const newAdd = new Address({
                ownerId,
                address
            })

            newAdd.save()
            .then(response => res.json({response}))
            .catch(error => res.json({error}))
        } else {
            Address.findOneAndUpdate({ownerId}, {address})
            .then(response => res.json({response}))
            .catch(error => res.json({error}))
        }
    })
    .catch(error => res.json({error}))
}


const getAddressByUid = (req, res) => {
    const {ownerId} = req.body

    Address.findOne({ownerId})
    .then(response => res.json({response}))
    .catch(error => res.json({error}))
}
//////////////////////////////////////////////////////
//////////////////// End Shehan //////////////////////
//////////////////////////////////////////////////////


exports.imgupload = imgupload
exports.loginHandeler = loginHandeler
exports.verifyToken = verifyToken
exports.students = students
exports.getAllProducts = getAllProducts
exports.getProductById = getProductById
exports.addNewProduct = addNewProduct
exports.updateProduct = updateProduct
exports.getOrderByOrderId = getOrderByOrderId

exports.addCartItem = addCartItem
exports.getcartItem = getcartItem
exports.deleteCartItem = deleteCartItem

exports.addOrder = addOrder
exports.getAllOrders = getAllOrders
exports.updateOrderSateByOrderId = updateOrderSateByOrderId

exports.getUserById = getUserById
exports.createNewUser = createNewUser
exports.updateProfileUserdataFname = updateProfileUserdataFname
exports.updateProfileUserdataLname = updateProfileUserdataLname
exports.updateProfileUserdataPw = updateProfileUserdataPw
exports.updateProfileUserdataAddr = updateProfileUserdataAddr
exports.getAddressByUid = getAddressByUid




exports.logout = logout
exports.token = token

//////////////////////////////////////////////////////
//////////////////// Shehan //////////////////////////
//////////////////////////////////////////////////////

exports.getCommentsByUid = getCommentsByUid
exports.getCommentsByPid = getCommentsByPid
exports.addNewComment = addNewComment
exports.getOrdersByUid = getOrdersByUid
exports.getCommentByOrderId = getCommentByOrderId
exports.updateCommentByOrderId = updateCommentByOrderId
exports.deleteCommentByOrderId = deleteCommentByOrderId
