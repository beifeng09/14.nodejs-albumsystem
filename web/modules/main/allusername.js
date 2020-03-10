define(function(require, exports, module) {
    var $allUsername = $('#allUsername');

    var Observer = require('modules/tools/tools').Observer;

    var $ouya = $('#ouya');
    var $allTabsContent = $('#allTabsContent');
    var str1 = '<div class="boxou"><div class="liuyan1">' +
        '<div class="boxou1"><i class="fa fa-times fa-2x close" aria-hidden="true"></i>' +
        '</div><div class="boxou2"><ul id="ul"><li><div class="face_f">' +
        '<img  src=""></div>' +
        '<a href="javascript:;"></a><span></span><div class="ff">' +
        '<p class="time">2月14日 8:18</p><span class="delete">删除</span>' +
        '</div></li></ul></div>' +
        '<div class="col-lg-12"><div class="input-group">' +
        '<input type="text" class="form-control" id="liuyan" placeholder="">' +
        '<span class="input-group-btn">' +
        '<button class="btn btn-default" id="pinglun" type="button">评论</button>' +
        '</span></div></div></div></div>';



    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
            " " + date.getHours() + seperator2 + date.getMinutes() +
            seperator2 + date.getSeconds();
        return currentdate;
    }

    $allUsername.on('click', 'li', function() {
        var html = '';

        var a = $(this).data('username');
        $ouya.show();
        $allTabsContent.hide();
        $.ajax({
            url: '/allphoto',
            data: {
                username: a,
            },
            type: 'get',
            dataType: 'json',
            success: function(data) {
                if (!data.error) {
                    $ouya.empty();
                    for (var i = 0; i < data.data.length; i++) {
                        var str = '<div class="ooo"><ul class="ul"><li class="llii">' +
                            '<img class="img" src="' + data.data[i].img + '">' +
                            '<div class="box"><div class="hua">' +
                            '<i class="glyphicon glyphicon-book"></i>' +
                            '<span>' + data.data[i].leng + '</span>' +
                            '</div><div class="hua1">' +
                            '<i class="glyphicon glyphicon-eye-open"></i>' +
                            '<span>18</span></div></div><div class="yonghu">' +
                            '<div class="yhimg"><img src="' + data.pic + '"></div>' +
                            '<span class="name bioa">相册名：</span>' +
                            '<span class="name1" data-username="' + data.data[i].username + '">' + data.data[i].album_name + '</span>' +
                            '<div class="dianzan"><i class="fa fa-thumbs-o-up dz " aria-hidden="true"></i>' +
                            '<span id="dianzannum">' + data.data[i].dianzan + '</span>' +
                            '</div><div class="liuyan"><i class="glyphicon glyphicon-comment ly"></i>' +
                            '</div></div></li></ul></div>';
                        html += str
                    }
                    html += str1;

                    $ouya.append(html);


                    $('.liuyan').on('click', function() {
                        Observer.trigger('liuyan', $(this))
                    });


                    $('#pinglun').on('click', function() {
                        Observer.trigger('pinglun')
                    });

                    var $dz = $('.dz');
                    var $name1 = $('.name1');
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
                        success: function(data) {
                            for (var i = 0; i < data.data.length; i++) {
                                $name1.each(function(ind, val) {
                                    if (data.data[i].album_name === $(val).html()) {
                                        $(val).siblings('.dianzan').find('.dz').addClass('like');
                                        $(val).siblings('.dianzan').find('.dz').addClass('fa-thumbs-up').removeClass('fa-thumbs-o-up')
                                    }
                                })
                            }
                        }
                    });


                    $dz.on('click', function(event) {
                        event.stopPropagation();
                        var biaoTi = $(this).parent().siblings('.name1').html();
                        var me = $(this);
                        var obj = {
                            dianusername: username,
                            uploadName: biaoTi
                        };
                        if (me.hasClass('like')) {
                            // console.log(111)
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
                                success: function(data) {
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
                                success: function(data) {
                                    if (!data.error) {}
                                }
                            })
                        }
                    });


                    var $img = $('.img');
                    var $ul = $('.ul');
                    var $yonghu = $('.yonghu');

                    var $llii = $('.llii');

                    $yonghu.on('click', function(event) {
                        event.stopPropagation();
                    });


                    $img.each(function() {
                        var srcc = this.src;
                        var arr = srcc.split('.');
                        if (arr.length === 1) {
                            $(this).parent().remove()
                        }
                    });



                    $llii.on('click', function() {
                        var str = '<div class="allP"><ul class="ull" id="showpicou">' +
                            '</ul></div>';
                        var html = '';

                        var $name1 = $('.name1');
                        var biaoTi = $(this).find('.name1').html();
                        var username = $name1.data('username');
                        var obj = {
                            album_name: biaoTi,
                            dianusername: username,
                        };
                        $ouya.html('');
                        $ouya.append(str);
                        $.ajax({
                            url: '/renderAllPic',
                            data: obj,
                            type: 'get',
                            dataType: 'json',
                            success: function(data) {
                                for (var i = 0; i < data.data.length; i++) {
                                    var arr = data.data[i];
                                    var str = '<li class="col-lg-2">' +
                                        '<img class="img" src="' + arr.src + '"><span>'+ arr.img_name +'</span></li>';

                                    html += str
                                }

                                var showpicou = $('#showpicou');
                                showpicou.append(html);



                                showpicou.on('click', 'li', function() {
                                    layui.use('layer', function() {
                                        var layer = layui.layer;
                                        layer.photos({
                                            photos: '#showpicou',
                                            anim: 3
                                        });
                                    });
                                });


                            }
                        })
                    })
                }
            }
        })
    })
});