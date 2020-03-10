// 引入DataBase
var DataBase = require("../../db");
// 引入常量模块
var CONST = require("../CONST");
// 使用常量中的连接字符串
var connect = CONST("CONNECTSTR");
// 使用常量中的数据库名称
var dbName = CONST("DATABASENAME");
// 使用常量中的集合名称
var coll = CONST("COLLECTIONS").yonghu;
// 使用常量中的响应文本
var RESPONSETEXT = CONST("RESPONSETEXT");
// 引入formidable
var formidable = require("formidable");
// fs
var fs = require("fs");

function updateHeadPic(req, res) {
    var user_name = req.session.username;
    var base_64_url = req.body.file;
    // 定义上传图片路径 从app.js级开始找
    // var path = './albums/'+ user_name + '/head_pic/' + Date.now() +'.png';
    var path = './albums/'+ user_name + '/head_pic/default.jpg';
    //去掉图片base64码前面部分data:image/png;base64
    var base64 = base_64_url.replace(/^data:image\/\w+;base64,/, "");
    //把base64码转成buffer对象
    var dataBuffer = new Buffer(base64, 'base64');
    // console.log('dataBuffer是否是Buffer对象：'+Buffer.isBuffer(dataBuffer)); // 输出是否是buffer对象
    //用fs写入文件
    fs.writeFile(path,dataBuffer,function(err){
        if(err){
            console.log(err);
        }else{
            console.log('写入成功！');
        }
    });

    // 连接数据库
    var db = new DataBase(connect, dbName, coll);
    // 定义查询对象
    var query = {
        username: user_name
    };
    // 定义修改对象
    var update = {
        head_pic: path.slice(1)
    };
    db.updateOne(query, {$set: update}, function (err, result) {
        if (err) {
            res.send(RESPONSETEXT['failed']);
            return;
        }
        req.session.head_pic = update.head_pic;
        res.send({
            error: 0,
            data: RESPONSETEXT['success'].data,
            head_pic: update.head_pic
        });
    });
}

module.exports = updateHeadPic;



