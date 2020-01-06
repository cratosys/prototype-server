var express = require('express');
var router = express.Router();
var path = require('path');
var public = path.join(__dirname, '../public/dist/');
var util = require('../helpers/util');
var atob = require('atob');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('#$up3rm@n!@2020');
let dp = '4fd888058ab54546e6c5c523dc18ae9394cf3b1d627b02db87fd4c6466573d0e622b0b558cb568ea40854bc276fe614ee3e5a3466110f647555040fa8ab75d8896f10a70f7b9cd0213c1631bb630c7a0b9e93517153124581543bb6f0fe9c3dfbb70453b8c78432181c28f3e58a4f3969036f47bc764';
var size = require('window-size');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  console.log(req.query)
  let username=req.query.username;
  let password=req.query.password;
  let f = username+password
  const decryptedString = cryptr.decrypt(dp);

  if(f === decryptedString) {
    req.session.from_session = 99.99;
    res.redirect('/demo-static');
  }else {
    res.redirect('/');
  }

});


router.get('/demo-static', function(req, res, next) {
  //console.log(req.session.from_session)
  if(req.session.from_session == 99.99) {
    res.render('demo', {url : 'dist/index.html'});
  }else {
    res.redirect('/');
  }
  
});
module.exports = router;
