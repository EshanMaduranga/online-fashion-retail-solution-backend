const express = require('express')
const router = express.Router()
const controler = require('../../controler')
const userControler = require('../userControler')



router.post('/register', userControler.register)
router.post('/login', userControler.login)
router.post('/getuserbyid', controler.getUserById)
router.post('/createuser', controler.createNewUser)
router.patch('/updateuserfname', controler.updateProfileUserdataFname)
router.patch('/updateuserlname', controler.updateProfileUserdataLname)
router.patch('/updateuserpw', controler.updateProfileUserdataPw)
router.post('/updateuseraddress', controler.updateProfileUserdataAddr)
router.post('/getaddressbyuid', controler.getAddressByUid)


module.exports = router