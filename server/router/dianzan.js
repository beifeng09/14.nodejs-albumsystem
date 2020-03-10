var DataBase = require('../../db/index.js');
var CONST = require('../CONST.js');
var connect = CONST('CONNECTSTR');
var dataName = CONST('DATABASENAME');
var dataConnect1 = CONST('COLLECTIONS').yonghu;
var dataConnect2 = CONST('COLLECTIONS').xiangce;
var dataConnect3 = CONST('COLLECTIONS').dianzan;
var responsetext = CONST('RESPONSETEXT');

function dianzan(req, res) {
    var album_name = req.query.uploadName;
    var dianusername = req.query.dianusername;
    var username = req.session.username;
    var dianzanA = {
        album_name: album_name,
        dianusername: dianusername,
        username: username,
        like: 'like'
    };
    var dianzanB = {
        album_name: album_name,
        dianusername: dianusername,
    };
    var dianzanC = {
        album_name: album_name,
        username: dianusername
    };
    var db = new DataBase(connect, dataName, dataConnect3);
    db.findOne(dianzanA, function (err, data) {
        if (err) {
            res.send(responsetext['findUserNameFailed']);
            return;
        } else if (data) {
            res.send(responsetext['dianzan']);
            return;
        }
        else if (!data) {
            db.insertOne(dianzanA, function (err, data) {
                if (err) {
                    response.send(responsetext['failed']);
                    return
                }
                db.findMany(dianzanB, function (err, arr) {
                    if (err) {
                        res.send(responsetext['findUserNameFailed']);
                        return
                    }
                    var db1 = new DataBase(connect, dataName, dataConnect2);
                    db1.updateOne(dianzanC, {
                        $set: {
                            dianzan: arr.length
                        }
                    }, function (err) {
                        if (err) {
                            res.send(responsetext['appendFileFailed']);
                            return
                        }

                        res.send(responsetext['success'])
                    });
                });
            });
        }
    });
}

module.exports = dianzan;