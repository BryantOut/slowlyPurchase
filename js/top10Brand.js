$(document).ready(function () {
    $.ajax({
        dataType: "json",
        type: "get",
        url: "http://193.112.55.79:9090/api/getbrandtitle",
        success: function (res) {
            
            var data = res.result;
            console.log(data);
            //调用模板引擎渲染数据
            var context = {comments: data}
            //借助模板引擎的api
            var html = template('tmpl', context);
            //将渲染结果的html设置到默认元素的innerHTML中
            $("ul").html(html);
        },
        error: function () {
            console.log("请求数据失败");
        }
    });
});