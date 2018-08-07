
var num = 0;
var index;
$.ajax({
    url: 'http://193.112.55.79:9090/api/getmoneyctrl',
    type: 'get',
    dataType: 'json',
    beforeSend: function () {
        index = layer.open({
            type: 2
            , content: '玩命加载中'
        });
    },
    success: function (res) {
        //关闭提示框
        layer.close(index);
        //拼接模板引擎
        var htmls = template('goods', { data: res.result });
        $('#tips').html(htmls);
        //总页数
        num = Math.floor(res.totalCount / 10);
        var strhtml = "";
        for (i = 0; i < num; i++) {
            strhtml += '<option value="' + (i + 1) + '">' + (i + 1) + '/' + num + '</option>';
        }
        $('#selectid').html(strhtml);
        //上一页点击事件
        $('.prey').on("touchstart", function () {
            index = $('#selectid').prop('selected', true).val();
            console.log(index);
            if (index == 1) {
                layer.open({
                    content: '已经是第一页了'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                  }); 
                return;
            }
            index--;
            // 发动ajax
            $.ajax({
                url: 'http://193.112.55.79:9090/api/getmoneyctrl',
                type: 'get',
                dataType: 'json',
                data: { "pageid": index },
                beforeSend: function () {
                    index = layer.open({
                        type: 2
                        , content: '玩命加载中'
                    });
                },
                success: function (res) {
                      //关闭提示框
                    layer.close(index);
                    console.log(index);
                    var html3 = template('goods', { data: res.result });
                    console.log(html3)
                    $('#tips').html(html3);
                    $('#selectid').val(index);
                }
            })
        })
        // 下一页点击事件
        $(".next").on("touchstart", function () {
            index = $('#selectid').prop('selected', true).val();
            index++;
            console.log(num);
            if (index > num) {
                layer.open({
                    content: '已经是最后一页了'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                  });                
                return;
                // console.log(12);
            }
            $.ajax({
                url: 'http://193.112.55.79:9090/api/getmoneyctrl',
                type: 'get',
                dataType: 'json',
                data: { "pageid": index },
                beforeSend: function () {
                    index = layer.open({
                        type: 2
                        , content: '玩命加载中'
                    });
                },
                success: function (res) {
                    //关闭提示框
                    layer.close(index);
                    var htmls = template('goods', { data: res.result });
                    $('#tips').html(htmls);
                    $('#selectid').val(index);
                }
            })
        })

    }
})
// $.get("http://193.112.55.79:9090/api/getmoneyctrl", { "pageid": index }, function (res) {
//     var htmls = template('goods', { data: res.result });
//     $('#tips').html(htmls);
// }, "json")
// $('#selectid').val(index);

//下一页
// $(".next").on("touchstart", function () {
//     var index = $('#selectid').prop('selected', true).val();
//     index++;
//     console.log(num);

//     if (index > num) {
//         alert('已经是最后一个了');
//         return;
//         // console.log(12);
//     }
//     $.get("http://193.112.55.79:9090/api/getmoneyctrl", { "pageid": index }, function (res) {
//         var htmls = template('goods', { data: res.result });
//         $('#tips').html(htmls);
//         $('#selectid').val(index);
//         num = Math.floor(res.totalCount / 10);
//     }, "json");
// });


// console.log(1)
// $.get("http://193.112.55.79:9090/api/getmoneyctrl",
//     "", function (res) {
//         console.log(res);
//         console.log(1);
//         var htmls = template('goods', { data: res.result });
//         // console.log(htmls);
//         $('#tips').html(htmls);
//         num = Math.floor(res.totalCount / 10);
//         var strhtml = "";
//         for (i = 0; i < num; i++) {

//             strhtml += '<option value="' + (i + 1) + '">' + (i + 1) + '/' + num + '</option>';
//         }
//         $('#selectid').html(strhtml);

//         $('.prey').on("touchstart", function () {
//             var index = $('#selectid').prop('selected', true).val();
//             if (index == 1) {
//                 alert('第一页');
//                 return;
//             }
//             index--;
//             $.get("http://193.112.55.79:9090/api/getmoneyctrl", { "pageid": index }, function (res) {
//                 var htmls = template('goods', { data: res.result });
//                 $('#tips').html(htmls);
//             }, "json")
//             $('#selectid').val(index);
//         })
//         //下一页
//         $(".next").on("touchstart", function () {
//             var index = $('#selectid').prop('selected', true).val();
//             index++;
//             console.log(num);

//             if (index > num) {
//                 alert('已经是最后一个了');
//                 return;
//                 // console.log(12);
//             }
//             $.get("http://193.112.55.79:9090/api/getmoneyctrl", { "pageid": index }, function (res) {
//                 var htmls = template('goods', { data: res.result });
//                 $('#tips').html(htmls);
//                 $('#selectid').val(index);
//                 num = Math.floor(res.totalCount / 10);
//             }, "json");
//         });

//         console.log(num)
//     }, "json");
//上一页



//选择页码
// $.ajax({
//     url:'http://193.112.55.79:9090/api/getmoneyctrl',
//     type:'get',
//     data:{"pageid": pageid },
//     dataType:'json',
//     success:function(res){
//         var htmls = template('goods', { data: res.result });
//         $('#tips').html(htmls);
//     }
// })
$("#selectid").on('change', function () {
    var pageid = $(this).val();
    // $.get("http://193.112.55.79:9090/api/getmoneyctrl", { "pageid": pageid }, function (res) {
    //     var htmls = template('goods', { data: res.result });
    //     $('#tips').html(htmls);
    // }, "json")
    $.ajax({
    url:'http://193.112.55.79:9090/api/getmoneyctrl',
    type:'get',
    dataType:'json',
    data:{"pageid": pageid },
    beforeSend: function () {
        index = layer.open({
            type: 2
            , content: '玩命加载中'
        });
    },
    success:function(res){
        //关闭提示框
        layer.close(index);
        console.log(123)
        var htmls = template('goods', { data: res.result });
        $('#tips').html(htmls);
    }
})
});
console.log($("#selectid"));