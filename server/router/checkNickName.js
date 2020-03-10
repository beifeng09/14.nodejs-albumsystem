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


function checkNickName(req, res) {
    // 获取数据
    var nick_name = req.query.nick_name;
    // 连接数据库进行检测
    var db = new DataBase(connect, dbName, coll);
    db.findOne({nick_name: nick_name}, function (err, obj) {
        if (err) {
            // 查询昵称失败
            res.send(RESPONSETEXT['findNickNameFailed']);
            return;
        }
        if (obj) {
            // 该昵称已经被占用
            res.send(RESPONSETEXT['nickNameExist']);
            return;
        }
        // 恭喜，该昵称可用
        res.send(RESPONSETEXT['nickNameUseable']);
    })

}

module.exports = checkNickName;