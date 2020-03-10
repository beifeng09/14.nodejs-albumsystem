// 引入各种插件
var express = require('express');
var body_parser = require('body-parser');
var session = require('express-session');
var cookie_parser = require('cookie-parser');
var connectMongo = require('connect-mongo')(session);

// 配置插件
function conf(app) {
    // app.use(body_parser.urlencoded({extended: false}));
    app.use(body_parser.json({limit:'50mb'}));
    app.use(body_parser.urlencoded({limit:'50mb',extended:true}));
    app.use(express.json({limit: '5mb'}));
    app.use(cookie_parser());
    app.use(session({
        secret: 'msoaonofineegnamdpwoigniusadsfeoginovms',
        resave: false,
        saveUninitialized: true,
        store: new connectMongo({
            url: 'mongodb://localhost:27017/album_session'
        }),
        // 设置cookie的存活周期
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 3
        }
    }));
    // 静态化
    app.use("/albums/", express.static("./albums"));
    app.use('/web/', express.static('./web'));
}

// 暴露接口
module.exports = conf;