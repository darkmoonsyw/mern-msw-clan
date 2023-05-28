const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const clanWarHistSchema = new mongoose.Schema({
    season:{
        type:Number,
        required:true
    },
    week:{
        type:Number,
        required:true
    },
    matchDate:{
        type:Date,
    },
    clan:{
        type:Number,
        required:true
    },
    vs:{
        type:String
    },
    ourHead:{
        type:Number,
    },
    oppositeHead:{
        type:Number,
    },
    isWin:{
        type:Boolean,
        required:true
    }
},{timestamps:true})

mongoose.model("ClanWarHist",clanWarHistSchema)