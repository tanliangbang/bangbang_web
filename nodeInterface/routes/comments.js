/**
 * Created by funny on 2016/12/7.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../util/db.js');
var utilFn = require('../util/utilFn.js');

var url = require('url');
var async = require('async');

router.post('/comment', function(req, res, next) {
    var topic_id = utilFn.checkEmpty(req.body.topic_id)
    var content = utilFn.checkEmpty(req.body.content)
    var from_uid = req.session.user.id;
    var to_uid = utilFn.checkEmpty(req.body.to_uid)
    if(!to_uid){
        to_uid = 0;
    }
    var sql = "insert into comments (topic_id,content,from_uid,to_uid) values "+
        "('"+topic_id+"','"+content+"','"+ from_uid+"','"+to_uid+"')";
    db.query(sql, function(err, rows, fields){
        if (err) {
            console.log(err);
            return;
        }
        utilFn.successSend(res,null,200,'评论成功');

    });

});

router.get('/commentList', function(req, res, next) {
    var arg = url.parse(req.url, true).query
    var start = 0;
    var end = 10;
    var topic_id = arg.topic_id;
    if(arg.start){
        start = arg.start;
    }
    if(arg.size){
        end = arg.size;
    }
    if(!topic_id){
        utilFn.successSend(res,null,500,'获取失败');
    }
    var sql = "select * from comments where topic_id = " +topic_id +" order by cTime desc";
    var totalSql = "select count(id) as total from comments where topic_id = " +topic_id;
    var tasks = [function(callback) {
        db.query(totalSql, function(err, rows, fields){
            callback(err,rows[0].total);
        });
    }, function(total,callback) {
        db.query(sql, function(err, rows, fields){
            callback(err, rows,total);
        });
    }, function(rows,total,callback) {
        var userSql = "";
        async.map(rows, function(item, callback) {
            userSql =  "select userName,nick from bang_users where id ="+item.from_uid;
            db.query(userSql, function(err, rows) {
                item.user = rows[0];
                callback(err, res);
            });
        }, function(err, results) {
            if(err) {
                console.log(err);
            } else {
                var data={list:rows,pageTotal:total}
                utilFn.successSend(res,data);
            }
        });
    }];

    async.waterfall(tasks, function(err, results) {
        if(err) {
            console.log(err);
        }
    });
});


module.exports = router;
