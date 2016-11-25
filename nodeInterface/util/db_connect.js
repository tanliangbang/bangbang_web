//连接数据库
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'open00',
    database:'test'
});

connection.connect();
//查询
connection.query('select * from `mytable`', function(err, rows, fields) {
    if (err) throw err;
    console.log('查询结果为: ', rows);
});
//关闭连接
connection.end();