const express = require('express')
const router = express.Router()
const controler = require('./controler')

router.post('/addcart', controler.addCartItem)
router.post('/getcartitem', controler.getcartItem)
router.post('/deletecartitem', controler.deleteCartItem)

module.exports = router