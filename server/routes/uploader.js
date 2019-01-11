var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');
var UUID = require('uuid');
var multer  = require('multer');
var uploadDir='./public/images/';
var realMulter = multer({dest:uploadDir})
var upload=realMulter.array('images')
/* GET users listing. */
router.post('/', function(req, res, next) {
  upload(req, res, function(err){
      if(err){
          console.error(err.message);
          res.send({success: false})
      }else{
           req.files.forEach(function(i){
               //获取临时文件的存储路径
               var uploadTmpPath=i.path;
               var unitTime = UUID.v1(); //生成唯一的标识符，用来重命名图片名称，以防上传图片名字重复
               var des_file=uploadDir+(unitTime+path.parse(i.originalname).ext);
               //读取临时文件
               fs.readFile(uploadTmpPath,function(err,data){
                   if(err){
                       console.error('[System] '+err.message);
                   }else{
                       //读取成功将内容写入到上传的路径中，文件名为上面构造的文件名
                       fs.writeFile(des_file,data,function(err){
                           if(err){
                               console.error('[System] '+err.message);
                           }else{
                               //写入成功,删除临时文件
                               fs.unlink(uploadTmpPath,function(err){
                                   if(err){
                                       console.error('[System] '+err.message);
                                   }else{
                                       console.log('[System] '+'Delete '+uploadTmpPath+' successfully!');
                                   }
                               });
                           }
                       });
                   }
               });
          });
          res.send({success: true})
      }
  });
});

module.exports = router;
