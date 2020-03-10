// 定义对象
var obj = {
    // 定义连接字符串
    CONNECTSTR: 'mongodb://localhost:27017',
    // 定义数据库名称
    DATABASENAME: 'album',
    // 定义集合
    COLLECTIONS: {
        'yonghu': 'users',
        'xiangce': 'albums',
        'tupian': 'imgs',
        'dianzan':'dianzan',
        'liuyan':'liuyan'
    },
    // 定义返回数据
    RESPONSETEXT: {
        "success": {error: 0,data: "操作成功"},
        "registSuccess": {error: 0,data: "注册成功"},
        "loginSuccess": {error: 0,data: "登录成功"},
        "failed": {error: 1,data: "操作失败"},
        "createFloderFailed": {error: 1, data: "创建文件夹失败"},
        "findUserNameFailed": {error: 1, data: "查询用户名失败"},
        "findNickNameFailed": {error: 1, data: "查询昵称失败"},
        "findDataErr": {error: 1,data: "查询失败"},
        "userExist": {error: 2, data: "用户名已经被占用"},
        "nickNameExist": {error: 2, data: "该昵称已经被占用"},
        "userUseable": {error: 0, data: "用户名可用"},
        "nickNameUseable": {error: 0, data: "恭喜，该昵称可用"},
        "renameFileFailed": {error: 2, data: "文件重命名失败"},
        "readFileFailed": {error: 2, data: "读取文件失败"},
        "appendFileFailed": {error: 2, data: "追加文件内容失败"},
        "registFailed": {error: 2,data: "注册失败"},
        "usernameOrpasswordErr": {error: 2, data: "用户名或密码不正确"},
        "uploadFileErr": {error: 2,data: "文件上传失败"},
        "insertDataErr": {error: 2,data: "插入数据失败"},
        "deleteDataErr": {error: 2,data: "移除数据失败"}
    }
};

// 暴露
module.exports = function (type) {
    return obj[type];
};