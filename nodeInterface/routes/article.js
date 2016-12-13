/**
 * Created by funny on 2016/12/7.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../util/db.js');

router.post('/addArticle', function(req, res, next) {
      var sql = "insert into article (title,fromWhere,content,startTime,endTime) values "+
          "('"+req.body.title+"','"+req.body.fromWhere+"','"+ req.body.content+"','"+req.body.startTime+"','"+req.body.endTime+"')";
     console.log(sql)
       db.query(sql, function(err, rows, fields){
      if (err) {
      console.log(err);
      return;
      }
      console.log(rows);
      });

});

module.exports = router;