$(function () {

    function showOption(current, hidden1, hidden2, _self, else1, else2) {
        // 隐藏其他
        $(hidden1).hide();
        $(hidden2).hide();
        if ($(current).css('display') == "block") {
            //隐藏自己
            $(current).hide();
            // 箭头恢复
            $(_self).children('i').removeClass('fa-caret-up').addClass('fa-caret-down');

        } else {
            // 显示自己
            $(current).show();
            // 改变自己的箭头
            $(_self).children('i').removeClass('fa-caret-down').addClass('fa-caret-up');
            // 获取其他的箭头
            $(else1).children('i').removeClass('fa-caret-up').addClass('fa-caret-down');
            $(else2).children('i').removeClass('fa-caret-up').addClass('fa-caret-down');
        }
    }
    // 单击文本显示选项

    $('.showStore').on('click', function () {

        showOption('.store', '.area', '.price', '.showStore', '.showArea', '.showPrice');
    });
    $('.showArea').on('click', function () {
        _self = this;
        showOption('.area', '.store', '.price', '.showArea', '.showStore', '.showPrice')
    });
    $('.showPrice').on('click', function () {
        _self = this;
        showOption('.price', '.store', '.area', '.showPrice', '.showStore', '.showArea')
    })

    // 点击选项添加对号类// 排他
    function optionCheck() {
        $('.options ul li').on('tap', function () {
            // 给选中的选项添加类名,移除其他元素的类名
            $(this).addClass('check').siblings().removeClass('check');
            // 店铺id
            var shopId;
            // 区域id
            var areaId;
            // 显示选中的选项内容
            // 店铺
            // 获取选中的店铺
            $('.store ul li').each(function (index, element) {
                if ($(this).hasClass('check')) {
                    // 获取选中的内容
                    var content = $(element).html();
                    // 获取选中店铺的id
                    shopId = $(this).attr('data-shopid');
                    // 显示选中的内容
                    $('.showStore').children('span').html(content);
                    // 隐藏所有选项
                    $('.options').hide();
                }
            })

            // 地区
            $('.area ul li').each(function (index, element) {
                if ($(this).hasClass('check')) {
                    // 获取选中的内容
                    var content = $(element).html();
                    // 获取选中的地区id
                    areaId = $(this).attr('data-areaid');
                    var res = content.substr(0, 2);
                    // 显示选中的内容
                    $('.showArea').children('span').html(res);
                    // 隐藏所有选项
                    $('.options').hide();
                }
            })
            // 价格
            $('.price ul li').each(function (index, element) {
                if ($(this).hasClass('check')) {
                    // 获取选中的内容
                    var content = $(element).html();
                    // 显示选中的内容
                    $('.showPrice').children('span').html(content);
                    // 隐藏所有选项
                    $('.options').hide();
                }
            })
            // 发送请求获取商品数据
            getGoodsData_html(shopId, areaId);

            // 跳转到顶部
            $('.content').scrollTop(0);

        })
    }
    // 发送请求获取店铺数据
    $.get("http://193.112.55.79:9090/api/getgsshop", {},
        function (res) {
            var shopData = template('storeTemplate', {
                data: res.result
            });
            $('.store ul').html(shopData).children('li').eq(0).addClass('check');

            optionCheck();
        }, "json");
    // 发送请求获取区域数据
    $.get("http://193.112.55.79:9090/api/getgsshoparea", {},
        function (res) {

            var areaData = template('areaTemplate', {
                data: res.result
            });

            $('.area ul').html(areaData).children('li').eq(0).addClass('check');
            optionCheck();

        }, "json");

    // 发送请求获取商品数据
    function getGoodsData_html(shopid, areaid) {
        $.ajax({
            type: "get",
            url: "http://193.112.55.79:9090/api/getgsproduct",
            data: {
                "shopid": shopid,
                "areaid": areaid,
            },
            dataType: "json",
            success: function (res) {
                // 初始渲染10条数据
                var arr = res.result.slice(0, 10);

                var goodsData = template('goodsTemplate', {
                    "data": arr
                })
                $('.main').html(goodsData);
                // 隐藏加载中的图片
                $('.loading img').hide();
                // 显示加载更多
                $('.loading a').show();
            }
        });
    }
    // 点击加载发送请求
    function getGoodsData_append(shopid, areaid, currentProductAll) {
        currentProductAll = currentProductAll || 0;
        $.ajax({
            type: "get",
            url: "http://193.112.55.79:9090/api/getgsproduct",
            data: {
                "shopid": shopid,
                "areaid": areaid,
            },
            dataType: "json",
            success: function (res) {
                // 截取数据中的某一段

                var arr = res.result.slice(currentProductAll, (currentProductAll + 10));
                var goodsData = template('goodsTemplate', {
                    "data": arr
                })
                $('.main').append(goodsData);
                // 隐藏加载中的图片
                $('.loading img').hide();
                // 显示加载更多或全部加载完毕
                if (currentProductAll + 10 >= res.result.length) {
                    $('.loading a').show().html('全部加载完毕');
                } else {
                    $('.loading a').show();
                }

            }
        });
    }
    getGoodsData_html(0, 0);

    // 点击加载下一页,增加10条数据

    $('.loading').on("tap", function () {
        // 显示加载中的图片
        $('.loading img').show();
        // 隐藏加载更多
        $('.loading a').hide();
        // 获取当前页面的shopid, areaid
        var shopid;
        var areaid;
        $('.store ul li').each(function (index, element) {
            if ($(element).hasClass('check')) {
                shopid = $(element).attr('data-shopid');
            }
        })
        $('.area ul li').each(function (index, element) {
            if ($(element).hasClass('check')) {
                areaid = $(element).attr('data-areaid');
            }
        })
        // 获取当前页面商品的数量
        var currentProductAll = $('.main a').length;
        // 加载下一页
        getGoodsData_append(shopid, areaid, currentProductAll);

    })


    //显示加载图片
    $('.loading img').show();

})