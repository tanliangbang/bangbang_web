/**
 * Created by funny on 2016/12/7.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../util/db.js');
var utilFn = require('../util/utilFn.js');

var url = require('url');

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
    if(arg.start){
        start = arg.start;
    }
    if(arg.size){
        end = arg.size;
    }
    var sql = "select * from comments";
    var totalSql = "select count(id) as total from comments"
    db.query(sql, function(err, rows, fields){
        if (err) {
            return;
        }

        var list = rows;
        db.query(totalSql, function(err, rows, fields){
            if (err) {
                return;
            }
            for(var i=0;i<list.length;i++){

                var userSql =  "select userName,nick from bang_users where id ="+list[i].from_uid;
                db.query(userSql, function(err, rows, fields){
                    if (err) {
                        return;
                    }
                    list.user = rows[0];
                    if(i==list.length){
                        var data={list:list,pageTotal:rows[0].total}
                        utilFn.successSend(res,data);
                    }
                });

            }

        });

    });
});


module.exports = router;