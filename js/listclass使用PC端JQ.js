// <!-- 大分类渲染模版引擎 -->
//     <li class="main_ul_li">
//             <input type="hidden" value="{{value.titleId}}">
//             <div class="list_title">
//                 <h2 class="title">{{value.title}}</h2>
//                 <img src="./images/arrow1.gif" alt="" class="img1">
//                 <img src="./images/arrow2.gif" alt="" class="img2 hide">
//             </div>
//             <ul class="list_content clearfix hide">
 
//             </ul>
//         </li>

//加载页面完成发起大分类JAXA请求
$.get('http://193.112.55.79:9090/api/getcategorytitle','',function(res){
    var htmlStr = template("temp",res);
    $('.main_ul').html(htmlStr);
},'json')

//给大分类DIV创建委托点击事件
$('.main_ul').on('touchstart','.main_ul_li',function(){
    //当前li以外的所有li下面的小分类添加隐藏类
    $(this).siblings('.main_ul_li').find('.list_content').addClass('hide');

    //使用切换来判断当前的小分类是否隐藏
    $(this).find('.list_content').toggleClass('hide');

    //图片切换，切换当前图标
    $(this).find('.img1').toggleClass('hide');
    $(this).find('.img2').toggleClass('hide');

    //当前以外的大分类标题内的图标恢复原始状态
    $(this).siblings('.main_ul_li').find('.img1').removeClass('hide');
    $(this).siblings('.main_ul_li').find('.img2').addClass('hide');

    var _this = $(this);
    
    //获取当前大分类的ID
    var titleid = $(this).find('input').val();
    $.get('http://193.112.55.79:9090/api/getcategory',{'titleid':titleid},function(res){
        // console.log(res);
        var listHtml = template('listTemp',res);
        // console.log(listHtml)
        _this.find('.list_content').html(listHtml);
        
    },'json')

})
