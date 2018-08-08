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
      var pageWidth = 414;
      // 要适配的屏幕的宽度?
      var screenWidth = document.querySelector("html").offsetWidth;
      // 要设置的fontsize
      var fontsize = screenWidth * baseVal / pageWidth;

      // 设置到html标签的中
      document.querySelector("html").style.fontSize = fontsize + "px";

    }
  }


//长按搜索
var btnSearch = document.querySelector('.search button');
itcast(btnSearch).awfi(function (callback){
  $('.tier').attr('style','display:block');
  $('.tier').append('<audio src="./js/tishi.mp3" controls autoplay></audio>');
})

//输入框获取焦时打开
$('.search input').on('touchstart',function(){
  $('.tier').attr('style','display:block');
  $('.tier').append('<audio src="./js/tishi.mp3" controls autoplay></audio>');
})

//输入框失去焦点
$('.foucSearch').on('blur',function(){
   if($('.foucSearch').val() != ""){
    $(this).append('<audio src="./js/shaohou.mp3" controls autoplay></audio>');
    $('.search input').val($('.foucSearch').val());
    $('.tier').attr('style','display:none');
   }
})

//点击关闭
$('.close').on('tap',function(){
  $('.tier').attr('style','display:none');
})

var timeid=setInterval(function(){
    var rand0 = Math.floor(Math.random()*(20 - 1 + 1) + 1);
    var rand1 = Math.floor(Math.random()*(40 - 1 + 1) + 1);
    var rand2 = Math.floor(Math.random()*(60 - 1 + 1) + 1);
    var rand3 = Math.floor(Math.random()*(80 - 1 + 1) + 1);
    var rand4 = Math.floor(Math.random()*(60 - 1 + 1) + 1);
    var rand5 = Math.floor(Math.random()*(80 - 1 + 1) + 1);
    var rand6 = Math.floor(Math.random()*(60 - 1 + 1) + 1);
    var rand7 = Math.floor(Math.random()*(80 - 1 + 1) + 1);
    var rand8 = Math.floor(Math.random()*(60 - 1 + 1) + 1);
    var rand9 = Math.floor(Math.random()*(80 - 1 + 1) + 1);
    var rand10 = Math.floor(Math.random()*(60 - 1 + 1) + 1);
    var rand11 = Math.floor(Math.random()*(80 - 1 + 1) + 1);
    var rand12 = Math.floor(Math.random()*(60 - 1 + 1) + 1);
    var rand13 = Math.floor(Math.random()*(80 - 1 + 1) + 1);
    var rand14 = Math.floor(Math.random()*(60 - 1 + 1) + 1);
    var rand15 = Math.floor(Math.random()*(80 - 1 + 1) + 1);
    var rand16 = Math.floor(Math.random()*(60 - 1 + 1) + 1);
    var rand17 = Math.floor(Math.random()*(80 - 1 + 1) + 1);
    var rand18 = Math.floor(Math.random()*(60 - 1 + 1) + 1);
    var rand19 = Math.floor(Math.random()*(80 - 1 + 1) + 1);
    var rand20 = Math.floor(Math.random()*(60 - 1 + 1) + 1);
    var rand21 = Math.floor(Math.random()*(80 - 1 + 1) + 1);
    var rand22 = Math.floor(Math.random()*(60 - 1 + 1) + 1);
    var rand23 = Math.floor(Math.random()*(60 - 1 + 1) + 1);
    var rand24 = Math.floor(Math.random()*(40 - 1 + 1) + 1);
    var rand25 = Math.floor(Math.random()*(20 - 1 + 1) + 1);

    var rand02 = Math.floor(Math.random()*(3 - 2 + 1) + 2);
    var rand03 = Math.floor(Math.random()*(4 - 3 + 1) + 3);
    var rand04 = Math.floor(Math.random()*(5 - 3 + 1) + 3);
    $('.rhythmDown i').eq(1).attr('style',"width:2px;transform:scale(1,"+rand02+")");
    $('.rhythmDown i').eq(2).attr('style',"width:3px;transform:scale(1,"+rand03+")");
    $('.rhythmDown i').eq(3).attr('style',"width:3px;transform:scale(1,"+rand04+")");
    $('.rhythmUp i').eq(1).attr('style',"width:2px;transform:scale(1,"+rand02+")");
    $('.rhythmUp i').eq(2).attr('style',"width:3px;transform:scale(1,"+rand03+")");
    $('.rhythmUp i').eq(3).attr('style',"width:3px;transform:scale(1,"+rand04+")");



    $('.rhythmDown i').eq(4).attr('style',"width:3px;transform:scale(1,"+rand0+")");
    $('.rhythmDown i').eq(5).attr('style',"width:3px;transform:scale(1,"+rand1+")");
    $('.rhythmDown i').eq(6).attr('style',"width:3px;transform:scale(1,"+rand2+")");
    $('.rhythmDown i').eq(7).attr('style',"width:3px;transform:scale(1,"+rand3+")");
    $('.rhythmDown i').eq(8).attr('style',"width:3px;transform:scale(1,"+rand4+")");
    $('.rhythmDown i').eq(9).attr('style',"width:3px;transform:scale(1,"+rand5+")");
    $('.rhythmDown i').eq(10).attr('style',"width:3px;transform:scale(1,"+rand6+")");
    $('.rhythmDown i').eq(11).attr('style',"width:3px;transform:scale(1,"+rand7+")");
    $('.rhythmDown i').eq(12).attr('style',"width:3px;transform:scale(1,"+rand8+")");
    $('.rhythmDown i').eq(13).attr('style',"width:3px;transform:scale(1,"+rand9+")");
    $('.rhythmDown i').eq(14).attr('style',"width:3px;transform:scale(1,"+rand10+")");
    $('.rhythmDown i').eq(15).attr('style',"width:3px;transform:scale(1,"+rand11+")");
    $('.rhythmDown i').eq(16).attr('style',"width:3px;transform:scale(1,"+rand12+")");
    $('.rhythmDown i').eq(17).attr('style',"width:3px;transform:scale(1,"+rand13+")");
    $('.rhythmDown i').eq(18).attr('style',"width:3px;transform:scale(1,"+rand14+")");
    $('.rhythmDown i').eq(19).attr('style',"width:3px;transform:scale(1,"+rand15+")");
    $('.rhythmDown i').eq(20).attr('style',"width:3px;transform:scale(1,"+rand16+")");
    $('.rhythmDown i').eq(21).attr('style',"width:3px;transform:scale(1,"+rand17+")");
    $('.rhythmDown i').eq(22).attr('style',"width:3px;transform:scale(1,"+rand18+")");
    $('.rhythmDown i').eq(23).attr('style',"width:3px;transform:scale(1,"+rand19+")");
    $('.rhythmDown i').eq(24).attr('style',"width:3px;transform:scale(1,"+rand20+")");
    $('.rhythmDown i').eq(25).attr('style',"width:3px;transform:scale(1,"+rand21+")");
    $('.rhythmDown i').eq(26).attr('style',"width:3px;transform:scale(1,"+rand22+")");
    $('.rhythmDown i').eq(27).attr('style',"width:3px;transform:scale(1,"+rand23+")");
    $('.rhythmDown i').eq(28).attr('style',"width:3px;transform:scale(1,"+rand24+")");
    $('.rhythmDown i').eq(29).attr('style',"wid3h:3px;transform:scale(1,"+rand25+")");

 
    var rand002 = Math.floor(Math.random()*(3 - 2 + 1) + 2);
    var rand003 = Math.floor(Math.random()*(4 - 3 + 1) + 3);
    var rand004 = Math.floor(Math.random()*(5 - 3 + 1) + 3);
    $('.rhythmDown i').eq(30).attr('style',"width:3px;transform:scale(1,"+rand004+")");
    $('.rhythmDown i').eq(31).attr('style',"width:3px;transform:scale(1,"+rand003+")");
    $('.rhythmDown i').eq(32).attr('style',"width:2px;transform:scale(1,"+rand002+")");    
    $('.rhythmUp i').eq(30).attr('style',"width:3px;transform:scale(1,"+rand004+")");
    $('.rhythmUp i').eq(31).attr('style',"width:3px;transform:scale(1,"+rand003+")");
    $('.rhythmUp i').eq(32).attr('style',"width:2px;transform:scale(1,"+rand004+")");    
},200)
