var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../util/db.js');
var utilFn = require('../util/utilFn');


router.post('/login', function(req, res, next) {
  console.log(req.session)
  var sql = "select * from bang_users where username= '"+req.body.username+"' and password = '"+req.body.password +"'";
  db.query(sql, function(err, rows, fields){
    if (err) {
      console.log(err);
      return;
    }
    if(rows.length<=0){
      utilFn.successSend(res,null,500,'用户名密码错误');
    }else{
        utilFn.successSend(res,rows[0],200);

    }
  });


});

module.exports = router;
