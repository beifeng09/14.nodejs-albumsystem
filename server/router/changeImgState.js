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



function changeImgState(req, res) {
    // 获取数据
    var username = req.session.username;
    var album_name = req.query.album_name;
    var img_name = req.query.img_name;
    var state = req.query.state;

    // 连接数据库
    var db = new DataBase(connect, dbName, coll);
    // 定义查询对象
    var query = {
        username: username,
        album_name: album_name,
        img_name: img_name
    };
    // 更新数据
    db.updateOne(query, {$set: {display: state}}, function (err, result) {
        if (err) {
            res.send(RESPONSETEXT['failed']);
            return;
        }
        res.send(RESPONSETEXT['success']);
    })
}


module.exports = changeImgState;