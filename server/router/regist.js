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
// 引入fs模块
var fs = require('fs');


function regist(req, res) {
    // 获取用户提交的信息
    var username = req.body.username;
    var password = req.body.password;
    // 给用户创建一个专属文件夹, 在接口函数内创建，以app.js为路径
    fs.mkdir('./albums/' + username, function (err) {
        if (err) {
            // 创建文件夹失败，给前端反馈
            res.send(RESPONSETEXT['createFloderFailed']);
            return;
        }
        // 创建成功，创建用户的头像相册
        fs.mkdir('./albums/' + username + '/head_pic', function (err) {
            if (err) {
                // 创建文件夹失败，给前端反馈
                res.send(RESPONSETEXT['createFloderFailed']);
                return;
            }
            // 给用户放置一张默认头像图片
            fs.readFile('./web/imgs/default.jpg', function (err, data) {
                if (err) {
                    // 文件读取失败
                    res.send(RESPONSETEXT['readFileFailed']);
                    return;
                }
                // 为用户的头像相册中添加一张默认图片
                fs.appendFile('./albums/' + username + '/head_pic/default.jpg', data, function (err) {
                    if (err) {
                        console.log(err);
                        // 追加文件内容失败
                        res.end(RESPONSETEXT['appendFileFailed']);
                    }
                    // 连接数据库
                    var db = new DataBase(connect, dbName, coll);
                    // 定义插入信息对象
                    var user_info = {
                        username: username,
                        password: password,
                        head_pic: '/albums/' + username + '/head_pic/default.jpg',
                        nick_name: username
                    };
                    // 向数据库中插入数据
                    db.insertOne(user_info, function (err, result) {
                        if (err) {
                            res.send(RESPONSETEXT['registFailed']);
                            return;
                        }
                        res.send(RESPONSETEXT['registSuccess']);
                    });
                });
            });
        });
    });
}


// 暴露函数
module.exports = regist;