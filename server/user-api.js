const express = require('express')
const Router = express.Router()
const User = require('./model/user/user.model')
const bcrypt = require('bcrypt-nodejs')
const _filter = {'pwd': 0, '__v': 0}

module.exports = function(router) {

  router.post('/register', (req, res) => {
    let user = new User()
    user.user = req.body.user
    user.type = req.body.type
    console.log(req.body);
    if(user.type === 'expert') {
      if(req.body.code !== 'FarGo2019!') {
        console.log('wrong code ', req.body.code)
        return res.json({
          code: 1,
          msg:'Wrong code! Pls contact the admin'
        })
      }
    }
    //check if user exist
    User.findOne({user:user.user}, function(err, doc) {
      if(doc) {
        return res.json({code:1, msg:'Duplicated username!'})
      } else {
        bcrypt.hash(req.body.pwd, null, null, function(err, hash) {
          if(err) return next(err)
          user.pwd = hash;
        })
        user.save(function(e, d) {
          if(e) {
            console.log(e)
            return res.json({code:1, msg:'internal server error'})
          }
          console.log(d)
          const {user, type, _id} = d
          res.cookie('userid', _id)
          return res.json({code:0, data:{user, type}})
        })
      }
    })
  });

  router.post('/login', (req, res) => {
    User.findOne({user: req.body.user}).exec(function(err, doc) {
      if(err) console.log(err)
      if(!doc) {
        res.send({
          code:1,
          msg:'cannot authenticate this user'
        })
      } else if (!doc.comparePassword(req.body.pwd)) {
        res.send({
          code:1,
          msg:'username / password error'
        })
      } else {
        console.log(doc)
        res.cookie('userid', doc._id)
        res.json({
          code:0,
          msg:'login success!',
          data: doc
        })
      }
    })
  });

  router.get('/info', (req, res) => {
    const {userid} = req.cookies
    if(!userid) {
      return res.json({
        code:1,
        msg:'user not authorized'
      });
    }
    User.findOne({_id: userid}, _filter, function(err, doc) {
      if(err) {
        return res.json({
            code: 1,
            msg: 'Internal server error!'
        })
      } else if(!doc) {
        return res.json({
          code:1,
          msg: 'Empty info on this user!'
        })
      } else {
        return res.json({
          code: 0,
          data: doc
        })
      }
      
    })
  })


  router.post('/update', function(req, res) {
    const userid = req.cookies.userid
    if(!userid) {
      return res.json({code:1})
    }

    const body = req.body
    console.log(body)
    User.findByIdAndUpdate(userid, body, (err, doc) => {
      const data = Object.assign({}, {
        user: doc.user,
        type: doc.type
      }, body)
      return res.json({code:0, data})
    })
  })
  
  router.get('/list', (req, res) => {
    const { type } = req.query;
    console.log(type);
    User.find({type}, (err, doc) => {
      if(err) {
        console.log(err);
      }

      return res.json({code: 0, data: doc });
    })
  })

  return router
}
