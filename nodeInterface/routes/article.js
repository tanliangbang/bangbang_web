/**
 * Created by funny on 2016/12/7.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../util/db.js');
var url = require('url');

router.post('/addArticle', function(req, res, next) {
      var sql = "insert into article (title,fromWhere,content,startTime,endTime) values "+
          "('"+req.body.title+"','"+req.body.fromWhere+"','"+ req.body.content+"','"+req.body.startTime+"','"+req.body.endTime+"')";
       db.query(sql, function(err, rows, fields){
      if (err) {
      console.log(err);
      return;
      }

      console.log(rows);
      });

});


router.get('/getArticleList', function(req, res, next) {
    var sql = "select * from article";
    console.log(sql)
    db.query(sql, function(err, rows, fields){
        if (err) {
            console.log(err);
            return;
        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(rows));
    });
});



router.get('/getArticleDetail', function(req, res, next) {
    var arg = url.parse(req.url, true).query
    console.log(arg.id);
    var sql = "select * from article where id =" + arg.id;
    db.query(sql, function(err, rows, fields){
        if (err) {
            console.log(err);
            return;
        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(rows));
    });
});

module.exports = router;