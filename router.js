const express = require('express')
const router = express.Router()
const controler = require('./controler')


router.post('/verifylogin', controler.verifyToken)


/////////////////////////////////////////////



router.post('/addnewproduct', controler.addNewProduct)
router.post('/updateproduct', controler.updateProduct)
router.post('/logout', controler.logout)
router.post('/token', controler.token)

/////////////////////////////////////////////////////




module.exports = router