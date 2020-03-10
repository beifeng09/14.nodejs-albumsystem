define(function (require, exports, module) {
    // 引入工具模块
    var tools = require("modules/tools/tools");
    // 引入观察者对象
    var Observer = tools.Observer;
    // 获取元素
    var $renameModal = $('#renameModal');
    var $renameModalForm = $('#renameModalForm');
    var $renameModalFormBtn = $('#renameModalFormBtn');

    // 监听模态框的出现事件
    $renameModal.on('show.bs.modal', function (e) {
        // 从e.relatedTarget(a标签)上获取获取相册名称
        var album_name = $(e.relatedTarget).data('album-name');
        // 获取图片名称
        var img_name = $(e.relatedTarget).data('img-name');
        // 获取表单中两个input[type=hidden]
        var $album_name_inp = $renameModalForm.find('input[name=album_name]');
        var $img_name_inp = $renameModalForm.find('input[name=img_name]');
        // 为两个input设置value属性
        $album_name_inp.val(album_name);
        $img_name_inp.val(img_name);
    });


    // 为$renameModalFormBtn添加点击事件
    $renameModalFormBtn.on('click', function () {
        // 表单序列化
        var data = $renameModalForm.serialize();
        // 获取相册名字
        var album_name = $renameModalForm.find('input[name=album_name]').val();
        // 发送ajax
        $.ajax({
            url: '/renameImg',
            type: 'get',
            data: data,
            dataType: 'json',
            success: function (data) {
                Observer.trigger('tip', data.data);
                setTimeout(function () {
                    // tip中已经有模态框显示，取消模态框
                    Observer.trigger('tipCancel');
                    $renameModal.modal('hide');
                    Observer.trigger('getAlbumImgs', album_name);
                }, 500)
            }
        });
    })
});