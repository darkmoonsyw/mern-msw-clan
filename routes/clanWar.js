const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const ClanWarHist = mongoose.model("ClanWarHist")
const Fighter = mongoose.model("Fighter")
const User = mongoose.model("User")

router.post('/createFighter',(req,res)=>{
    const {playerCharacterList,playerUserList,playerNameList,clanWarRecord} = req.body
    console.log("clanWarRecord",clanWarRecord.clanWarRecord)
    if(!clanWarRecord){
        res.json({message:"Faill to create clan war record"})
    }
    for (i=0 ; i<5 ; i++){
        if (playerUserList[i] != ""){
            const fighter = new Fighter({
                character:playerCharacterList[i],
                name:playerUserList[i].adminRemark,
                owner:playerUserList[i],
                clanWarRecord:clanWarRecord.clanWarRecord,
                isOurSide:true
            })
            fighter.save().then(result=>{
                console.log(result)
            })
            .catch(err=>{
                console.log(err)
            })
        } else {
            const fighter = new Fighter({
                character:playerCharacterList[i],
                name:playerNameList[i],
                clanWarRecord:clanWarRecord.clanWarRecord,
                isOurSide:true
            })
            fighter.save().then(result=>{
                console.log(result)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
    for (i=5;i<10;i++){
        const fighter = new Fighter({
            character:playerCharacterList[i],
            name:playerNameList[i],
            clanWarRecord:clanWarRecord.clanWarRecord,
            isOurSide:false
        })
        fighter.save().then(result=>{
            console.log(result)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    res.json({message:"New Clan War Record is created successfully"})
})

router.post('/createClanWarHist',(req,res)=>{
    const {season,week,matchDate,clan,ourHead,oppositeHead,isWin,vs} = req.body
    var clanWarRecord = []
    if (!season || !week || !clan) {
        return res.status(422).json({error:"Please fill in season, week and clan"})
    }
    
    const clanWarHist = new ClanWarHist({
        season,
        week,
        matchDate,
        clan,
        vs,
        ourHead,
        oppositeHead,
        isWin
    })
    clanWarHist.save().then(result=>{
        res.json({clanWarRecord:result})
        console.log(clanWarRecord)
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/clanWarDetail',(req,res)=>{
    ClanWarHist
    .aggregate([{
        $lookup:{
            from: "fighters",
            localField: "_id",
            foreignField: "clanWarRecord",
            as: "fighters"
        }
    }])
    .then((clanWarDetail)=>{
        res.json({clanWarDetail})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/clanWarRanking',(req,res)=>{
    User
    .aggregate([
        {
            $lookup:{
                from: "fighters",
                localField: "_id",
                foreignField: "owner",
                as: "joinedFight"
            }
        }
    ])
    .then((clanWarRanking)=>{
        res.json({clanWarRanking})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/clanWarRankingWin',(req,res)=>{
    User
    .aggregate([
        {
            $lookup:{
                from: "fighters",
                localField: "_id",
                foreignField: "owner",
                as: "joinedFight"
            }
        },
        {
            $unwind:{
                path:"$joinedFight",
                preserveNullAndEmptyArrays:false
            }
        },
        {
            $lookup:{
                from: "clanwarhists",
                localField:"joinedFight.clanWarRecord",
                foreignField:"_id",
                as: "clanWarDetail"
            }
        },
        {
            $match:{"clanWarDetail.isWin":true},
        },
        {
            $group:{
                "_id": "$_id",
                "winCnt":{$sum:1}
            }
        }
    ])
    .then((clanWarRankingWin)=>{
        res.json({clanWarRankingWin})
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router