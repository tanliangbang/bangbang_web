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
                    'createTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,'+
                    'modifiedTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,'+
                    'isOnLine int(2) NOT NULL DEFAULT 1,'+
                    'startTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,'+
                    'endTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,'+
                    'PRIMARY KEY (id))';

        db.query(sql, function(err, rows, fields){
            if (err) {
                console.log(err);
                return;
            }else{
                db.query(tableSql,function(err, rows, fields){
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

    var tableName = 'res_content_'+req.body.name;
    var sql = "insert into "+tableName+" (content,startTime,endTime,isOnline,createTime,modifiedTime) values "+
        "("+db.escape(req.body.content)+",from_unixtime("+req.body.startTime+"),from_unixtime("+ req.body.endTime+"),'"+ req.body.onLine+"',now(),now())";
    console.log(sql)
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
        for(var i=0;i<rows.length;i++){
            rows[i].content  = JSON.parse(rows[i].content);
        }
        utilFn.successSend(res,JSON.stringify(rows));
    });
});

router.post('/delResContent', function(req, res, next) {
    var id =req.body.id;
    var type = req.body.type;
    var sql = "delete from res_content_"+type+" where id="+id;
    db.query(sql, function(err, rows, fields){
        if (err) {
            return;
        }
        utilFn.successSend(res);
    });
});

router.get('/getResContentById', function(req, res, next) {
    var arg = url.parse(req.url, true).query
    var sql = "select * from res_content_"+arg.name +" where id ="+arg.id;
    db.query(sql, function(err, rows, fields){
        if (err) {
            return;
        }
        rows[0].content = JSON.parse(rows[0].content)
        utilFn.successSend(res,JSON.stringify(rows));
    });
});




module.exports = router;