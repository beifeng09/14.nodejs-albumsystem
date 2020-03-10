// 引入DataBase
var DataBase = require('../../db');
// 引入CONST常量模块
var CONST = require('../CONST');
// 使用常量中的连接字符串
var connect = CONST('CONNECTSTR');
// 使用常量中的数据库名称
var dbName = CONST('DATABASENAME');
// 使用常量中的集合名称
var coll = CONST('COLLECTIONS').tupian;
// 使用常量中的响应文本
var RESPONSETEXT = CONST('RESPONSETEXT');
// 引入fs模块
var fs = require("fs");


function removeImg(req, res) {
    // 获取相册名
    var album_name = req.query.album_name;
    // 获取删除图片名称
    var img_name = req.query.img_name;
    // 定义图片路径
    var path = './albums/' + req.session.username + '/' + album_name + '/' + img_name;
    // 删除该图片
    fs.unlink(path, function (err) {
        console.log(err);
    });
    // 连接数据库，移除数据库中对应的数据
    var db = new DataBase(connect, dbName, coll);
    // 定义移除的条件
    var query = {
        username: req.session.username,
        album_name: album_name,
        img_name: img_name
    };
    db.deleteOne(query, function (err, result) {
        if (err) {
            res.send(RESPONSETEXT['deleteDataErr']);
            return;
        }
        res.send(RESPONSETEXT['success']);
    });
}

module.exports = removeImg;