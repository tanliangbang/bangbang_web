var express = require('express');
var router = express.Router();
var util = require('util');
var multiparty = require('multiparty')
var fs =require('fs')
/* GET home page. */
router.post('/uploadImg', function(req, res, next) {

 var form = new multiparty.Form({uploadDir: './public/files/'});
//上传完成后处理
 form.parse(req, function(err, fields, files) {
  var filesTmp = JSON.stringify(files,null,2);
  if(err){
   console.log('parse error: ' + err);
  } else {
   var uploadedPath = files["resImg"][0]["path"];
   var dstPath = './public/files/' + files["resImg"][0].originalFilename;
//重命名为真实文件名

   var url = "http://118.89.161.150:3000/public/files/"+files["resImg"][0].originalFilename;
   fs.rename(uploadedPath, dstPath, function(err) {
    if(err){
     console.log('rename error: ' + err);
    } else {
     console.log('rename ok ===' + url  );
     res.send(url)
    }
   });
  }

 });

});

module.exports = router;