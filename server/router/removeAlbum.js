// 引入删除非空目录的模块
var rm = require('../tools/rm');
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
var coll1 = CONST('COLLECTIONS').tupian;
// 使用常量中的响应文本
var RESPONSETEXT = CONST('RESPONSETEXT');
function removeAlbum(req, res) {
    // 获取目标文件夹
    var album_name = req.query.album_name;
    // 删除该文件夹
    rm('./albums/' + req.session.username + '/' + album_name);
    // 连接数据库，移除数据库中对应的数据
    var db = new DataBase(connect, dbName, coll);
    // 定义移除的条件
    var query = {
        username: req.session.username,
        album_name: album_name
    };
    // 调用移除一条方法
    db.deleteOne(query, function (err, result) {
        if (err) {
            res.send(RESPONSETEXT['deleteDataErr']);
            return;
        }
        //删除相册集合下的所有文件
        var db1 = new DataBase(connect, dbName, coll1);
        db1.deleteMany(query, function(err, result) {
            if (err) {
                res.send(RESPONSETEXT["deleteDataErr"]);
                return;
            }
            res.send(RESPONSETEXT['success']);
        })
    });
}

module.exports = removeAlbum;