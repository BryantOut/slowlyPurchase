if (location.search == "") {
    location.href = "./category.html";
}

//提取当前页ID
var searchStr = location.search;
var obj={};
var itemArr = searchStr.substr(1).split("&");
for(var i=0;i<itemArr.length;i++){
  var item = itemArr[i].split("=");
  obj[item[0]] = item[1];
}
var productid = obj.id;


$.get('http://193.112.55.79:9090/api/getproduct',{'productid':productid},function(res){
    //获取分类ID
    var categoryId = parseInt(res.result[0].categoryId);
    //发起AJAX请求，获取当前分类
    $.get('http://193.112.55.79:9090/api/getcategorybyid',{'categoryid':categoryId},function(res){
        //设置导航当前商品分类和链接
        $('.navigation a').eq(1).html(res.result[0].category);
        $('.navigation a').eq(1).attr('href', "Prolist.html?id=" + res.result[0].categoryId);
    },'json')

    //设置导航当前商品名称和链接
    $('.navigation a').eq(2).html((res.result[0].productName).slice(0,15));
    $('.navigation a').eq(2).attr('href', "Proarticle.html?id=" + res.result[0].productId);

    $('head').find('title').html((res.result[0].productName)+" - 慢慢买移动版");

},'json')


//发送AJAX请求，获取商品信息

$.ajax({
    type: 'get',
    url: "http://193.112.55.79:9090/api/getproduct",
    dataType: 'json',
    data:{'productid':productid},
    beforeSend: function () {
        indexC = layer.open({
            type: 2,
            content: '数据加载中'
        });
    },
    success: function (res) {
        layer.close(indexC);
        var particulars = template('particularsTemp',res)
        // console.log(res)
        $('.particulars').html(particulars);
    
        //tab
    $('.tab_title li').on('touchstart',function(){
        $(this).siblings().removeClass('pitch');
        $(this).addClass('pitch');
        $(this).find('img').css('display','block');
        $(this).siblings().find('img').css('display','none');
        var index = $(this).index();
        $('.tab_content li').eq(index).addClass('block');
        $('.tab_content li').eq(index).siblings().removeClass('block');
    })
    },
})


//发送AJAX请求，获取评论信息
// $.get('http://193.112.55.79:9090/api/getproductcom',{'productid':productid},function(res){
//     console.log(res);
//     var commentInfo = template('commentInfoTemp',res);
//     $('.commentInfo').html(commentInfo)
// },'json')

$.ajax({
    type: 'get',
    url: "http://193.112.55.79:9090/api/getproductcom",
    dataType: 'json',
    data:{'productid':productid},
    beforeSend: function () {
        indexC = layer.open({
            type: 2,
            content: '数据加载中'
        });
    },
    success: function (res) {
        layer.close(indexC);
        var commentInfo = template('commentInfoTemp',res);
        $('.commentInfo').html(commentInfo)
    }
})