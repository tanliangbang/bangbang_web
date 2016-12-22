/**
 * Created by funny on 2016/12/7.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../util/db.js');
var url = require('url');
var utilFn = require('../util/utilFn');
router.post('/addRes', function(req, res, next) {
      tableName = 'res_content_'+req.body.name;
      var sql = "insert into res (name,cname,type_specification) values "+
        "('"+req.body.name+"','"+req.body.cname+"','"+ req.body.type_specification+"')";
       var tableSql =  'CREATE TABLE '+tableName+' ('+
                    'id int(11) NOT NULL AUTO_INCREMENT,'+
                    'content longtext NOT NULL,'+
                    'createTime varchar(45) NOT NULL,'+
                    'modifiedTime varchar(45) NOT NULL,'+
                    'isOnLine int(2) NOT NULL DEFAULT 1,'+
                    'startTime varchar(45) NOT NULL ,'+
                    'endTime varchar(45) NOT NULL,'+
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



router.post('/addResContent', function(req, res, next) {
    tableName = 'res_content_'+req.body.name;
    var sql = "insert into "+tableName+" (content,startTime,endTime,isOnline,createTime,modifiedTime) values "+
        "('"+JSON.stringify(req.body.content)+"',from_unixtime("+req.body.startTime+"),from_unixtime("+ req.body.endTime+"),'"+ req.body.onLine+"',now(),now())";
    db.query(sql, function(err, rows, fields){
        if (err) {
           return;
        }else{
            utilFn.successSend(res);
        }
    });
});


router.get('/getResContentList', function(req, res, next) {
    var arg = url.parse(req.url, true).query
    var sql = "select * from res_content_"+arg.name;
    db.query(sql, function(err, rows, fields){
        if (err) {
            return;
        }
        utilFn.successSend(res,JSON.stringify(rows));
    });
});


module.exports = router;