const jwt = require('jsonwebtoken')
require('dotenv').config()


module.exports = function(req,res,next){
    if(req.headers.authorization && req.headers.authorization.startsWith('bearer')){
        const token = req.headers.authorization.split(' ')[1]

        if(token == null) return res.status(401).json({error:'empty token'})
        jwt.verify(token, process.env.ACCESS_TOKEN, (error, decoded)=>{
            if(error){
                if(error.name == "TokenExpiredError") return res.status(403).json({error: "TokenExpiredError"})
                return res.sendStatus(403)
            }
            req.authData = decoded
            next()
        })
        
    }
    else{
        res.status(401).json({error:'no bearer'})
    }
}