
var num = 0;
var index;
var texiao;
$.ajax({
    url: 'http://193.112.55.79:9090/api/getmoneyctrl',
    type: 'get',
    dataType: 'json',
    beforeSend: function () {
      texiao = layer.open({
            type: 2
            , content: '玩命加载中'
        });
    },
    success: function (res) {
        //关闭提示框
        layer.close(texiao);
        //拼接模板引擎
        var htmls = template('goods', { data: res.result });
        $('#tips').html(htmls);
        //总页数
        num = Math.ceil(res.totalCount / 10);
        var strhtml = "";
        for (i = 0; i < num; i++) {
            strhtml += '<option value="' + i+ '">' + (i + 1) + '/' + num + '</option>';
        }
        $('#selectid').html(strhtml);
        //上一页点击事件
        $('.prey').on("touchstart", function () {
            index = $('#selectid').prop('selected', true).val();
            console.log(index);
            
            index--;
            console.log(index);
            if (index == -1) {
                layer.open({
                    content: '已经是第一页了'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                  }); 
                return;
            }
            // 发动ajax
            $.ajax({
                url: 'http://193.112.55.79:9090/api/getmoneyctrl',
                type: 'get',
                dataType: 'json',
                data: { "pageid": index },
                beforeSend: function () {
                    texiao = layer.open({
                        type: 2
                        , content: '玩命加载中'
                    });
                },
                success: function (res) {
                      //关闭提示框
                    layer.close(texiao);
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
            if (index > num-1) {
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
                    texiao = layer.open({
                        type: 2
                        , content: '玩命加载中'
                    });
                },
                success: function (res) {
                    //关闭提示框
                    layer.close(texiao);
                    var htmls = template('goods', { data: res.result });
                    $('#tips').html(htmls);
                    $('#selectid').val(index);
                }
            })
        })

    }
})
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
        texiao = layer.open({
            type: 2
            , content: '玩命加载中'
        });
    },
    success:function(res){
        //关闭提示框
        layer.close(texiao);
        console.log(123)
        var htmls = template('goods', { data: res.result });
        $('#tips').html(htmls);
    }
})
});
console.log($("#selectid"));

