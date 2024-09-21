const express = require('express')
const router = express.Router()
const controler = require('./controler')

router.post('/addorder', controler.addOrder)
router.post('/getorders', controler.getAllOrders)
router.post('/getordersbyuid', controler.getOrdersByUid)
router.post('/getorderbyorderid', controler.getOrderByOrderId)
router.patch('/updateordersatebyorderid', controler.updateOrderSateByOrderId)

module.exports = router