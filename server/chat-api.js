const express = require('express')
const Router = express.Router()
const Chat = require('./model/user/chat.model')

module.exports = function(router) {
  router.get('/getMsgList', (req, res) => {
    const userid = req.cookies.userid;
    Chat.find({}, (err, doc) => {
      if(!err) {
        return res.json({
          code: 0,
          msg: doc
        })
      }
    })
  })

  return router
}
