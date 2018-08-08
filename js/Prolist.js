if (location.search == "") {
    location.href = "./category.html";
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
var pages;
var index = 2;


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
    },
    success: function (res) {
        layer.close(indexC);
        ajaxData(res);
        
        //总条数
        var totalCount = res.totalCount;

       $(window).scroll(function(){

                //获取屏幕的高度
                var windowHeight = $(window).height();
                //获取每一页数据的总高度
                var pageHeight = ($('.product_list li').height())*((index-1)*10);
                console.log(pageHeight)
                //计算出每一页的滚出去的距离
                var rollOut = pageHeight - windowHeight;

          if($(window).scrollTop() >= rollOut){

            if((index*10)<=totalCount){
                $.ajax({
                    type: 'get',
                    url: "http://193.112.55.79:9090/api/getproductlist",
                    dataType: 'json',
                    data:{'categoryid':categoryid,'pageid':index},
                    beforeSend: function () {
                        // indexC = layer.open({
                        //     type: 2,
                        //     content: '数据加载中'
                        // });
                        $('.loading').css('display','block')
                    },
                    success: function (res) {
                        $('.loading').css('display','none')
                        // layer.close(indexC);
                    res.result.forEach(function (ele, index, arr) {
                        ele.productQuote = parseInt(ele.productQuote.substr(3));
                    })
                    res.result.forEach(function (ele, index, arr) {
                        ele.productCom = parseInt(ele.productCom.substr(3));
                    })
                    var listHtml = template('listTemp', res);
                    $('.product_list').append(listHtml)

                    $('.main').append('<audio src="./js/loader.mp3" controls autoplay></audio>')
                    }
                })  
            }     

            index+=1;
          }
          
       })

    }
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