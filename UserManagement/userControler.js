const User = require('./models/userModel')
const jwt = require('jsonwebtoken')
const Token = require('../models/tokenModel')
require('dotenv').config()

// register new user
const register = (req, res) => {
    const {dob, email, firstName, gender, lastName, password, role} = req.body





    User.findOne({email})
    .then(resp => {
        if(resp != null) return res.status(400).json({err: "User already exist! Use another email address."})

        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            dob,
            gender,
            role
        }) 

        newUser.save()
        .then(response => {

            const {email, role, _id, firstName, dob, gender} = response

            var today = new Date();
            var birthDate = new Date(dob);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            var ageCategory = ''
            if(age >= 70){
                ageCategory = 'Old Above'
            }else if(age >= 50){
                ageCategory = 'Middle Upper'
            }else if(age >= 40){
                ageCategory = 'Middlers'
            }else if(age >= 30){
                ageCategory = 'Young Upper'
            }else if(age >= 20){
                ageCategory = 'Youngers'
            }else if(age >= 13){
                ageCategory = 'Teenagers'
            }else if(age >= 5){
                ageCategory = 'Kids'
            }

            const token = jwt.sign({email,role, id:_id}, process.env.ACCESS_TOKEN, {expiresIn: '2h'})
            const refreshToken = jwt.sign({email,role}, process.env.REFRESH_TOKEN, {expiresIn: '1h'})



            //res.json({response: {id:_id, email, firstName: response.firstName, role}, token, refreshToken})
            res.json({response: {id:_id, email, firstName, role, ageCategory, gender}, token, refreshToken})
        })
        .catch(err => res.json({err}))
    })
    .catch(err => res.sendStatus(500))

   
}


//login user
const login = (req, res) => {
    const {email, password} = req.body
    

    User.findOne({email})
    .then(resp=>{
        //res.json(resp) 

        if(resp == null) return res.status(400).json({err: "no content"})

        if(resp.password !== password) return res.status(404).json({err: "Invalid username or password"})

        const {email, role, _id, firstName, dob, gender} = resp

        var today = new Date();
        var birthDate = new Date(dob);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        //"Kids" 5-12
        //"Teenagers" 13-19
        //"Youngers" 20-29
        //"Young Upper" 30-39
        //"Middlers" 40-49
        //"Middle Upper" 50-69
        //"Old Above" 70

        var ageCategory = ''
        if(age >= 70){
            ageCategory = 'Old Above'
        }else if(age >= 50){
            ageCategory = 'Middle Upper'
        }else if(age >= 40){
            ageCategory = 'Middlers'
        }else if(age >= 30){
            ageCategory = 'Young Upper'
        }else if(age >= 20){
            ageCategory = 'Youngers'
        }else if(age >= 13){
            ageCategory = 'Teenagers'
        }else if(age >= 5){
            ageCategory = 'Kids'
        }
    


        const token = jwt.sign({email,role, id:_id}, process.env.ACCESS_TOKEN, {expiresIn: '2h'})
        const refreshToken = jwt.sign({email,role}, process.env.REFRESH_TOKEN, {expiresIn: '1h'})


     
        const refToken =new Token({
            email,
            refreshToken
        })

        refToken.save()
        .then(response => {
            //res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000})
            res.json({response: {id:_id, email, firstName, role, ageCategory, gender}, token, refreshToken})
        })
        .catch(err => res.status(500).json({err: "server error"}))

        
    })
    .catch(err=>res.json({err: "server error"}))
}



exports.register = register
exports.login = login