// 引入formidable
var formidable = require("formidable");
var DataBase = require("../../db");
//引入常量模块
var CONST = require("../CONST");
var connect = CONST("CONNECTSTR");
var dbName = CONST("DATABASENAME");
var coll = CONST("COLLECTIONS").tupian;
var coll1 = CONST("COLLECTIONS").xiangce;
var RESPONSETEXT = CONST("RESPONSETEXT");
var fs = require("fs");
//处理上传的图片
function upload_img(req, res) {
    var username = req.session.username;
    //获取formidable的实例
    var form = new formidable();
    //设置上传的临时路径
    form.uploadDir = "./uploads";
    var arr = [];
    var img;
    form.on("file", function(key, value) {
        arr.push(value);
    });
    //解析
    form.parse(req, function(err, fields, files) {
        if (err) {
            res.send(RESPONSETEXT["uploadFileErr"]);
            return;
        }
        var album_name = fields.album_name;
        var objArr = [];
        try {
            for (var i = 0; i < arr.length; i++) {
                var Img_name = arr[i].name;
                var oldPath = arr[i].path;
                var newPath = "./albums/" + username + "/" + album_name + "/" + Img_name;
                img = "/albums/" + username + "/" + album_name + "/" + Img_name;

                fs.renameSync(oldPath, newPath);
                var img_obj = {
                    username: username,
                    album_name: album_name,
                    img_name: Img_name,
                    display: "true"
                };
                objArr.push(img_obj);

            }


        } catch (e) {
            res.send({
                error: 2,
                data: "代码执行失败"
            });
            return;
        }
        console.log(img);
        var db = new DataBase(connect, dbName, coll);
        //初始化数据库对象
        db.insertMany(objArr, function(err, result) {
            if (err) {
                res.send(RESPONSETEXT["insertDataErr"]);
                return;
            }

            var db1 = new DataBase(connect, dbName, coll1);

            db.findMany({ username: username, album_name: album_name }, function(err, arr) {
                if (err) {
                    res.send(RESPONSETEXT["findUserNameFailed"]);
                    return;
                }
                db1.updateOne({album_name: album_name,username: username}, {
                    $set: {
                        // img: files.file.name
                        img: img,
                        leng: arr.length,
                        dianzan:0
                    }
                }, function(err) {
                    if (err) {
                        res.send(responsetext['appendFileFailed']);
                        return
                    }
                    res.send(RESPONSETEXT["success"]);
                })

            })
        });
    });
}
module.exports = upload_img;