const jwt = require('jsonwebtoken')
require('dotenv').config()
const Token = require('./models/tokenModel')

const getRefreshToken = (req,res) => {

    const cookies = req.cookies
    if(!cookies?.jwt) return res.status(401).json({msg:'no cookie'})

    const refreshToken = cookies.jwt

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN,(err, decoded) => {
        if(err) return res.sendStatus(403)

        Token.findOne({refreshToken, email: decoded.email})
        .then(resp => {
            if(resp == null) return res.status(401).json({msg:'null resp'})
            const token = jwt.sign({email: decoded.email,role: decoded.role}, process.env.ACCESS_TOKEN, {expiresIn: '40s'})
            res.json({token})
        })
        .catch(err => res.sendStatus(500))

    })

}

exports.getRefreshToken = getRefreshToken