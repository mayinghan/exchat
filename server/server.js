const express = require('express')
const mongoose = require('mongoose')
const db = 'mongodb+srv://yinghan:yinghan@cluster0-lkidu.mongodb.net/test?retryWrites=true'
const app = express()
const Router = express.Router()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user-api')(Router)
//work with express
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('user loged in');
});

mongoose.connect(db, { useNewUrlParser: true })

var port = process.env.PORT || 5000;

app.use(cookieParser())
app.use(bodyParser.json())
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// })

app.use('/user', userRouter)

//bound with io server+express instead of express app itself
server.listen(port, function() {
  console.log('Node app starts at port ', port)
})

