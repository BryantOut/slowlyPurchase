var searchStr = location.search;
console.log(searchStr)
var id = searchStr.substring(4);
console.log(id);
$.get("http://193.112.55.79:9090/api/getmoneyctrlproduct", { "productid": id }, function (res) {
    console.log(res);
    console.log(res.result.productComment);

    var html = template("goods", { data: res.result });
    $('#introduce').html(html);
    //发表评论
    $('#ctl00_ContentBody_Button1').on('touchstart', function () {
        var comment = $('#ctl00_ContentBody_txt_nr').val();
        //判断输入的内容是否为空
        if(!$.trim(comment)){
            layer.open({
                content: '输入的内容不能为空'
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
              });   
            return;
        }
        console.log(comment);
        console.log(123);
        var time = CurentTime();
        $('.list>ul').prepend('<li class="ui - border - b"><div class= "userimg" ><img src="http://bbs.manmanbuy.com/images/face/none.gif"></div><div class="con"><div class="name clearfix"><div class="username">未登录的用户</div><div class="time">'+time+'</div></div><div class="content">'+comment+'</div></div></li > ');
        $('.list>ul>li:first').hide().slideDown(700);
        $('#ctl00_ContentBody_txt_nr').val('');
});
}, "json");

// 时间函数
function CurentTime() {
    var now = new Date();

    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日

    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();           //秒

    var clock = year + "-";

    if (month < 10)
        clock += "0";

    clock += month + "-";

    if (day < 10)
        clock += "0";

    clock += day + " ";

    if (hh < 10)
        clock += "0";

    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm + ":";

    if (ss < 10) clock += '0';
    clock += ss;
    return (clock);
}

$(".back").on("click",function () {
    // console.log("哈哈哈");
    history.back();
});