/**
 * Created by funny on 2016/12/7.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../util/db.js');
var url = require('url');

router.post('/addRes', function(req, res, next) {
      tableName = 'res_content_'+req.body.name;
      var sql = "insert into res (name,cname,type_specification) values "+
        "('"+req.body.name+"','"+req.body.cname+"','"+ req.body.type_specification+"')";
       var tableSql =  'CREATE TABLE '+tableName+' ('+
                    'id int(11) NOT NULL AUTO_INCREMENT,'+
                    'bucket varchar(45) NOT NULL,'+
                    'content longtext NOT NULL,'+
                    'createTime timestamp NOT NULL,'+
                    'modifiedTime timestamp NOT NULL,'+
                    'isOnLine int(2) NOT NULL DEFAULT 1,'+
                    'startTime timestamp NOT NULL ,'+
                    'endTime timestamp NOT NULL,'+
                    'PRIMARY KEY (id))';

        db.query(sql, function(err, rows, fields){
            if (err) {
                console.log(err);
                return;
            }else{
                db.query(tableSql,function(err, rows, fields){
                    console.log(rows);
                });
            }
        });
});


router.get('/getResList', function(req, res, next) {
    var sql = "select * from res";
    db.query(sql, function(err, rows, fields){
        if (err) {
            return;
        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(rows));
    });
});


router.get('/getRes', function(req, res, next) {
    var arg = url.parse(req.url, true).query
    console.log(arg);
    var sql = "select * from res where id =" + arg.id;
    db.query(sql, function(err, rows, fields){
        if (err) {
            return;
        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(rows));
    });
});


module.exports = router;