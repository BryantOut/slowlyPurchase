$(function () {
    //获取获取url中"?"中传入的参数值
    function GetRequest() {
        var url = location.search; //获取url中"?"符后的字串 
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }
    var Request = new Object();
    Request = GetRequest();
    // var 参数1, 参数2, 参数3, 参数N;
    // 参数1 = Request['参数1'];
    // 参数2 = Request['参数2'];
    // 参数3 = Request['参数3'];
    // 参数N = Request['参数N']; 
    //获取当前id
    var id = Request['id'];
    //生成产品展示的ajax,需要传入id
    $.ajax({
        url: "http://193.112.55.79:9090/api/getcouponproduct",
        data: {
            "couponid": id
        },
        dataType: "json",
        success: function (result) {
            console.log(id);
            console.log(result);
            var lihtml = template("liTemplate", result);
            $(".cate-all").html(lihtml);
            var bannerhtml = template("bannerTemplate", result);
            $(".carousel-inner").html(bannerhtml);
        }
    })
    //设置轮播图用手划时的,显示上一张或下一张
    var startX = 0,
        endX = 0;
    $(".carousel-inner")[0].addEventListener("touchstart", function (e) {
        startX = e.targetTouches[0].clientX
        console.log(111)
    })
    $(".carousel-inner")[0].addEventListener("touchend", function (e) {
        endX = e.changedTouches[0].clientX;
        console.log(222)
        if (endX - startX > 0) {
            console.log(333)
            $('.carousel').carousel('prev')
        } else if (endX - startX < 0) {
            $('.carousel').carousel('next')
            console.log(444)
        }
    })
})