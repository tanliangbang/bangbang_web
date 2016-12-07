var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../util/db.js');

router.get('/login', function(req, res, next) {

  var sql = 'select * from users';
  db.query(sql, function(err, rows, fields){
    if (err) {
      console.log(err);
      return;
    }
    console.log(rows);
  });

});

module.exports = router;
