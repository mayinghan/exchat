const express = require('express')
const Router = express.Router()
const Chat = require('./model/user/chat.model')
const User = require('./model/user/user.model')

module.exports = function(router) {
  router.get('/getMsgList', (req, res) => {
    const userid = req.cookies.userid;

    let users = {};
    User.find({}, (err, doc) => {
      
      doc.forEach(userInfo => {
        users[userInfo._id] = {name: userInfo.user, avatar: userInfo.avatar};
      })
    });

    Chat.find({'$or': [{from: userid}, {to: userid}]}, (err, doc) => {
      if(!err) {
        return res.json({
          code: 0,
          msg: doc,
          users: users
        })
      }
    })
  });

  router.post('/readmsg', (req, res) => {
    const userId = req.cookies.userid;
    const { targetId }  = req.body;
    Chat.update({from: targetId, to: userId}, 
      {'multi': true},
      {'$set': {read: true}}, 
      (err, doc) => {
        console.log(doc)
      if(!err) {
        return res.json({code: 0});
      }
      return res.json({code:1, msg: 'failed to update'})
    })
  })

  return router
}
