onload = function () {
    var myScroll;

    myScroll = new IScroll('#wrapper', {
        eventPassthrough: true,
        scrollX: true,
        scrollY: false,
        preventDefault: false
    });

    // function loaded() {

    // }

    setHTML();

    // 为了在pc端更好的去调试
    onresize = function () {
        setHTML();
    }

    function setHTML() {
        // 基础值
        var baseVal = 100;
        // 设计稿的宽度
        var pageWidth = 640;
        // 要适配的屏幕的宽度?
        var screenWidth = document.querySelector("html").offsetWidth;
        // 要设置的fontsize
        var fontsize = screenWidth * baseVal / pageWidth;

        // 设置到html标签的中
        document.querySelector("html").style.fontSize = fontsize + "px";
    }
    //加载页面请求默认数据
    var indexC;
    $.ajax({
        type: 'get',
        url: "http://193.112.55.79:9090/api/getbaicaijiaproduct",
        data: {
            'titleid': 0
        },
        dataType: 'json',
        beforeSend: function () {
            indexC = layer.open({
                type: 2,
                content: '数据加载中'
            });
        },
        success: function (res) {
            layer.close(indexC);
            listData(res)
        }
    })

    //加载页面默认请求分类数据
    $.ajax({
        type: 'get',
        url: 'http://193.112.55.79:9090/api/getbaicaijiatitle',
        dataType: 'json',
        beforeSend: function () {
            indexC = layer.open({
                type: 2,
                content: '数据加载中'
            });
        },
        success: function (res) {
            layer.close(indexC);
            var navHtml = template('navTpme', res);
            $('#wrapperUL').html(navHtml);
            $('#wrapperUL li').eq(0).attr('style', 'color:#e53e40;border-bottom: 2px solid #e8151b;')
        },
    })

    //点击分类请求列表数据
    $('#wrapperUL').on('tap', 'li', function (e) {
        var titleid = $(this).attr('data-id');
        $('#wrapperUL').find('li').siblings().attr('style', '');
        myScroll.scrollToElement(e.target,500,-10)
        $.ajax({
            type: "get",
            url: "http://193.112.55.79:9090/api/getbaicaijiaproduct",
            data: {
                'titleid': titleid
            },
            dataType: 'json',
            beforeSend: function () {
                indexC = layer.open({
                    type: 2,
                    content: '数据加载中'
                });
            },
            success: function (res) {
                layer.close(indexC);
                listData(res)
            }
        })
    })

    function listData(res) {
        var strHtml = template('boxTemp', res);
        $('.content').html(strHtml);
        // loaded();
    }
}