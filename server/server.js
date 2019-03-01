const express = require('express')
const mongoose = require('mongoose')
const db = 'mongodb://fargo:fargo123@ds035503.mlab.com:35503/ufwebapp'
const app = express()
const userRouter = require('./user-api')

mongoose.connect(db)

var port = process.env.PORT || 9093;

app.use('/user', userRouter)



app.listen(9093, function() {
  console.log('Node app starts at port 9093 locally')
})

