const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const PlayerAcc = mongoose.model("PlayerAcc")

router.get('/allUser',(req,res)=>{
    User.find()
     .select("-password -username")
     .then((users)=>{
         res.json({users})
     })
    .catch(err=>{
        console.log(error)
    })
})

//All users with accs with clan war join time and clan war win rate
router.get('/allUserWithDetail',(req,res)=>{
    User
    .aggregate([{
        $lookup:{
            from: "playeraccs",
            localField: "_id",
            foreignField: "owner",
            as: "playerAccs"
        }
    }])
    .then((users)=>{
        res.json({users})
    })
    .catch(err=>{
        console.log(err)
    })
})

const hulkRegex = new RegExp(/^Hulk/i)
router.get('/allHulkAcc',(req,res)=>{
    PlayerAcc.find({name: hulkRegex})
    .populate("owner","_id name avatar")
    .then((hulkAccs)=>{
        res.json({hulkAccs})
    }).catch(err=>{
        console.log(err)
    })
})

router.get('/clanMember/:clanId',(req,res)=>{
    PlayerAcc.find({clan:req.params.clanId})
    .populate("owner","_id name adminRemark avatar")
    .then((clanMember)=>{
        res.json({clanMember})
    }).catch(err=>{
        console/log(err)
    })
})

router.get('/allMemberAcc',(req,res)=>{
    PlayerAcc.find()
     .populate("owner","_id name nickname mainCharacter joinDate")
     .then((users)=>{
         res.json({users})
     }).catch(err=>{
         console.log(err)
     })
})

module.exports = router