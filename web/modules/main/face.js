define(function(require, exports, module) {
	// 引入模块
	var tools = require("modules/tools/tools");
	var Observer = tools.Observer;
	// 获取元素
	var $switchSpan = $(".face span");
	var $faceList = $("#faceList");
	var $chatInp = $('#chatInp');
	var $chatSend = $('#chatSend');
	// 当点击$switchSpan的时候要切换$faceList的显示隐藏
	$switchSpan.click(function() {
		$faceList.slideToggle();
	});
    $chatInp.click(function () {
        $faceList.slideUp();
    });
    $chatInp.click(function () {
        $faceList.slideUp();
    });

	// 当点击某一个图片本身的时候 要通知聊天模块 将所点击的表情告知它
	$faceList.on("click", "li", function() {
		// 获取对应的代码
		var code = $(this).data("code");
		// 通知聊天模块将消息发送过去
		Observer.trigger("msgFromFace", code);
	});
});