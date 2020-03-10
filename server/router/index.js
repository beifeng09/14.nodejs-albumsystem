var express = require('express');
// 获取router
var router = express.Router();

// 引入
var checkname = require('./checkName');
var regist = require('./regist');
var login = require('./login');
var main = require('./main');
var error = require('./error');

// 相册创建、上传
var create_album = require('./create_album');
var upload_img = require('./upload_img');
var removeAlbum = require('./removeAlbum');


var getAlbumImgs = require('./getAlbumImgs');
var renameImg = require('./renameImg');
var changeImgState = require('./changeImgState');
var removeImg = require('./removeImg');

var checkNickName = require('./checkNickName');
var updateUserInfo = require('./updateUserInfo');
var updateHeadPic = require('./updateHeadPic');
var getAlbumPic = require('./getAlbumPic');
var exit = require("./exit");
var block = require("./block");

//kkkkko
var allphoto = require("./allphoto");
var dianzan = require("./dianzan");
var rmdianzan = require("./rmdianzan");
var renderDianzan = require("./renderDianzan");
var renderAllPic = require("./renderAllPic");
var liuyan = require("./liuyan");
var pinglun = require("./pinglun");

//挂载接口
router.get('/checkName', checkname);
router.post('/regist', regist);
router.post('/login', login);
router.get('*', block);
router.get('/main', main);
router.get('/error', error);

router.get('/create_album', create_album);
router.post('/upload_img', upload_img);
router.get('/removeAlbum', removeAlbum);


router.get('/getAlbumImgs', getAlbumImgs);
router.get('/renameImg', renameImg);
router.get('/changeImgState', changeImgState);
router.get('/removeImg', removeImg);
router.get('/checkNickName', checkNickName);
router.post('/updateUserInfo', updateUserInfo);
router.get('/getAlbumPic', getAlbumPic);
router.post('/updateHeadPic', updateHeadPic);
router.get('/exit', exit);



router.get('/allphoto', allphoto);
router.get('/dianzan', dianzan);
router.get('/rmdianzan', rmdianzan);
router.get('/renderDianzan', renderDianzan);
router.get('/renderAllPic', renderAllPic);
router.get('/liuyan', liuyan);
router.post('/pinglun', pinglun);


// 暴露函数
module.exports = function (app) {
    app.use(router);
};