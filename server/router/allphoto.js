var DataBase = require('../../db/index.js');
var CONST = require('../CONST.js');
var connect = CONST('CONNECTSTR');
var dataName = CONST('DATABASENAME');
var dataConnect1 = CONST('COLLECTIONS').yonghu;
var dataConnect2 = CONST('COLLECTIONS').xiangce;
var responsetext = CONST('RESPONSETEXT');

function allphoto(req, res) {
    var username = req.session.username;
    var name = req.query.username;
    var db = new DataBase(connect, dataName, dataConnect2);
    db.findMany({
        username: name
    }, function (err, arr) {
        if (err) {
            res.send(responsetext['findUserNameFailed']);
            return
        }
        var db1 = new DataBase(connect, dataName, dataConnect1);
        db1.findOne({
            username: name
        }, function (err, data) {
            if (err) {
                res.send(responsetext['findUserNameFailed']);
                return
            }
            res.send(
                {
                    data:arr,
                    error:0,
                    pic:data.head_pic
                });
        });
    });
}

module.exports = allphoto;