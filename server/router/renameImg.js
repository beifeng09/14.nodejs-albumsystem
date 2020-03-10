// 引入DataBase
var DataBase = require("../../db");
// 引入常量模块
var CONST = require("../CONST");
// 使用常量中的连接字符串
var connect = CONST("CONNECTSTR");
// 使用常量中的数据库名称
var dbName = CONST("DATABASENAME");
// 使用常量中的集合名称
var coll = CONST("COLLECTIONS").tupian;
// 使用常量中的响应文本
var RESPONSETEXT = CONST("RESPONSETEXT");
// fs模块
var fs = require("fs");

// 图片重命名接口
function renameImg(req, res) {
    // 获取用户名
    var username = req.session.username;
    // 获取前端传递过来的数据
    var album_name = req.query.album_name;
    var old_img_name = req.query.img_name;
    var new_img_name = req.query.newImgName;
    // 定义旧路径
    var old_path = './albums/' + username + '/' + album_name + '/' + old_img_name;
    // 定义新图片名称, 确定图片格式后缀名
    var new_name = new_img_name + '.' + old_img_name.split('.').pop();
    // 定义新路径
    var new_path = './albums/' + username + '/' + album_name + '/' + new_name;
    // 修改磁盘中的文件名
    fs.rename(old_path, new_path, function (err) {
        if (err) {
            res.send(RESPONSETEXT['renameFileFailed']);
            return;
        }
        // 连接数据库 将tupian集合对应数据修改
        var db = new DataBase(connect, dbName, coll);
        // 定义查询对象
        var query = {
            username: username,
            album_name: album_name,
            img_name: old_img_name
        };
        db.updateOne(query, {$set: {img_name: new_name}}, function (err, result) {
            if (err) {
                res.send(RESPONSETEXT['failed']);
                return;
            }
            res.send(RESPONSETEXT['success']);
        })
    });
}

module.exports = renameImg;