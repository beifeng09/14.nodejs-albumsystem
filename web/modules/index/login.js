define(function (require, exports, module) {
    // 引入观察者对象
    var tools = require('modules/tools/tools');
    var Observer = tools.Observer;
    // 获取元素
    var $loginForm = $('#loginForm');
    var $goRegist = $('#goRegist');
    var $loginFormBtn = $('#loginFormBtn');
    // 注册显示登录表单事件
    Observer.on('showLoginForm', function () {
        $loginForm.removeClass('hide');
    });
    // goRegist点击事件
    $goRegist.click(function() {
        $loginForm.addClass('hide');
        Observer.trigger('showRegistForm');
    });

    // 为登录按钮注册点击事件
    $loginFormBtn.on('click', function () {
        // 表单序列化
        var data = $loginForm.serialize();
        // 发送ajax
        $.ajax({
            url: '/login',
            type: 'post',
            data: data,
            dataType: 'json',
            success: function (data) {
                Observer.trigger('tip', data.data);
                // 如果成功，跳转页面
                if (!data.error) {
                    setTimeout(function () {
                        location.href = '/main';
                    },500);
                    return;
                }
            }
        })
    });
});