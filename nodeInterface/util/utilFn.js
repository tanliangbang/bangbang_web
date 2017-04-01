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
utilFn.checkEmpty = function(str){
    if(str||str ==""){
       return str;
    }
    return "";
}

utilFn.checkNumber = function(num){
    if(!num){
        return 0;
    }
    return num;
}


utilFn.dealRes = function(rows){
    for(var i=0;i<rows.length;i++){
        rows[i].content  = JSON.parse(rows[i].content);
        delete rows[i].content.content;
    }
    return rows;
}

module.exports = utilFn;