define(function (require, exports, module) {

    var $dz = $('.dz');
    var $name1 = $('.name1');
    var $ouya = $('#ouya');
    var biaoTi = $(this).parent().siblings('.name1').html();
    var username = $name1.data('username');
    var obj = {
        dianusername: username,
        uploadName: biaoTi
    };

    $.ajax({
        url: '/renderDianzan',
        data: obj,
        type: 'get',
        dataType: 'json',
        success: function (data) {
            for (var i = 0; i < data.data.length; i++) {
                $name1.each(function (ind, val) {
                    if (data.data[i].uploadName === $(val).html()) {
                        $(val).siblings('.dianzan').find('.dz').addClass('like');
                        $(val).siblings('.dianzan').find('.dz').addClass('fa-thumbs-up').removeClass('fa-thumbs-o-up')
                    }
                })
            }
        }
    });


    $ouya.delegate(".dz", "click", function (event) {
        event.stopPropagation();
        var biaoTi = $(this).parent().siblings('.name1').html();
        var me = $(this);
        var obj = {
            dianusername: username,
            uploadName: biaoTi
        };
        if (me.hasClass('like')) {
            me.addClass('fa-thumbs-o-up').removeClass('fa-thumbs-up');
            me.removeClass('like');
            var dzn = me.siblings('#dianzannum').html();
            var num = +dzn - 1;
            me.siblings('#dianzannum').html(num);
            $.ajax({
                url: '/rmdianzan',
                data: obj,
                type: 'get',
                dataType: 'json',
                success: function (data) {
                    if (!data.error) {

                    }

                }
            })
        } else {
            me.addClass('fa-thumbs-up').removeClass('fa-thumbs-o-up');
            me.addClass('like');
            var dzn = me.siblings('#dianzannum').html();
            var num = +dzn + 1;
            me.siblings('#dianzannum').html(num);
            $.ajax({
                url: '/dianzan',
                data: obj,
                type: 'get',
                dataType: 'json',
                success: function (data) {
                    if (!data.error) {
                    }
                }
            })
        }
    })
});