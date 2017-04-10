/**
 * Created by funny on 2016/12/7.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../util/db.js');
var url = require('url');
var utilFn = require('../util/utilFn');
var async = require('async');



router.post('/addRes', function(req, res, next) {
      tableName = 'res_content_'+req.body.name.toLowerCase();
      var sql = "insert into res (name,cname,res_type,type_specification) values "+
        "('"+req.body.name.toLowerCase()+"','"+req.body.cname+"'"+",'"+req.body.res_type+"','"+ req.body.type_specification+"')";
       var tableSql =  'CREATE TABLE '+tableName+' ('+
                    'id int(11) NOT NULL AUTO_INCREMENT,'+
                    'content longtext NOT NULL,'+
                    'createTime TIMESTAMP NOT NULL DEFAULT "0000-00-00 00:00:00",'+
                    'modifiedTime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,'+
                    'isOnLine int(2) NOT NULL DEFAULT 1,'+
                    'readyNum int(11) NOT NULL DEFAULT 0,'+
                    'isRecommend int(2) NOT NULL DEFAULT 0,'+
                    'from_uid int(11) NOT NULL DEFAULT 0,'+
                    'startTime timestamp NOT NULL DEFAULT "0000-00-00 00:00:00",'+
                    'endTime timestamp NOT NULL DEFAULT "0000-00-00 00:00:00",'+
                    'PRIMARY KEY (id))';
    console.log(sql)
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
    var sql = "update res set name='"+req.body.name.toLowerCase()+"',cname='"+req.body.cname+"',res_type='"+req.body.res_type+"',type_specification='"+req.body.type_specification
    +"' where id = "+req.body.id;
    tableName = 'res_content_'+req.body.name.toLowerCase();
    tempTableName = 'res_content_'+req.body.tempTableName.toLowerCase();
    var changeTableNameSql = "rename table "+tempTableName+" to "+tableName+";"
    if(tempTableName==tableName){
        db.query(sql, function(err, rows, fields){
            if (err) {
                console.log(err);
                return;
            }
            utilFn.successSend(res);
        });
    }else{
        db.query(changeTableNameSql, function(err, rows, fields){
            if (err) {
                console.log(err);
                return;
            }
            db.query(sql, function(err, rows, fields){
                if (err) {
                    console.log(err);
                    return;
                }
                utilFn.successSend(res);
            });
        });
    }


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
    var arg = url.parse(req.url, true).query;
    var typeWhere = arg.res_type;
    if(typeWhere){
        typeWhere = " where res_type ='"+arg.res_type+"'"
    }else{
        typeWhere = "";
    }
    var sql = "select * from res" +typeWhere;
    console.log(sql)
    db.query(sql, function(err, rows, fields){
        if (err) {
            return;
        }
        utilFn.successSend(res,rows);
    });
});

router.get('/getResListByType', function(req, res, next) {
    var arg = url.parse(req.url, true).query
    var type = arg.res_type?arg.res_type:""
    var sql = "select * from res where res_type='"+ type+"'";
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
    var from_uid = 0;
    console.log(req.session.user.id)
    if(req.session.user){
        from_uid = req.session.user.id
    }
    var tableName = 'res_content_'+req.body.name.toLowerCase();
    var startTime = req.body.startTime
    var endTime = req.body.endTime;
    if(startTime){
        startTime = "from_unixtime('"+req.body.startTime+"')"
    }else{
        startTime = "null";
    }
    if(endTime){
        endTime = "from_unixtime('"+req.body.endTime+"')"
    }else{
        endTime = "null";
    }
    var sql = "insert into "+tableName+" (content,startTime,endTime,isOnline,createTime,modifiedTime,readyNum,from_uid) values ("+
        db.escape(req.body.content)+","+startTime+","+endTime+","+ req.body.onLine+",now(),now(),0,"+from_uid+")";
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
        rows = utilFn.dealRes(rows)
        var content =rows;
        var pageTotal = 0;


        async.parallel([
                function(callback){
                    getAllUserByFromUid(content,callback)
                },
                function(callback){
                    db.query(totalSql, function(err, rows, fields){
                        if (err) {
                            return;
                        }
                        pageTotal = rows[0].total;
                        callback(err);
                    });
                }
            ],
            function(err){
                 var data={content:content,pageTotal:pageTotal}
                 utilFn.successSend(res,data);
            });


    });
});



function getAllUserByFromUid(content,callback){
    async.map(content, function(item, callback) {
        var sql = "select userName,nick from bang_users where id ="+item.from_uid
        db.query(sql, function(err, rows) {
            if(err) {
                console.log(err);
            }
            item.from_user=rows[0];
            callback(err);
        });
    }, function(err, results) {
        if(err) {
            console.log(err)
        }
        callback(err);
    });
}

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
        rows = utilFn.dealRes(rows)
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
        rows = utilFn.dealRes(rows)
        utilFn.successSend(res,rows);
    });
});





module.exports = router;