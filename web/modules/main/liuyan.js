define(function (require, exports, module) {

    var Observer = require('modules/tools/tools').Observer;
    var uploadName;
    var dianusername;

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

    Observer.on('liuyan', function (that) {
        var $close = $('.close');
        var $boxou = $('.boxou');
        var $liuyanval = $('#liuyan');
        var $ul = $('#ul');



        $ul.html('');
        var hhhttt = '';
        var me = that;
        uploadName = that.siblings('.name1').html();
        dianusername = $('#nickName').html();


        $.ajax({
            url: '/liuyan',
            data: {
                uploadName: uploadName,
                dianusername: dianusername,
            },
            type: 'get',
            dataType: 'json',
            success: function (data) {
                for (var i = 0; i < data.data.length; i++) {
                    var str1 = '<li><div class="face_f">' +
                        '<img src="' + data.data[i].head_pic + '"></div>' +
                        '<a href="javascript:;">' + data.data[i].dianusername + ':' + '</a><span>' + data.data[i].value + '</span>' +
                        '<div class="ff"><p class="time">' + data.data[i].time + '</p>' +
                        '<span class="delete">删除</span></div></li>';
                    hhhttt = hhhttt + str1
                }
                $ul.html(hhhttt)
            }
        });
        $boxou.css({
            display: 'block'
        });

        $close.on('click', function () {
            $boxou.css({
                display: 'none'
            })
        })
    });




    Observer.on('pinglun', function () {
        // console.log(time);
        var $close = $('.close');
        var $boxou = $('.boxou');
        var $liuyanval = $('#liuyan');
        var $ul = $('#ul');
        var value = $liuyanval.val();
        var $headPic = $('#headPic');
        var $nickName = $('#nickName');
        var uploadName1 = uploadName;
        var dianusername1 = dianusername;
        var html = $ul.html();
        var time = getNowFormatDate();
        var obj = {
            value: value,
            uploadName: uploadName1,
            dianusername: dianusername1,
            time: time
        };
        var str = '<li><div class="face_f">' +
            '<img src="' + $headPic[0].src + '"></div>' +
            '<a href="javascript:;">' + $nickName.html() + ':' + '</a><span>' + value + '</span>' +
            '<div class="ff"><p class="time">' + getNowFormatDate() + '</p>' +
            '<span class="delete">删除</span></div></li>';
        html = str + html;
        $ul.html(html);
        $.ajax({
            url: '/pinglun',
            data: obj,
            type: 'post',
            dataType: 'json',
            success: function (data) {
                console.log(data)
            }
        })
    })
});