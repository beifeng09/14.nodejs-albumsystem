var DataBase = require('../../db/index.js');
var CONST = require('../CONST.js');
var connect = CONST('CONNECTSTR');
var dataName = CONST('DATABASENAME');
var dataConnect1 = CONST('COLLECTIONS').yonghu;
var dataConnect4 = CONST('COLLECTIONS').liuyan;
var responsetext = CONST('RESPONSETEXT');

function liuyan(req, res) {
    var album_name = req.query.uploadName;
    var dianusername = req.query.dianusername;
    var username = req.session.username;
    var obj = {
        album_name: album_name,
        dianusername: dianusername,
    };
    var db = new DataBase(connect, dataName, dataConnect4);
    db.findMany(obj, function (err, arr) {
        if (err) {
            res.send(responsetext['findUserNameFailed']);
            return
        }
        res.send({
            data: arr,
            error: 0
        })
    })
}

module.exports = liuyan;