$(document).ready(function () {
    setHTML();

    // 为了在pc端更好的去调试
    onresize = function () {
        setHTML();
    }

    function setHTML() {
        // 基础值
        var baseVal = 100;
        // 设计稿的宽度
        var pageWidth = 375;
        // 要适配的屏幕的宽度?
        var screenWidth = document.querySelector("html").offsetWidth;
        // 要设置的fontsize
        var fontsize = screenWidth * baseVal / pageWidth;

        // 设置到html标签的中
        document.querySelector("html").style.fontSize = fontsize + "px";

    }
    $.ajax({
        dataType: "json",
        type: "get",
        url: "http://193.112.55.79:9090/api/getbrandtitle",
        success: function (res) {

            var data = res.result;
            console.log(data);
            //调用模板引擎渲染数据
            var context = {
                comments: data
            }
            //借助模板引擎的api
            var html = template('tmpl', context);
            //将渲染结果的html设置到默认元素的innerHTML中
            $("ul").html(html);
        },
        error: function () {
            console.log("请求数据失败");
        }
    });

    $(".back").on("click",function () {
        // console.log("哈哈哈");
        history.back();
    });
});