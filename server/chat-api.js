const express = require('express')
const Router = express.Router()
const Chat = require('./model/user/chat.model')
const User = require('./model/user/user.model')

module.exports = function(router) {
  router.get('/getMsgList', (req, res) => {
    const userid = req.cookies.userid;

    let users = {};
    const findUser = new Promise((resolve, rej) => {
      User.find({}, (err, doc) => {
        if(err) {
          rej(err);
        }
        doc.forEach(userInfo => {
          users[userInfo._id] = {name: userInfo.user, avatar: userInfo.avatar};
        });
        resolve(users);
      });
    });
    

    findUser.then((users) => {
      Chat.find({'$or': [{from: userid}, {to: userid}]}, (err, doc) => {
        if(err) rej(err);
        if(!err) {
          return (res.json({
            code: 0,
            msg: doc,
            users: users
          }));
        }
      }
    )}).catch(console.err);
  });

  router.post('/readmsg', (req, res) => {
    const userId = req.cookies.userid;
    const { targetId }  = req.body;
    Chat.update({from: targetId, to: userId}, 
      {'$set': {isRead: true}}, 
      {'multi': true},
      (err, doc) => {
        console.log(doc)
      if(!err) {
        return res.json({code: 0, nums: doc.nModified});
      }
      return res.json({code:1, msg: 'failed to update'})
    })
  })

  return router
}
