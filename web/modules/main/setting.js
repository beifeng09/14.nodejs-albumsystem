define(function (require, exports, module) {
    // 引入工具
    var tools = require("modules/tools/tools");
    var Observer = tools.Observer;
    // 引入策略对象
    var strategy = tools.strategy;

    // 获取元素
    var $showUserInfo = $('#showUserInfo');
    var $personalInfo = $('#personalInfo');
    var $allTabsContent = $('#allTabsContent');
    var $tabList = $('#tabList');
    var $nickName = $('#nickName');
    var $nickNameInp = $('#nickNameInp');
    var $showMyImgs = $('#showMyImgs');
    var $name1 = $('#name1');
    var $ouya = $('#ouya');




    // 点击个人信息 显示设置div
    $showUserInfo.click(function () {
        $tabList.find('li').removeClass('layui-this');
        $allTabsContent.hide();
        $showMyImgs.hide();
        $ouya.hide();
        $personalInfo.show();
    });
    // 点击导航 隐藏设置div
    $tabList.on('click', 'li', function () {
        $allTabsContent.show();
        $personalInfo.hide();
    });

    // 用户修改昵称时，发送ajax验证是否可以使用
    $nickNameInp.on('blur', function () {
        var val = $(this).val();
        var result = strategy.use('nickName', val);
        if (result) {
            Observer.trigger('tip', result);
            // 验证不通过
            return;
        }
        // 符合规范， 发送ajax
        $.ajax({
            url: '/checkNickName',
            type: 'get',
            data: {
                nick_name: val
            },
            dataType: 'json',
            success: function (data) {
                Observer.trigger('tip', data.data);
            }
        });
    });


    layui.use(['form', 'layedit', 'laydate'], function () {
        var form = layui.form
            , layer = layui.layer
            , layedit = layui.layedit
            , laydate = layui.laydate;

        //日期
        laydate.render({
            elem: '#date'
        });
        laydate.render({
            elem: '#date1'
        });

        //监听表单提交
        form.on('submit(userInfo)', function (data) {
            var datas = data.field;
            $.ajax({
                url: '/updateUserInfo',
                data: datas,
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    if (!data.error) {
                        Observer.trigger('tip', data.data);
                    }
                    $nickName.html(data.nick_name);
                    $name1.html(data.nick_name);
                    window.location.reload();
                }
            });
            return false;
        });
    });
});