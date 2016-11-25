var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.post('/login', function(req, res, next) {
  //连接数据库
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database:'bangbang_web'
  });

  connection.connect(function(error, results) {
    if(error) {
      console.log('Connection Error: ' + error.message);
      return;
    }
    console.log('Connected to MySQL');
  });
//查询
  connection.query('select * from `users`', function(err, rows, fields) {
    if (err) throw err;
    console.log('查询结果为: ', rows);
  });
//关闭连接
  connection.end();
});

module.exports = router;
