// 管理相册--- 创建模块
define(function (require, exports, module) {
    // 引入工具
    var tools = require('modules/tools/tools');
    var Observer = tools.Observer;
    // 获取元素
    var $inp = $('#createInp');
    var $btn = $('#createBtn');
    var $modalContent = $(".modal-content");
    // 点击发送ajax请求，创建相册
    $btn.on('click', function () {
        // 获取用户在输入框输入的相册名
        var val = $inp.val();
        $.ajax({
            url: '/create_album',
            type: 'get',
            data: {
                album_name: val,
                img: '/web/imgs/pic-none.png'
            },
            dataType: 'json',
            success: function (data) {
                Observer.trigger('tip', data.data);
                // 成功时，通知上传图片模块与显示相册模块
                if (!data.error) {
                    // 触发相册更新事件， 上传图片与显示相册需监听
                    Observer.trigger('album_render_list', val);
                    $('#exampleModal').modal('hide');
                }
            }
        });
    });
});