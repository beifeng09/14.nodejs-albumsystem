define(function (require, exports, module) {
    // 引入工具模块
    var tools = require('modules/tools/tools');
    // 引入观察者对象
    var Observer = tools.Observer;
    // 引入策略对象
    var strategy = tools.strategy;
    // 获取元素
    var $goLogin = $('#goLogin');
    var $registForm = $('#registForm');
    var $registFormUsernameInp = $('#registFormUsernameInp');
    var $registFormBtn = $('#registFormBtn');

    // 定义锁， 用户名与密码验证的开关
    var username_lock = false;
    var password_lock = false;

    $goLogin.click(function () {
        $registForm.addClass('hide');
        Observer.trigger('showLoginForm');
    });

    Observer.on('showRegistForm', function () {
        $registForm.removeClass('hide');
    });


    // 监听用户注册时，输入的名称，发送ajax，验证是否可以使用
    $registFormUsernameInp.on('blur', function () {
        var val = $(this).val();
        var result = strategy.use('userName', val);
        if (result) {
            Observer.trigger('tip', result);
            // 验证不通过
            username_lock = false;
            return;
        }
        // 符合规范， 发送ajax
        $.ajax({
            url: '/checkName',
            type: 'get',
            data: {
                username: val
            },
            dataType: 'json',
            success: function (data) {
                Observer.trigger('tip', data.data);
                // 如果成功
                if (!data.error) {
                    // 开锁
                    username_lock = true;
                } else {
                    username_lock = false;
                }
            }
        });
    });

    // 获取密码与重复密码，监听onblur事件检测2个密码是否一致
    var $registFormPasswordInp = $('#registFormPasswordInp');
    var $registFormPasswordInpRepeat = $('#registFormPasswordInpRepeat');

    // 监听onblur事件
    $registFormUsernameInp.on('blur', function () {
        var pass1 = $(this).val();
        var pass2 = $registFormPasswordInpRepeat.val();
        if (pass1 === pass2) {
            password_lock = true;
        } else {
            password_lock = false;
        }
    });
    $registFormPasswordInpRepeat.on('blur', function () {
        var pass1 = $(this).val();
        var pass2 = $registFormPasswordInp.val();
        if (pass1 === pass2) {
            password_lock = true;
        } else {
            password_lock = false;
            Observer.trigger('tip', '2次输入密码不一致，请检查');
        }
    });

    // 监听注册页面 提交按钮点击事件
    $registFormBtn.on('click', function () {
        // 检测用户名与密码验证锁
        if (!username_lock && password_lock) {
            Observer.trigger('tip', '注册信息输入有误，请重新输入');
            return;
        }
        // 成功 表单序列化
        var data = $registForm.serialize();
        // 发送ajax
        $.ajax({
            url: '/regist',
            type: 'post',
            data: data,
            dataType: 'json',
            success: function (data) {
                Observer.trigger('tip', data.data);
                if (!data.error) {
                    // 去登录
                    $goLogin.trigger('click');
                    return;
                }
            }
        })
    })
});