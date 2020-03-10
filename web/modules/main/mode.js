define(function(require, exports, module) {
	// 引入工具模块
	var tools = require("modules/tools/tools");
	// 引入观察者对象
	var Observer = tools.Observer;
	// 获取元素
	var $select = $("#mode");
	var $target = $("#target");
	// 绑定change事件
	$select.change(function() {
		if ($(this).val() === "public") {
			// 切换到公共聊天
			$target.html("所有人");
		}
	});

	// 监听changeMode事件
	Observer.on("changeMode", function(username) {
		// 将模式 也就是select的value设置为private
		$select.find("option").each(function(i, option) {
			if (option.value === "private") {
				option.selected = "selected";
			}
		});
		// 将目标对象设置为目标名称
		$target.html(username);
	});

	// 当别人问本模块要消息的时候 要触发一个消息并传递数据
	Observer.on("askForMode", function() {
		Observer.trigger("mode", {
			mode: $select.val(),
			target: $target.html()
		});
	})
});