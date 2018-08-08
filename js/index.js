onload = function () {
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

    
    
  }
/* 分类渲染 */
$.ajax({
    dataType: "json",
    type: "get",
    url: "http://193.112.55.79:9090/api/getindexmenu",
    success: function (res) {
        var data = res.result;
        //调用模板引擎渲染数据
        var context = {
            comments: data
        }

        //借助模板引擎的api
        var html = template('tmpl', context);
        //将渲染结果的html设置到默认元素的innerHTML中
        $(".classify").html(html);

        $(".classify a").eq(7).on("click",function () {
            // console.log("张佩茵有男朋友的经理");
            $(".classify").css("height","240px");
        });

        var liObj = $(".classify a").eq(1).attr("href","youhui.html");
        
        // console.log(liObj.Child());
    }
})
/* 商品详情渲染 */
$.ajax({
    dataType: "json",
    type: "get",
    url: "http://193.112.55.79:9090/api/getmoneyctrl",
    success: function (res) {
        // console.log(res.result);

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


// $(".top").on("click",function () {
//     //返回屏幕头部
//     document.documentElement.scrollTop = 0;
// });

// $(".more").on("click",function () {
//     $(".addView").load("../toolActivity.html");
//     $(this).css("display","none");
//     return false;
// });



