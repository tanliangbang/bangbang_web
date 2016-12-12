/**
 * Created by funny on 2016/12/7.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../util/db.js');

router.post('/addArticle', function(req, res, next) {
     // var sql = "insert into article (title,fromWhere,content,startTime,endTime) values ('aaaaaa','bbbbbbb','sdfsdf',now(),now())";
     console.log(req.body)
     /*  db.query(sql, function(err, rows, fields){
      if (err) {
      console.log(err);
      return;
      }
      console.log(rows);
      });*/

});

module.exports = router;