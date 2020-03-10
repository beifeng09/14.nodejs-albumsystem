//引入socket.io模块
var socket_io = require("socket.io");
var http = require("http");
//将报道的用户放到数组之中
var arr = [];
function set(app) {
    var server = http.Server(app);
    var io = socket_io(server);
    io.on("connection", function(socket) {
        var username = "";
        socket.on("baodao", function(obj) {
            arr.push(obj);
            obj.id = socket.id;
            username = obj.username;
            io.sockets.emit("updateUserNameList", arr);
        });
        socket.on("disconnect", function() {
            arr.forEach(function(value, index) {
                if(value.username === username) {
                    arr.splice(index, 1);
                }
            });
        });
        socket.on("someonespeak", function(obj) {
            var content = obj.content;
            var newContent = content.replace(/\[\\([a-zA-Z]+)\]/g, function(match, $1) {
                return "<img src=/web/face/" + $1 + ".gif  />"
            });
            obj.content = newContent;
            if(obj.mode === "public") {
                io.sockets.emit("newMsg", obj);
            }else {
                var target = obj.target;
                var id = "";
                console.log(target);
                console.log(arr);
                arr.forEach(function(value) {
                    if(value.username === target) {
                        id = value.id;
                    }
                });
                io.to(id).emit("privateChat", obj);
            }
        });
    });
    return server;
}
module.exports = set;