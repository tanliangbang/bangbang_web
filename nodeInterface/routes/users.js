var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../util/db.js');
var utilFn = require('../util/utilFn');


router.post('/login', function(req, res, next) {
  var sql = "select * from bang_users where username= '"+req.body.username+"' and password = '"+req.body.password +"'";
  db.query(sql, function(err, rows, fields){
    if (err) {
      console.log(err);
      return;
    }
    if(rows.length<=0){
      utilFn.successSend(res,null,500,'用户名密码错误');
    }else{
        req.session.user = rows[0];
        utilFn.successSend(res,rows[0],200);
    }
  });
});


router.post('/register', function(req, res, next) {
    var sql = "select id from bang_users where username= '"+req.body.username +"'";
    db.query(sql, function(err, rows, fields){
        if (err) {
            console.log(err);
            return;
        }
        if(rows.length>0){
            utilFn.successSend(res,null,500,'该用户已存在');
        }else{
            innerUser(req, res, next);
        }
    });
});


function innerUser(req, res, next){
    console.log("aaaaaaaaaaaaaa")
    var sql = "insert into bang_users (username,password,email) values "+
        "('"+req.body.username+"','"+req.body.password+"','"+ req.body.email+"')";
    db.query(sql, function(err, rows, fields){
        if (err) {
            console.log(err);
            return;
        }
        utilFn.successSend(res,null,200,'注册成功');

    });
}

router.get('/getUserInfo', function(req, res, next) {
   utilFn.successSend(res,req.session.user,200);
});


router.get('/loginOut', function(req, res, next) {
   req.session.user = null;
  utilFn.successSend(res,null,200);
});

module.exports = router;
