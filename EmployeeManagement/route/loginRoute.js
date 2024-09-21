const express = require('express');
const router = express.Router();
const Employee = require('../model/employee.model')
const Token = require('../../models/tokenModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.post('/', (req, res) => {
    const {email, password} = req.body
    const role = 'emp'

    Employee.findOne({email})
    .then(resp=>{
        //console.log(resp) 

        if(resp == null) return res.status(400).json({err: "no content"})

        if(resp.password !== password) return res.status(404).json({err: "Invalid username or password"})

        const token = jwt.sign({email,role}, process.env.ACCESS_TOKEN, {expiresIn: '2h'})
        const refreshToken = jwt.sign({email,role}, process.env.REFRESH_TOKEN, {expiresIn: '1h'})
     
        const refToken =new Token({
            email,
            refreshToken
        })

        refToken.save()
        .then(response => {
            res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000})
            res.json({response: {_id:resp.id, firstName:resp.firstName, email: resp.email, role: resp.role}, token})
        })
        .catch(err => res.status(500).json({err: "server error"}))

        
    })
    .catch(err=>res.json({err: "server error"}))
})

module.exports = router