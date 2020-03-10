// 引入express
var express = require('express');
// 生成app服务器
var app = express();

// 引入配置
var conf = require('./server/conf/index');
// 配置
conf(app);

// 引入接口
var router = require('./server/router/index');
//配置
router(app);

// 引入socket.io配置
var socket = require('./server/socket/socket');
var server = socket(app);

// 监听端口
server.listen(3000);