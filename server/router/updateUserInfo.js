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


// 修改用户的个人信息
function updateUserInfo(req, res) {
    // 获取传递过来的数据
    var update = req.body;
    // 连接数据库
    var db = new DataBase(connect, dbName, coll);
    // 定义查询条件
    var query = {
        username: req.session.username
    };
    db.updateOne(query, {$set: update}, function (err, result) {
        if (err) {
            res.send(RESPONSETEXT['failed']);
            return;
        }
        // 修改session中的nike_name
        req.session.nick_name = update.nick_name;
        res.send({
            error: 0,
            data: RESPONSETEXT['success'].data,
            nick_name: update.nick_name
        });
    });
}

module.exports = updateUserInfo;