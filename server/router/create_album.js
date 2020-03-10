// 引入DataBase
var DataBase = require('../../db');
// 引入CONST常量模块
var CONST = require('../CONST');
// 使用常量中的连接字符串
var connect = CONST('CONNECTSTR');
// 使用常量中的数据库名称
var dbName = CONST('DATABASENAME');
// 使用常量中的集合名称
var coll = CONST('COLLECTIONS').xiangce;
// 使用常量中的响应文本
var RESPONSETEXT = CONST('RESPONSETEXT');
// 引入fs模块
var fs = require('fs');


function create_album(req, res) {
    // 获取前端提交的内容
    var album_name = req.query.album_name;
    var username = req.session.username;
    var img = req.query.img;
    // 再该用户文件夹下创建文件夹, 路径相对于app.js服务器
    fs.mkdir('./albums/' + username + '/' + album_name, function (err) {
        if (err) {
            res.send(RESPONSETEXT['createFloderFailed']);
            return;
        }
        // 连接数据库
        var db = new DataBase(connect, dbName, coll);
        // 定义要插入的对象
        var data_obj = {
            username: username,
            album_name: album_name,
            img: img
        };
        // 向数据库中插入数据
        db.insertOne(data_obj, function (err, result) {
            if (err) {
                res.send(RESPONSETEXT['failed']);
                return;
            }
            res.send(RESPONSETEXT['success']);
        })
    })
}

module.exports = create_album;