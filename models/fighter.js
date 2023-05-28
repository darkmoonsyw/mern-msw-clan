const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const fighterSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    character:{
        type:String,
        required:true
    },
    owner:{
        type:ObjectId,
        ref:"User"
    },
    clanWarRecord:{
        type:ObjectId,
        ref:"ClanWarHist"
    },
    isOurSide:{
        type:Boolean
    }
},{timestamps:true})

mongoose.model("Fighter",fighterSchema)