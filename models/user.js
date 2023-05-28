const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        minlength:[3,"Username should be between 3-30 characters"], 
        maxlength:[30,"Username should be between 3-30 characters"],
        match: [/^[a-zA-Z0-9]+$/, 'Username can only contain alphanumeric characters and number'],
        index:true
    },
    password:{
        type:String,
        required:true
    },
    adminRemark:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    name:{
        type:String,
        minlength:[2,"Username should be between 2-10 characters"], 
        maxlength:[10,"Username should be between 2-10 characters"],
        required:true
    },
    nickname:{
        type:String
    },
    description:{
        type:String
    },
    mainCharacter:{   
        type:String
    },
    avatar:{
        type:String
    },
    joinDate:{
        type:Date
    },
    email: {
        type:String
    }
},{timestamps:true})

mongoose.model("User",userSchema)