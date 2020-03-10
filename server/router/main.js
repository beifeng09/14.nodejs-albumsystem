// 引入DataBase
var DataBase = require('../../db');
// 引入CONST常量模块
var CONST = require('../CONST');
// 使用常量中的连接字符串
var connect = CONST('CONNECTSTR');
// 使用常量中的数据库名称
var dbName = CONST('DATABASENAME');
// 使用常量中的集合名称
var yonghu = CONST('COLLECTIONS').yonghu;
var xiangce = CONST('COLLECTIONS').xiangce;
// 使用常量中的响应文本
var RESPONSETEXT = CONST('RESPONSETEXT');
var fs = require("fs");



function main(req, res) {
    // 连接数据库，查询所有用户的信息
    var coll = new DataBase(connect, dbName, yonghu);
    // 获取登录用户
    var username = req.session.username;
    // 获取用户昵称
    var nick_name = req.session.nick_name;
    coll.findMany({}, function (err, allUserInfoArr) {
        if (err) {
            // 如果发生错误，重新定向路由，返回一个错误信息页面给用户
            res.redirect('/error?msg=' + RESPONSETEXT['findDataErr'].data);
            return;
        }
        // 查询所有相册
        var coll1 = new DataBase(connect, dbName, xiangce);
        coll1.findMany({username: username}, function (err, userAlbumArr) {
            if (err) {
                res.redirect('/error?msg=' + RESPONSETEXT['findDataErr'].data);
                return;
            }
            console.log(userAlbumArr);
            fs.readdir("./web/face", function (err, arr) {
                if (err) {
                    res.redirect("/error?msg=" + RESPONSETEXT["readFileFailed"].data);
                    return;
                }
                var pathArr = arr.map(function (value) {
                    return {
                        code: "\\" + value.split(".").shift(),
                        path: "/web/face/" + value
                    };
                });
                // 渲染模板
                res.render('main.ejs', {
                    allUserInfoArr: allUserInfoArr,
                    userAlbumArr: userAlbumArr,
                    head_pic: req.session.head_pic,
                    nick_name: nick_name,
                    username:req.session.username,
                    faceArr: pathArr
                });
            });
        });
    });
}

module.exports = main;