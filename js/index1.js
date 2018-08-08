/* 商品详情渲染 */
$.ajax({
    dataType: "json",
    type: "get",
    url: "http://193.112.55.79:9090/api/getmoneyctrl",
    success: function (res) {
        console.log(res.result);

        var data = res.result;
        //调用模板引擎渲染数据
        var context = {
            comments: data
        }
        //借助模板引擎的api
        var html = template('tmpl1', context);
        //将渲染结果的html设置到默认元素的innerHTML中
        $(".contnetUl").html(html);
    }
})