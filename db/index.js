// 初始化数据库链接模块
// 引入mongodb模块
var mongodb = require('mongodb');
// 获取连接客户端
var MongoClient = mongodb.MongoClient;


// 定义一个构造函数 该函数接收3个参数: 第一个是连接字符串 第二个是数据库的名称 第三个是集合的名称
// 当初始化的时候 返回一个对象 该对象可以调用各种方法 find、findOne、updateOne、updateMany、deleteOne、deleteMany、insertOne、insertMany、
function DataBase(connectStr, dbName, collName) {
    // 连接字符串
    this.connectStr = connectStr;
    // 数据库名称
    this.dbName = dbName;
    // 集合名称
    this.collName = collName;
}

// 每当调用对应的方法时，我们要连接数据库 并执行对应的操作
DataBase.prototype = {
    constructor: DataBase,
    findMany: function (query, callback) {
        // 备份this
        var me = this;
        // 连接数据库
        MongoClient.connect(this.connectStr, function (err, client) {
            if (err) {
                // 给用户传递一个错误信息回去 用户经过判定之后就知道出错了
                callback(err, null);
                return;
            }
            // 连接成功， 确定数据库
            var db = client.db(me.dbName);
            // 确认集合
            var coll = db.collection(me.collName);
            // 调用findMany方法, 同时查询多条数据，转数组
            coll.find(query).toArray(function (err, arr) {
                // 关闭连接
                client.close();
                if (err) {
                    callback(err, null);
                    return;
                }
                // 如果代码执行到这里 说明成功 此时 err是null arr是查询的结果数组
                callback(null, arr);
            });
        });
    },
    findOne: function(query, callback) {
        // 备份this
        var me = this;
        // 连接数据库
        MongoClient.connect(this.connectStr, function(err, client) {
            // 判定是否出错
            if (err) {
                // 给用户传递一个错误信息回去 用户经过判定之后就知道出错了
                callback(err, null);
                return;
            }
            // 说明连接成功了
            // 确定数据库
            var db = client.db(me.dbName);
            // 确定集合
            var coll = db.collection(me.collName);
            // 调用findOne方法
            coll.findOne(query, function(err, data) {
                // 关闭连接
                client.close();
                // 查询出错
                if (err) {
                    callback(err, null);
                    return;
                }
                // 如果代码执行到这里 说明成功 此时 err是null data是查询的结果对象
                callback(null, data);
            });
        });
    },
    updateMany: function(query, data, callback) {
        // 备份this
        var me = this;
        // 连接数据库
        MongoClient.connect(this.connectStr, function(err, client) {
            // 判定是否出错
            if (err) {
                // 给用户传递一个错误信息回去 用户经过判定之后就知道出错了
                callback(err, null);
                return;
            }
            // 说明连接成功了
            // 确定数据库
            var db = client.db(me.dbName);
            // 确定集合
            var coll = db.collection(me.collName);
            // 调用updateMany方法
            coll.updateMany(query, data, {}, function(err, result) {
                // 关闭连接
                client.close();
                // 查询出错
                if (err) {
                    callback(err, null);
                    return;
                }
                // 如果代码执行到这里 说明成功 此时 err是null data是查询的结果对象
                callback(null, result);
            });
        });
    },
    updateOne: function(query, data, callback) {
        // 备份this
        var me = this;
        // 连接数据库
        MongoClient.connect(this.connectStr, function(err, client) {
            // 判定是否出错
            if (err) {
                // 给用户传递一个错误信息回去 用户经过判定之后就知道出错了
                callback(err, null);
                return;
            }
            // 说明连接成功了
            // 确定数据库
            var db = client.db(me.dbName);
            // 确定集合
            var coll = db.collection(me.collName);
            // 调用updateOne方法
            coll.updateOne(query, data, {}, function(err, result) {
                // 关闭连接
                client.close();
                // 查询出错
                if (err) {
                    callback(err, null);
                    return;
                }
                // 如果代码执行到这里 说明成功 此时 err是null data是查询的结果对象
                callback(null, result);
            });
        });
    },
    deleteMany: function(query, callback) {
        // 备份this
        var me = this;
        // 连接数据库
        MongoClient.connect(this.connectStr, function(err, client) {
            // 判定是否出错
            if (err) {
                // 给用户传递一个错误信息回去 用户经过判定之后就知道出错了
                callback(err, null);
                return;
            }
            // 说明连接成功了
            // 确定数据库
            var db = client.db(me.dbName);
            // 确定集合
            var coll = db.collection(me.collName);
            // 调用方法
            coll.deleteMany(query, {}, function(err, result) {
                // 关闭连接
                client.close();
                // 查询出错
                if (err) {
                    callback(err, null);
                    return;
                }
                // 如果代码执行到这里 说明成功 此时 err是null data是查询的结果对象
                callback(null, result);
            });
        });
    },
    deleteOne: function(query, callback) {
        // 备份this
        var me = this;
        // 连接数据库
        MongoClient.connect(this.connectStr, function(err, client) {
            // 判定是否出错
            if (err) {
                // 给用户传递一个错误信息回去 用户经过判定之后就知道出错了
                callback(err, null);
                return;
            }
            // 说明连接成功了
            // 确定数据库
            var db = client.db(me.dbName);
            // 确定集合
            var coll = db.collection(me.collName);
            // 调用方法
            coll.deleteOne(query, {}, function(err, result) {
                // 关闭连接
                client.close();
                // 查询出错
                if (err) {
                    callback(err, null);
                    return;
                }
                // 如果代码执行到这里 说明成功 此时 err是null data是查询的结果对象
                callback(null, result);
            });
        });
    },
    insertMany: function(arr, callback) {
        // 备份this
        var me = this;
        // 连接数据库
        MongoClient.connect(this.connectStr, function(err, client) {
            // 判定是否出错
            if (err) {
                // 给用户传递一个错误信息回去 用户经过判定之后就知道出错了
                callback(err, null);
                return;
            }
            // 说明连接成功了
            // 确定数据库
            var db = client.db(me.dbName);
            // 确定集合
            var coll = db.collection(me.collName);
            // 调用方法
            coll.insertMany(arr, {}, function(err, result) {
                // 关闭连接
                client.close();
                // 查询出错
                if (err) {
                    callback(err, null);
                    return;
                }
                // 如果代码执行到这里 说明成功 此时 err是null data是查询的结果对象
                callback(null, result);
            });
        });
    },
    insertOne: function(obj, callback) {
        // 备份this
        var me = this;
        // 连接数据库
        MongoClient.connect(this.connectStr, function(err, client) {
            // 判定是否出错
            if (err) {
                // 给用户传递一个错误信息回去 用户经过判定之后就知道出错了
                callback(err, null);
                return;
            }
            // 说明连接成功了
            // 确定数据库
            var db = client.db(me.dbName);
            // 确定集合
            var coll = db.collection(me.collName);
            // 调用方法
            coll.insertOne(obj, {}, function(err, result) {
                // 关闭连接
                client.close();
                // 查询出错
                if (err) {
                    callback(err, null);
                    return;
                }
                // 如果代码执行到这里 说明成功 此时 err是null data是查询的结果对象
                callback(null, result);
            });
        });
    }
};


// 暴露函数
module.exports = DataBase;


