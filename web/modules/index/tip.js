define(function (require, exports, module) {
    // 引入观察者对象
    var tools = require('modules/tools/tools');
    var Observer = tools.Observer;
    // 获取元素
    var $tipModal = $('#tipModal');
    var $tipModalContent = $('#tipModalContent');

    Observer.on('tip', function (data) {
        layui.use('layer', function () {
            var layer = layui.layer;
            layer.msg(data, {
                time: 1000
            });
        });
    });
    Observer.on('tipCancel', function () {
        $tipModal.modal('hide');
    })
});