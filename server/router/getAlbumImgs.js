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


function getAlbumImgs(req, res) {
    // 获取提交过来的相册名称
    var album_name = req.query.album_name;
    // 连接数据库，查询此用户该相册下的所有图片信息
    var db = new DataBase(connect, dbName, coll);
    // 定义查询条件
    var query = {
        username: req.session.username,
        album_name: album_name
    };
    // 查询数据
    db.findMany(query, function (err, arr) {
        if (err) {
            res.send(RESPONSETEXT['findDataErr']);
            return;
        }
        var path_arr = arr.map(function (value) {
            return {
                src: '/albums/' + value.username + '/' + value.album_name + '/' + value.img_name,
                // display, 判定图片是否他人可见
                display: value.display,
                //img_name,图片名称,接口upload_img时传入数据库
                img_name: value.img_name
            };
        });
        // 向前端返回数据
        res.send({
            error: 0,
            data: path_arr
        });
    })
}

module.exports = getAlbumImgs;