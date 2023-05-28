const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const PlayerAcc = mongoose.model("PlayerAcc")

router.post('/createPlayerAccByAdmin',(req,res)=>{
    const {name,clan,seq,owner} = req.body
    console.log(owner)
    if (!name || !owner) {
        return res.status(422).json({error:"Please field in name and owner"})
    }
    PlayerAcc.findOne({name:name})
     .then((savedAcc)=>{
        if (savedAcc) {
            return res.status(422).json({error:"Player acc is already exists"})
        }
        const playerAcc = new PlayerAcc({
            name,
            clan,
            seq,
            owner
        })
        playerAcc.save().then(result=>{
            res.json({message:"New Player Acc is created successfully"})
        })
        .catch(err=>{
            console.log(err)
        })
     })
     .catch(err=>{
         console.log(err)
     })
    
})

module.exports = router