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
        var pageWidth = 540;
        // 要适配的屏幕的宽度?
        var screenWidth = document.querySelector("html").offsetWidth;
        // 要设置的fontsize
        var fontsize = screenWidth * baseVal / pageWidth;

        // 设置到html标签的中
        document.querySelector("html").style.fontSize = fontsize + "px";

    }
}


$(function () {

    var myScroll = new IScroll('#wrapper', {
        scrollX: true
    });
    /* 轮播图 */
    var swiper = new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination',
        },
        loop: true,
        autoplay: true,
    });

    // 点击显示/隐藏分类
    $('.fa-list-ul').on('tap', function () {

        if ($('#all_classify').css('display') == 'none') {
            $('#all_classify').show();
        } else {
            $('#all_classify').hide();
        }
    })
    $('.taxon_none').on('tap', function () {
        $('#all_classify').hide();
    })
    // 请求分类数据
    $.get("http://193.112.55.79:9090/api/getbaicaijiatitle", {},
        function (res) {
            var taxon_html = template('taxon_template', {
                data: res.result
            })
            $('.taxon_placeholder').html(taxon_html);
            get_titleid();
        }, "json");
    // 请求商品数据
    // 获取titleid
    var titleid = 1;
    getgoods();

    function get_titleid() {
        $('.taxon_placeholder a').on('tap', function () {
            titleid = $(this).attr("titleid");

            $('#all_classify').hide();
            getgoods()
        });
    }

    function getgoods() {
        $.get("http://193.112.55.79:9090/api/getbaicaijiaproduct", {
                "titleid": titleid
            },
            function (res) {
                console.log(res)
                res.result.forEach(function (value, index, arr) {
                    value.productName = value.productName.substr(27);
                });


                for (var i = 0; i < res.result.length; i++) {
                    var startIndex = res.result[i].productPrice.indexOf("¥");
                    var endIndex = res.result[i].productPrice.indexOf("¥", startIndex + 1);
                    res.result[i].productPrice = res.result[i].productPrice.slice(startIndex + 6, endIndex - 5);
                }




                for (var i = 0; i < res.result.length; i++) {
                    var startIndex = res.result[i].productCouponRemain.indexOf("领");
                    var endIndex = res.result[i].productCouponRemain.indexOf("张", startIndex + 1);
                    res.result[i].productCouponRemain = res.result[i].productCouponRemain.slice(startIndex + 1, endIndex);
                }

                for (var i = 0; i < res.result.length; i++) {
                    var startIndex = res.result[i].productCoupon.indexOf("领");
                    var endIndex = res.result[i].productCoupon.indexOf("元");
                    res.result[i].productCoupon = res.result[i].productCoupon.slice(startIndex + 1, endIndex);
                }


                var goods_html = template('goods_template', {
                    data: res.result
                })
                $('.discounts ul').html(goods_html);
            },
            "json"
        );
    }

})