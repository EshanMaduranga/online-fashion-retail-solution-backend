const controler = require('./controler')
const express = require('express')
const router = express.Router()

router.post('/productcomment', controler.getCommentsByPid)
router.post('/usercomment', controler.getCommentsByUid)
router.post('/createcomment', controler.addNewComment)
router.post('/getcommentbyorderid', controler.getCommentByOrderId)
router.patch('/updatecommentbyorderid', controler.updateCommentByOrderId)
router.post('/deletecommentbyorderid', controler.deleteCommentByOrderId)

module.exports = router