if (location.search == "") {
    location.href = "./listclass.html";
}

//获取当前链接后缀数据
var searchStr = location.search;

//获取ID
var obj = {};
var itemArr = searchStr.substr(1).split("&");
for (var i = 0; i < itemArr.length; i++) {
    var item = itemArr[i].split("=");
    obj[item[0]] = item[1];
}

var categoryid = obj.id;
var index = 1;
var pages;

//发送ajax获取导航分类名、
$.get('http://193.112.55.79:9090/api/getcategorybyid', {
    'categoryid': categoryid
}, function (res) {
    //    console.log(res);
    $('.navigation a').eq(2).html(res.result[0].category);
    $('.navigation a').eq(2).attr('href', "Prolist.html?id=" + res.result[0].categoryId);

    $('head').find('title').html((res.result[0].category) + " - 慢慢买移动版");

}, 'json')


//初次发送商品列表ajax请求，请求当前分类ID总条数，并初次渲染
$.ajax({
    type: 'get',
    url: "http://193.112.55.79:9090/api/getproductlist",
    dataType: 'json',
    data: {
        'categoryid': categoryid
    },
    beforeSend: function () {
        indexC = layer.open({
            type: 2,
            content: '数据加载中'
        });
        console.log(123)
    },
    success: function (res) {
        layer.close(indexC);
        ajaxData(res);

        pages = Math.ceil(res.totalCount / res.pagesize);

        //DIV下拉菜单
        var html = "";
        for (var i = 0; i < pages; i++) {
            html += '<li><i>' + (i + 1) + '</i> / ' + pages + '</li>'
        }
        $('.page_ul').html(html);


        //点击显示DIV下拉菜单
        $('.page').on('touchstart', function () {
            $('.page_ul').toggleClass('hide');
            // $(this).toggleClass('border');
            return false;
        })


        //页面码数初始化
        $('.page').find('i').eq(0).html(1);
        $('.page').find('i').eq(1).html(pages);

        //鼠标任意地方，关闭页码DIV下拉菜单
        $(document.body).on('touchstart', function () {
            $('.page_ul').addClass('hide');
            //  $('.page').addClass('border');
        })

        //创建DIV下拉菜单 li点击事件
        $('.page_ul').on('touchstart', 'li', function () {
            index = parseInt($(this).find('i').html());
            $('.page').find('i').eq(0).html(index);
            $('.page').find('i').eq(1).html(pages);

            $.ajax({
                type: 'get',
                url: "http://193.112.55.79:9090/api/getproductlist",
                dataType: 'json',
                data: {
                    'categoryid': categoryid,
                    'pageid': index
                },
                beforeSend: function () {
                    indexC = layer.open({
                        type: 2,
                        content: '数据加载中'
                    });
                },
                success: function (res) {
                    layer.close(indexC);
                    ajaxData(res);
                },
            })

        })

        //动态生成select下拉菜单数据
        var selectHtml = "";
        for (var i = 0; i < pages; i++) {
            selectHtml += '<option value="' + (i + 1) + '">' + (i + 1) + ' / ' + pages + '</option>'
        }
        $('#selectPage').html(selectHtml);

    }
})





//点击select菜单发起请求
$('#selectPage').on('change', function () {
    var selectPageid = $(this).val();
    $.ajax({
        type: 'get',
        url: "http://193.112.55.79:9090/api/getproductlist",
        data: {
            'categoryid': categoryid,
            'pageid': selectPageid
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
            ajaxData(res);
        }
    })

})


//点击下一页,DIV下拉菜单发送AJAX请求
//点击下一页,select下拉菜单发送AJAX请求
$('.next').on('touchstart', function () {
    var selectNull = $('#selectPage').prop('select', true).val();
    if (selectNull != "undefined") {
        index = parseInt($('#selectPage').prop('select', true).val());
    }
    if (index >= pages) {
        // alert('最后一页');
        return;
    }
    index++;
    $('.page').find('i').eq(0).html(index);
    $('#selectPage').val(index);


    $.ajax({
        type: 'get',
        url: "http://193.112.55.79:9090/api/getproductlist",
        data: {
            'categoryid': categoryid,
            'pageid': index
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
            ajaxData(res);
        }
    })
})

//点击上一页,DIV下拉菜单发送AJAX请求
//点击上一页,select下拉菜单发送AJAX请求
$('.previous').on('touchstart', function () {
    var selectNull = $('#selectPage').prop('select', true).val();
    if (selectNull != "undefined") {
        index = parseInt($('#selectPage').prop('select', true).val());
    }
    if (index == 1) {
        // alert('目前是第一页');
        return;
    }
    index--;
    $('.page').find('i').eq(0).html(index);
    $('#selectPage').val(index);

    $.ajax({
        type: 'get',
        url: "http://193.112.55.79:9090/api/getproductlist",
        data: {
            'categoryid': categoryid,
            'pageid': index
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
            ajaxData(res);
        },
    })

})


//点击切换图片进行菜单切换
$('.switchover').on('touchstart', function () {
    $('.page').toggleClass('hide');
    $('#selectPage').toggleClass('hide');
})




function ajaxData(res) {
    res.result.forEach(function (ele, index, arr) {
        ele.productQuote = parseInt(ele.productQuote.substr(3));
    })
    res.result.forEach(function (ele, index, arr) {
        ele.productCom = parseInt(ele.productCom.substr(3));
    })
    var listHtml = template('listTemp', res);
    $('.product_list').html(listHtml)
}