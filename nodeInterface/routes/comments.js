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
    var topic_id = utilFn.checkNumber(req.body.topic_id)
    var content = utilFn.checkEmpty(req.body.content)
    var reply_id = utilFn.checkNumber(req.body.reply_id)
    var from_uid = req.session.user.id;
    var to_uid = utilFn.checkNumber(req.body.to_uid);
    var sql = "insert into comments (topic_id,content,from_uid,to_uid,reply_id) values "+
        "('"+topic_id+"','"+content+"','"+ from_uid+"','"+to_uid+"','"+reply_id+"')";
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



    var data = {};
    queryUserComment(0,topic_id,function(data){
           async.parallel([
                function(callback){
                    queryAllReply(data.list,topic_id,function(err){
                        data = data;
                        callback(err);
                        // utilFn.successSend(res,data);
                    })
                },
                function(callback){
                    getAllUserInfo(data.list,function(err){
                        data = data;
                        callback(err);
                    })
                }
            ],
            function(err){
                utilFn.successSend(res,data);
            });
    })

});

function queryAllReply(list,topic_id,callback){
    async.map(list, function(item, callback) {
        queryUserComment(item.id,topic_id,function(data) {
            getAllUserInfo(data.list, function (err) {
                item.reply = data;
                callback(err);
            })
        });
    }, function(err, results) {
        if(err) {
            console.log(err);
        } else {
            callback(err);
        }
    });
}



function getAllUserInfo(list,callback){
    async.map(list, function(item, callback) {
        queryAllUserInfo(item,function(err){
            callback(err);
        });
    }, function(err, results) {
        if(err) {
            console.log(err);
        } else {
           callback(err);
        }
    });
}

function queryAllUserInfo(replyItem,callback){
    var sqls =[];
    if(replyItem.to_uid>0){
        sqls = [
            {sql:"select userName,nick from bang_users where id ="+ replyItem.from_uid,type:"from"},
            {sql:"select userName,nick from bang_users where id ="+ replyItem.to_uid,type:"to"}
        ];
    }else{
        sqls = [
            {sql:"select userName,nick from bang_users where id ="+ replyItem.from_uid,type:"from"},
        ];
    }
    async.map(sqls, function(item, callback) {
        db.query(item.sql, function(err, rows) {
            if(item.type=="from"){
                replyItem.user = rows[0];
            }else{
                replyItem.to_user = rows[0];
            }
            callback(err);
        });
    }, function(err, results) {
        if(err) {
            console.log(err);
        } else {
            callback(err);
        }
    });


}


function queryUserComment(reply_id,topic_id,callBack){
    var data={}

    var sqls = [
        "select * from comments where  reply_id = "+reply_id+ " and topic_id = " +topic_id +" order by cTime desc",
        "select count(id) as total from comments where reply_id = "+reply_id+ " and  topic_id = " +topic_id
    ];
    async.parallel([
            function(callback){
                db.query(sqls[0], function(err, rows, fields){
                    if (err) {
                        console.log(err);
                    }else{
                        data.list = rows;
                        callback(err);
                    }
                });
            },
            function(callback){
                db.query(sqls[1], function(err, rows, fields){
                    if (err) {
                        console.log(err);
                    }else{
                        data.pageTotal = rows[0].total;
                        callback(err);
                    }
                });
            }
        ],
        function(err){
            callBack(data)
        });


    /*var sqls = [
        {sql:"select * from comments where  reply_id = "+reply_id+ " and topic_id = " +topic_id +" order by cTime desc",type:"list"},
        {sql:"select count(id) as total from comments where reply_id = "+reply_id+ " and  topic_id = " +topic_id,type:"total"}
    ];
    async.map(sqls, function(item, callback) {
        db.query(item.sql, function(err, rows, fields){
            if (err) {
                console.log(err);
            }else{
                if(item.type=="list"){
                    data.list = rows;
                }else if(item.type=="total"){
                    data.pageTotal = rows[0].total;
                }
                callback(null);
            }
        });
    }, function(err) {
        callBack(data)
    });*/
}


module.exports = router;
