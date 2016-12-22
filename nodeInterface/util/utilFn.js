var express = require('express');
var utilFn    = {};
utilFn.successSend = function(res,data){
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(data);
}
module.exports = utilFn;