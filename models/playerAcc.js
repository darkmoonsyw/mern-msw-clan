const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const playerAccSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    clan:{
        type:Number
    },
    owner:{
        type:ObjectId,
        ref:"User"
    },
    seq:{  //no use currently
        type:Number
    }
},{timestamps:true})

mongoose.model("PlayerAcc",playerAccSchema)