const express = require('express')
const mongoose = require('mongoose')
const db = 'mongodb://yinghan:yinghan@cluster0-shard-00-00-lkidu.mongodb.net:27017,cluster0-shard-00-01-lkidu.mongodb.net:27017,cluster0-shard-00-02-lkidu.mongodb.net:27017/chatting?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
const app = express()
const Router = express.Router()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user-api')(Router)
const User = require('./model/user/user.model')


mongoose.connect(db, { useNewUrlParser: true })

var port = process.env.PORT || 5000;

app.use(cookieParser())
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use('/user', userRouter)


app.listen(port, function() {
  console.log('Node app starts at port ', port)
})

