var DataBase = require('../../db/index.js');
var CONST = require('../CONST.js');
var connect = CONST('CONNECTSTR');
var dataName = CONST('DATABASENAME');
var dataConnect1 = CONST('COLLECTIONS').yonghu;
var dataConnect3 = CONST('COLLECTIONS').liuyan;
var responsetext = CONST('RESPONSETEXT');

function pinglun(req, res) {
    var value = req.body.value;
    var album_name = req.body.uploadName;
    var dianusername = req.body.dianusername;
    var time = req.body.time;
    var username = req.session.username;



    var db = new DataBase(connect, dataName, dataConnect3);
    var db1 = new DataBase(connect, dataName, dataConnect1);
    db1.findOne({
        username: username
    }, function (err, data) {
        if (err) {
            res.send(responsetext['findUserNameFailed']);
            return
        }
        var obj = {
            value: value,
            album_name: album_name,
            dianusername: dianusername,
            username: username,
            head_pic: data.head_pic,
            time: time
        };
        db.insertOne(obj, function (err) {
            if (err) {
                res.send(responsetext['insertDataErr']);
                return
            }
            res.send(responsetext['success'])
        })
    })


}

module.exports = pinglun;