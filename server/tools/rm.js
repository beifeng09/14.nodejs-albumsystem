// fs模块
var fs = require("fs");
// 定义一个函数 该函数可以删除非空目录 
function rm(dirPath) {
	// 读取dirPath中的所有文件和文件夹的名称
	var arr = fs.readdirSync(dirPath);
	for (var i = 0; i < arr.length; i++) {
		// 判定每一个名字的状态 
		var stat = fs.statSync(dirPath + "/" + arr[i]);
		// 判定
		if (stat.isDirectory()) {
			// 说明是文件夹 
			rm(dirPath + "/" + arr[i]);
		} else {
			// 说明是文件
			fs.unlinkSync(dirPath + "/" + arr[i])
		}
	}
	// 删除自己
	fs.rmdirSync(dirPath);
}
// 暴露出去
module.exports = rm;