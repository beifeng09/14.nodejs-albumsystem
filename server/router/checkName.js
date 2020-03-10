// 引入DataBase
var DataBase = require('../../db');
// 引入CONST常量模块
var CONST = require('../CONST');
// 使用常量中的连接字符串
var connect = CONST('CONNECTSTR');
// 使用常量中的数据库名称
var dbName = CONST('DATABASENAME');
// 使用常量中的集合名称
var coll = CONST('COLLECTIONS').yonghu;
// 使用常量中的响应文本
var RESPONSETEXT = CONST('RESPONSETEXT');


function checkName(req ,res) {
    // 接受数据
    var username = req.query.username;
    // 拿数据去数据库中检测
    var db = new DataBase(connect, dbName, coll);
    // 调用findOne方法
    db.findOne({username: username}, function (err, obj) {
        if (err) {
            // 查询用户名失败
            res.send(RESPONSETEXT['findUserNameFailed']);
            return;
        }
        if (obj) {
            // 用户名已经被占用
            res.send(RESPONSETEXT['userExist']);
            return;
        }
        res.send(RESPONSETEXT['userUseable']);
    })
}

module.exports = checkName;