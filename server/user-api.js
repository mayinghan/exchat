const express = require('express')
const Router = express.Router()

Router.get('/info', (req, res) => {
  //user no cookie
  return res.json({code:0})  //0: success
})


module.exports = Router