define(function (require, exports, module) {
    // 引入工具
    var tools = require('modules/tools/tools');
    var Observer = tools.Observer;
    // 获取展示图片列表容器ul
    var $showImgs = $('#showImgs');
    // 监听显示所有相册模块中的getAlbumImgs事件
    Observer.on('getAlbumImgs', function (album_name) {
        // 发送ajax请求图片数据
        $.ajax({
            url: '/getAlbumImgs',
            type: 'get',
            data: {
                album_name: album_name
            },
            dataType: 'json',
            success: function (data) {
                if (!data.error) {
                    Observer.trigger('tip', '图片请求成功');
                    // 清空现有的所有图片
                    $showImgs.empty();
                    // 循环data.data
                    data.data.forEach(function (value) {
                        var str = [
                            '<li class="col-lg-2"  data-album-name=' + album_name + '  data-img-name=' + value.img_name + '>',
                            '<input type="checkbox" data-album-name=' + album_name + '  data-img-name=' + value.img_name + ' ' + (value.display === "true" ? "checked" : "") + '/>', // 是否可见锁
                            '<div><img src="' + value.src + '" alt=""></div>',
                            '<span><a data-album-name=' + album_name + '  data-img-name=' + value.img_name + ' data-toggle="modal" data-target="#renameModal">' + value.img_name + '</a></span>',
                            '<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
                            '</li>'
                        ].join("");
                        $showImgs.append(str);
                        $showImgs.on('click', 'li', function () {
                            layui.use('layer', function () {
                                var layer = layui.layer;
                                layer.photos({
                                    photos: '#showImgs',
                                    anim: 5
                                });
                            });
                        });
                    });
                    return;
                }
            }
        });
    });

    // 委托模式添加修改图片状态事件
    $showImgs.on('click', 'input', function () {
        // 获取相册名称
        var album_name = $(this).data('album-name');
        // 获取图片名称
        var img_name = $(this).data('img-name');
        // 获取input的checked属性
        var state = this.checked;
        // 发送ajax 去数据库中修改imgs集合的某一条数据的display状态
        $.ajax({
            url: '/changeImgState',
            type: 'get',
            data: {
                img_name: img_name,
                album_name: album_name,
                state: state
            },
            dataType: 'json',
            success: function (data) {

            }
        });
    });

    // 点击删除按钮删除图片
    $showImgs.on('click', 'button', function () {
        // 获取li
        var $li = $(this).parent();
        // 获取相册名称
        var album_name = $li.data('album-name');
        // 获取图片名称
        var img_name = $li.data('img-name');
        // 发送ajax
        $.ajax({
            url: '/removeImg',
            type: 'get',
            data: {
                album_name: album_name,
                img_name: img_name
            },
            dataType: 'json',
            success: function (data) {
                Observer.trigger('tip', data.data);
                // 删除该图片元素
                $li.remove();
            }
        })
    })
});