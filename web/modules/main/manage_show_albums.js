define(function (require, exports, module) {
    // 引入工具
    var tools = require('modules/tools/tools');
    var Observer = tools.Observer;
    // 获取元素
    var $albumList = $('#albumList');
    var $ouya = $('#ouya');

    // 使用委托模式绑定事件
    // 第一次 点击span元素获取该相册名称并发送ajax 获取该相册下的所有图片 并展示在展示图片中
    $albumList.on('click', '.album-name', function () {
        // 从同一个父元素li中自定义属性获取相册名称
        var album_name = $(this).parent().attr('data-album-name');
        // 通知显示所有照片的模块，发送ajax
        Observer.trigger('getAlbumImgs', album_name);
    });

    // 新增
    var $showMyAlbums = $('#showMyAlbums');
    var $showMyImgs = $('#showMyImgs');
    var $allTabsContent = $('#allTabsContent');
    var $tabList = $('#tabList');

    $showMyAlbums.on('click', 'li', function () {
        $allTabsContent.hide();
        $showMyImgs.show();
        var album_name = $(this).attr('data-album-name');
        Observer.trigger('getAlbumImgs', album_name);
    });
    $showMyAlbums.on('click', 'button', function (e) {
        e.stopPropagation();
        // 获取li元素！
        var $li = $(this).parent();
        // 获取相册名称
        var album_name = $li.data("album-name");
        // 发送ajax
        $.ajax({
            url: "/removeAlbum",
            data: {
                album_name: album_name
            },
            type: "get",
            dataType: "json",
            success: function(data) {
                // 提示操作结果
                Observer.trigger("tip", data.data);
                // 删除自己的该元素
                $li.remove();
                // 通知上传模块 移除该相册
                Observer.trigger("removeAlbum", album_name);
            }
        });
    });

    $tabList.on('click', 'li', function () {
        $allTabsContent.show();
        $showMyImgs.hide();
        $ouya.hide();
    });


    // 监听创建相册事件
    Observer.on('album_render_list', function (album_name) {
        // 创建li上树
        var str = [
            '<li data-album-name=' + album_name +'>',
            '<span class="album-name">' + album_name +'</span>',
            '<button type="button" class="close" aria-label="Close">',
            '<span aria-hidden="true">&times;</span>',
            '</button>',
            '</li>'
        ].join('');
        $albumList.append(str);

        //  新增
        var str1 = [
            '<li data-album-name=' + album_name + '>',
            '<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
            '<div>',
            '<img id="albumPic" src="/web/imgs/pic-none.png" alt="">',
            '</div>',
            '<div class="albumName">',
            '<span class="album-name">' + album_name +'</span>',
            '</div>',
            '</li>'
        ].join('');
        $showMyAlbums.append(str1);

    });



});