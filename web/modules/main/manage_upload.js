// 管理相册 --- 上传模块
define(function (require, exports, module) {
    // 引入工具
    var tools = require('modules/tools/tools');
    var Observer = tools.Observer;
    // 获取上传点击按钮
    var $uploadBtn = $('#uploadBtn');
    var $uploadForm = $('#uploadForm');
    // 获取输入内容
    var $uploadFile = $('#uploadFile');
    // 获取选择名称
    var $uploadSelect = $('#uploadSelect');
    // 点击按钮时，获取uploadFile的值，发送ajax，上传图片
    $uploadBtn.on('click', function () {
        var val = $uploadFile.val();
        // 获取用户相册目标文件夹
        var album_name = $uploadSelect.val();
        if (!val) {
            // 没有选中图片
            Observer.trigger('tip', '请选择图片');
            return;
        }

        // 使用ajax2.0序列化表单
        var form = new FormData($uploadForm[0]);
        // 往form中追加用户相册名项
        form.append('album_name', album_name);

        // 发送ajax
        $.ajax({
            url: '/upload_img',
            type: 'post',
            data: form,
            dataType: 'json',
            // 该属性用于对data参数进行序列化处理，默认为true，ajax2.0 已经序列化了，所以改为false
            processData: false,
            // 因为使用表单提交文件数据，避免jQuery对content-type再进行操作，设置false
            contentType: false,
            success: function (data) {
                Observer.trigger('tip', data.data);
                $('#uploadModal').modal('hide');
                $.ajax({
                    url: '/getAlbumPic',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        album_name: album_name
                    },
                    success: function (data) {
                        $('#albumPic').attr('src', data.img);
                    }
                })
            }
        });
    });


    // 监听album_render_list事件
    Observer.on('album_render_list', function (album_name) {
        $uploadSelect.append('<option value=' + album_name + '>' + album_name + '</option>');
    });

    // 监听removeAlbum 相册移除事件
    Observer.on('removeAlbum', function (album_name) {
        // 获取select
        $uploadSelect.find('option').each(function (index, value) {
            if ($(value).val() == album_name) {
                $(value).remove();
            }
        });
    });

});