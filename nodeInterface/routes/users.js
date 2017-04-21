var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../util/db.js');
var utilFn = require('../util/utilFn');


router.post('/login', function(req, res, next) {
  var sql = "select id,username,userAavar,nick,phone,address,job,sex,userBreif from bang_users where username= '"+req.body.username+"' and password = '"+req.body.password +"'";
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
            utilFn.successSend(res,null,500,'请求失败');
            return;
        }
        if(rows.length>0){
            utilFn.successSend(res,null,511,'该用户已存在');
        }else{
            innerUser(req, res, next);
        }
    });
});


function innerUser(req, res, next){
    var sql = "insert into bang_users (username,password) values "+
        "('"+req.body.username+"','"+req.body.password+"')";
    var getSql = "select * from bang_users where username= '"+req.body.username+"' and password = '"+req.body.password +"'";

    db.query(sql, function(err, rows, fields){
        if (err) {
            console.log(err);
            return;
        }
        db.query(getSql, function(err, rows, fields){
            if (err) {
                console.log(err);
                return;
            }
           {
                req.session.user = rows[0];
                utilFn.successSend(res,rows[0],200,'注册成功');
            }
        });

    });
}

router.post('/changeUserInfo', function(req, res, next) {
    var sql =  "update bang_users set userAavar='"+ utilFn.checkEmpty(req.body.userAavar)+"',nick='"+utilFn.checkEmpty(req.body.nick)+"',phone='" +
         utilFn.checkEmpty(req.body.phone)+"',address='"+utilFn.checkEmpty(req.body.address)+"',job='"+utilFn.checkEmpty(req.body.job)+"',sex = '"+utilFn.checkEmpty(req.body.sex)+"',userBreif='"+utilFn.checkEmpty(req.body.userBreif)+"' where id="+req.session.user.id;
    var userSql ="select id,username,userAavar,nick,phone,address,job,sex,userBreif from bang_users where id = "+req.session.user.id ;
    db.query(sql, function(err, rows, fields){
        if (err) {
            utilFn.successSend(res,null,500,'请求失败');
            return;
        }
        db.query(userSql, function(err, rows, fields){
            if (err) {
                utilFn.successSend(res,null,500,'请求失败');
                return;
            }
            req.session.user = rows[0];
            utilFn.successSend(res,rows[0],200,'修改成功');
        });
    });
});



router.get('/getUserInfo', function(req, res, next) {
   utilFn.successSend(res,req.session.user,200);
});


router.get('/loginOut', function(req, res, next) {
   req.session.user = null;
  utilFn.successSend(res,null,200);
});

module.exports = router;
