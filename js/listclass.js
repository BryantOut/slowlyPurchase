//加载页面完成发起大分类JAXA请求
// $.get('http://193.112.55.79:9090/api/getcategorytitle','',function(res){
//     var htmlStr = template("temp",res);
//     $('.main_ul').html(htmlStr);
// },'json')

$.ajax({
    type: 'get',
    url: "http://193.112.55.79:9090/api/getcategorytitle",
    dataType: 'json',
    success: function (res) {
         var htmlStr = template("temp",res);
         $('.main_ul').html(htmlStr);
    },
})


//给大分类DIV创建委托点击事件
$('.main_ul').on('tap','.main_ul_li',function(){

   //当前li以外的所有li下面的小分类添加隐藏类
 $(this).siblings('.main_ul_li').next('.list_content').addClass('hide');

//使用切换来判断当前的小分类是否隐藏
$(this).next('.list_content').toggleClass('hide');

//图片切换，切换当前图标
$(this).find('.img1').toggleClass('hide');
$(this).find('.img2').toggleClass('hide');

//当前以外的大分类标题内的图标恢复原始状态
$(this).siblings('.main_ul_li').find('.img1').removeClass('hide');
$(this).siblings('.main_ul_li').find('.img2').addClass('hide');
var _this = $(this);

//获取当前大分类的ID
var titleid = $(this).find('input').val();
    
if(!$(this).next('.list_content').hasClass('hide')){

    $.ajax({
        type: 'get',
        url: "http://193.112.55.79:9090/api/getcategory",
        dataType: 'json',
        data:{'titleid':titleid},
        // beforeSend: function () {
        //     indexC = layer.open({
        //         type: 2,
        //         content: '数据加载中'
        //     });
        // },
        success: function (res) {
            // layer.close(indexC);
         var listHtml = template('listTemp',res);
        _this.next('.list_content').html(listHtml);
        },
    })
    
   
}


})

