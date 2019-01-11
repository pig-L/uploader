var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
/* GET users listing. */
router.post('/', function(req, res, next) {
    var form = new multiparty.Form();
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "./public/upload/";
    form.parse(req, function (err, fields, files) { 
        // fields form表单的上传的数据
        // files form表单的上传文件
        if(err){
            res.send({success: false})
        } else{
            var imgArr = [];
            files.images.forEach(function(i){
                //获取上传图片的路径，以便存入数据库
                var uploadTmpPath=i.path;
                imgArr.push(uploadTmpPath)
            });
            res.send({success:true})
        }
    });
});
module.exports = router;