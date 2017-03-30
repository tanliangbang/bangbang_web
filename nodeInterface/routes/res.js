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
      tableName = 'res_content_'+req.body.name.toLowerCase();
      var sql = "insert into res (name,cname,type_specification) values "+
        "('"+req.body.name.toLowerCase()+"','"+req.body.cname+"','"+ req.body.type_specification+"')";
       var tableSql =  'CREATE TABLE '+tableName+' ('+
                    'id int(11) NOT NULL AUTO_INCREMENT,'+
                    'content longtext NOT NULL,'+
                    'createTime TIMESTAMP NOT NULL DEFAULT "0000-00-00 00:00:00",'+
                    'modifiedTime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,'+
                    'isOnLine int(2) NOT NULL DEFAULT 1,'+
                    'readyNum int(11) NOT NULL DEFAULT 0,'+
                    'isRecommend int(2) NOT NULL DEFAULT 0,'+
                    'startTime timestamp NOT NULL DEFAULT "0000-00-00 00:00:00",'+
                    'endTime timestamp NOT NULL DEFAULT "0000-00-00 00:00:00",'+
                    'PRIMARY KEY (id))';
        db.query(sql, function(err, rows, fields){
            if (err) {
                console.log(err);
                return;
            }else{
                db.query(tableSql, function(err, rows, fields) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    utilFn.successSend(res);
                });
            }
        });
});

router.post('/updateRes', function(req, res, next) {
    var sql = "update res set name='"+req.body.name.toLowerCase()+"',cname='"+req.body.cname+"',type_specification='"+req.body.type_specification
    +"' where id = "+req.body.id;
    db.query(sql, function(err, rows, fields){
        if (err) {
            console.log(err);
            return;
        }
        utilFn.successSend(res);
    });
});


router.post('/delRes', function(req, res, next) {
    var sql = "delete from res where id ="+req.body.id;
    db.query(sql, function(err, rows, fields){
        if (err) {
            return;
        }
        utilFn.successSend(res);
    });
});


router.get('/getResList', function(req, res, next) {
    var sql = "select * from res";
    db.query(sql, function(err, rows, fields){
        if (err) {
            return;
        }
        utilFn.successSend(res,rows);
    });
});


router.get('/getRes', function(req, res, next) {
    var arg = url.parse(req.url, true).query
    var sql = "select * from res where id =" + arg.id;
    db.query(sql, function(err, rows, fields){
        if (err) {
            return;
        }
        utilFn.successSend(res,rows);
    });
});



router.post('/addResContent', function(req, res, next) {
    var tableName = 'res_content_'+req.body.name.toLowerCase();
    var sql = "insert into "+tableName+" (content,startTime,endTime,isOnline,createTime,modifiedTime,readyNum) values ("+
        db.escape(req.body.content)+",from_unixtime('"+req.body.startTime+"'),from_unixtime('"+ req.body.endTime+"'),"+ req.body.onLine+",now(),now(),0)";
    db.query(sql, function(err, rows, fields){
        if (err) {
           return;
        }else{
            utilFn.successSend(res);
        }
    });
});


router.post('/UpdateResContent', function(req, res, next) {
    var tableName = 'res_content_'+req.body.name.toLowerCase();

    var sql =  "update "+tableName+" set content="+ db.escape(req.body.content)+",startTime="+"from_unixtime('"+req.body.startTime+"'),endTime=" +
        "from_unixtime('"+ req.body.endTime+"'),isOnline="+req.body.onLine+",modifiedTime=now() where id = "+req.body.resContentId;
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
    var start = 0;
    var end = 10;
    if(arg.start){
        start = arg.start;
    }
    if(arg.size){
        end = arg.size;
    }
    var sql = "select * from res_content_"+arg.name.toLowerCase() + " order by createTime desc limit "+start+","+end;
    var totalSql = "select count(id) as total from res_content_"+arg.name.toLowerCase()
    db.query(sql, function(err, rows, fields){
        if (err) {
            return;
        }
        for(var i=0;i<rows.length;i++){
            rows[i].content  = JSON.parse(rows[i].content);
        }
        var content =rows;
        db.query(totalSql, function(err, rows, fields){
            if (err) {
                return;
            }
            var data={content:content,pageTotal:rows[0].total}
            utilFn.successSend(res,data);
        });

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
    var sql = "select * from res_content_"+arg.name.toLowerCase() +" where id ="+arg.id;
    var updateSql = "update res_content_"+arg.name.toLowerCase() +" set readyNum = "
    db.query(sql, function(err, rows, fields){
        if (err) {
            return;
        }
        rows[0].content = JSON.parse(rows[0].content);
        updateSql = updateSql + (parseInt(rows[0].readyNum)+1)+" where id ="+arg.id;
        db.query(updateSql, function(err, rows, fields) {
            if (err) {
                return;
            }
        });
        utilFn.successSend(res,rows);
    });
});



router.get('/recommend', function(req, res, next) {
    var arg = url.parse(req.url, true).query
    var sql = "select * from res_content_"+arg.name.toLowerCase() +" where isRecommend=1 limit 0,"+arg.size;
    db.query(sql, function(err, rows, fields){
        if (err) {
            return;
        }
        for(var i=0;i<rows.length;i++){
            rows[i].content  = JSON.parse(rows[i].content);
        }
        utilFn.successSend(res,rows);
    });
});


router.get('/readyRank', function(req, res, next) {
    var arg = url.parse(req.url, true).query
    var sql = "select * from res_content_"+arg.name.toLowerCase() +" order by readyNum desc limit 0,"+arg.size;
    db.query(sql, function(err, rows, fields){
        if (err) {
            return;
        }
        for(var i=0;i<rows.length;i++){
            rows[i].content  = JSON.parse(rows[i].content);
        }
        utilFn.successSend(res,rows);
    });
});





module.exports = router;