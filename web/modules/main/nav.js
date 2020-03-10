define(function(require, exports, module) {
    var tools = require("modules/tools/tools");
    var Observer = tools.Observer;
    // 获取元素
    var $img = $('#headPic');
    // 获取用户昵称
    var username = $('#nickName').html();
    // 自己是可以得到内容的
    Observer.on("getMsg", function() {
        Observer.trigger("sendMsg", {
            username: username,
            head_pic: $img.attr("src")
        });
    });
});