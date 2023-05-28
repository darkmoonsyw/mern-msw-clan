const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model("User")
require('dotenv').config()
const {JWT_SECRET} = require('../config/keys')
//const JWT_SECRET = process.env.JWT_SECRET

module.exports = (req, res, next)=>{
    const {authorization} = req.headers
    if (!authorization) {
        return res.status(401).json({error:"Please login first"})
    }
    
    const token = authorization.replace("MSW3000 ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if (err) {
            return res.status(401).json({error:"Please login first"})
        }

        const {_id} = payload
        User.findById(_id).then(userdata=>{
            req.user = userdata
            next()
        })
    })
}