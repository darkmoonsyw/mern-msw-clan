const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const requireLogin = require('../middleware/requireLogin')
const {JWT_SECRET} = require('../config/keys')

const usernameRegex = /^[a-zA-Z0-9]+$/

//main part of the auth
router.post('/signup',(req,res)=>{
    console.log("Signup POST request from MSW")
    const {username,password,adminRemark,name,nickname,mainCharacter,avatar,joinDate} = req.body

    //Signup information validation
    //Check all fields filled
    if (!username || !password) {
        return res.status(422).json({error:"Please fill in all the fields,username " +username+" password :"+password})
    }
    if (username.length < 3 || username.length > 30){
        return res.status(422).json({error:"Username should be between 3-30 characters"})
    }
    if (!usernameRegex.test(username)) {
        return res.status(422).json({error:"Username can only contain alphanumeric characters and number"})
    }

    User.findOne({username:username})
     .then((savedUser)=>{
         if (savedUser) {
             return res.status(422).json({error:"User already exists"})
         }
         //hash password and save the user to db
         bcrypt.hash(password,4)
          .then(hashedPassword=>{
            const user = new User({
                username,
                password:hashedPassword,
                isAdmin:false,
                adminRemark,
                name,
                nickname,
                mainCharacter,
                avatar,
                joinDate
            })
            user.save()
             .then(user=>{
                 res.json({message:"New MSW user is created successfully"})
             })
             .catch(err=>{
                 console.log(err)
             })
          })
          .catch(err=>{
              console.log(err)
          })
     })
      .catch(err=>{
          console.log(err)
      })
})

router.post('/signin',(req,res)=>{
    const {username,password} = req.body

    if(!username || !password){
        return res.status(422).json({error:"Please fill in all fields"})
    }
    User.findOne({username:username})
     .then(savedUser=>{
         if (!savedUser) {
             return res.status(422).json({error:"User not exists"})
         }
         bcrypt.compare(password,savedUser.password)
          .then(doMatch=>{
              if(doMatch){
                  //res.json({message:"successfully signed in"})
                  const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                  const {_id,username,isAdmin,name,nickname,avatar,mainCharacter} = savedUser
                  res.json({token,user:{_id,username,isAdmin,name,nickname,avatar,mainCharacter}})
              } 
              else {
                  return res.status(422).json({error:"Invalid username or password"})
              }
          })
          .catch(err=>{
              console.log(err)
          })
     })
     .catch(err=>{
         console.log(err)
     })
})

router.post('/updateUserProfile',(req,res)=>{
    User.findByIdAndUpdate(req.body.userId,
    { "$set":{"name":req.body.name,
                "nickname":req.body.nickname,
                "avatar":req.body.avatar,
                "mainCharacter":req.body.mainCharacter}},
                (err,result)=>{
                    if (err) {
                        return res.status(422).json({error:"Unable to update Profile, please find Admin"})
                    }
                    return res.status(200).json({message:"Profile update successfully"})
                })
})

module.exports = router