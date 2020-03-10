define(function(require, exports, module) {
	var Observer = require("modules/tools/tools").Observer;
	var $userList = $("#userList");
	var $wordList = $("#wordList");
	var $chatInp = $("#chatInp");
	var $chatSend = $("#chatSend");
	var username = "";
	var head_pic = "";
	var mode = "";
	var target = "";
	// 监听sendMsg事件
	Observer.on("sendMsg", function(obj) {
		username = obj.username;
		head_pic = obj.head_pic;
	});
	// 初始化 websocket连接请求
	socket = io();
	// 触发getMsg事件
	Observer.trigger("getMsg");
	// 通知后台 有人登录了 并将用户的名称 头像地址 发送过去
	socket.emit("baodao", {
		username: username,
		head_pic: head_pic,
	});

	// 监听updateUserNameList事件
	socket.on("updateUserNameList", function(arr) {
		// 清空原来的列表 
		$userList.html("");
		// 挨个上树
		arr.forEach(function(value) {
			$userList.append("<li data-username=" + value.username + "><span><img src=" + value.head_pic + "></span><span class='ellipsis'>" + value.username + "</span></li>")
		});
	});
	Observer.on("mode", function(obj) {
		mode = obj.mode;
		target = obj.target;
	});

	// 绑定点击事件
	$chatSend.click(function() {
		// 获取内容
		var val = $chatInp.val();
		if (!val) {
			return;
		}
		// 清空已经输入的内容
		$chatInp.val("");
		// 问别人要模式
		Observer.trigger("askForMode");
		// 发给服务器
		socket.emit("someonespeak", {
			username: username,
			content: val,
			mode: mode,
			target: target
		});
	});
	// 监听新消息事件
	socket.on("newMsg", function(obj) {
		// 获取用户输入的内容
		var content = obj.content;
		// 获取用户名称
		var username = obj.username;
		$wordList.append("<li><span>" + username + "</span><span>：</span><span>" + content + "</span></li>")
	});
	// 监听表情区域的消息
	Observer.on("msgFromFace", function(code) {
		$chatInp.val($chatInp.val() + "[" + code + "]");
	});
	// 委托模式添加点击事件 用于切换私聊目标
	$userList.on("click", "li", function() {
		// 获取目标用户名称
		var username = $(this).data("username");
		// 切换到私聊
		// 通知mode模块 切换到私聊模式
		Observer.trigger("changeMode", username);
	});
	// 监听私聊事件
	socket.on("privateChat", function(obj) {
        // 向发言列表中添加一条消息
		$wordList.append("<li><span>" + obj.username + "</span><span>  悄悄地向你说：  </span><span>" + obj.content + "</span></li>")
	});
});