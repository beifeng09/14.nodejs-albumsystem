var DataBase = require('../../db/index.js');
var CONST = require('../CONST.js');
var connect = CONST('CONNECTSTR');
var dataName = CONST('DATABASENAME');
var dataConnect1 = CONST('COLLECTIONS').yonghu;
var dataConnect2 = CONST('COLLECTIONS').xiangce;
var dataConnect3 = CONST('COLLECTIONS').dianzan;
var responsetext = CONST('RESPONSETEXT');

function renderDianzan(req, res) {

    var dianusername = req.query.dianusername;

    var username = req.session.username;
    var dianzanA = {
        dianusername: dianusername,
        username: username
    };
    var db = new DataBase(connect, dataName, dataConnect3);
    db.findMany(dianzanA, function (err, arr) {
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

module.exports = renderDianzan;