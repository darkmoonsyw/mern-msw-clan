const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')
const {MONGOURI} = require('./config/keys')

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
mongoose.connection.on('connected',()=>{
    console.log("Connected to MSW mongo successfully!")
})
mongoose.connection.on('error',(err)=>{
    console.log("Fail to connect MSW mongodb", err)
})

require('./models/user')
require('./models/playerAcc')
require('./models/clanWarHist')
//require('./models/clanEvent')
require('./models/fighter')

app.use(express.json()) //need to use before the routes
app.use(cors())
app.use(require('./routes/auth')) //handle user signup , signin
app.use(require('./routes/member'))
app.use(require('./routes/playerAcc'))
app.use(require('./routes/clanWar'))

if (process.env.NODE_ENV=="production") {
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("server is running on ",PORT)
})