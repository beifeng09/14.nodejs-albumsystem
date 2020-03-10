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


function login(req, res) {
    // 获得前端提供的数据
    var username = req.body.username;
    var password = req.body.password;
    // 连接数据库
    var db = new DataBase(connect, dbName, coll);
    // 定义查询对象
    var query = {
        username: username,
        password: password
    };
    // 验证
    db.findOne(query, function (err, obj) {
        if (err) {
            res.send(RESPONSETEXT['findDataErr']);
            return;
        }
        // obj为对象，说明成功
        if (obj) {
            // 设置session
            req.session.username = obj.username;
            req.session.head_pic = obj.head_pic;
            req.session.nick_name = obj.nick_name;
            res.send(RESPONSETEXT['loginSuccess']);
            return;
        }
        // 如果obj是null， 说明用户名或密码错误
        res.send(RESPONSETEXT['usernameOrpasswordErr']);
    })
}


module.exports = login;