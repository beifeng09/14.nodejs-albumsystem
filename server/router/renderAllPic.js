var DataBase = require('../../db/index.js')
var CONST = require('../CONST.js')
var connect = CONST('CONNECTSTR')
var dataName = CONST('DATABASENAME')
var dataConnect1 = CONST('COLLECTIONS').yonghu
var dataConnect2 = CONST('COLLECTIONS').xiangce
var dataConnect3 = CONST('COLLECTIONS').dianzan
var dataConnect4 = CONST('COLLECTIONS').tupian
var responsetext = CONST('RESPONSETEXT')

function renderAllPic(req, res) {
    var album_name = req.query.album_name
    var username = req.query.dianusername

    var obj = {
        album_name: album_name,
        username: username,
        display: 'true'
    }

    var db = new DataBase(connect, dataName, dataConnect4)

    db.findMany(obj, function (err, data) {
        if (err) {
            res.send(responsetext['findUserNameFailed'])
            return
        }
        var newArr = data.map(function (value) {
            return {

                src: '/albums/' + value.username + '/' + value.album_name + '/' + value.img_name,
                // display, 判定图片是否他人可见
                // display: value.display,
                //img_name,图片名称,接口upload_img时传入数据库
                img_name: value.img_name
            }
        })
        res.send({data: newArr, error: 0})

        // res.render('allphoto.ejs',{
        //   userAlbumArr:data
        // })
        // res.send(responsetext['success'])
    })
}

module.exports = renderAllPic