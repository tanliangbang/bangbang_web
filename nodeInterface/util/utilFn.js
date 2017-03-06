var express = require('express');
var utilFn    = {};
utilFn.successSend = function(res,data,statusCode,errorMsg){
    res.writeHead(200, {'Content-Type': 'application/json'});
    if(!statusCode){
        statusCode = 200
    }
    if(!errorMsg){
        errorMsg = '请求成功'
    }
    var data ={data:data,statusCode:statusCode,errorMsg:errorMsg}
    res.end(JSON.stringify(data));
}
module.exports = utilFn;