var searchStr = location.search;
console.log(searchStr)
var id=searchStr.substring(4) ;
console.log(id);
$.get("http://193.112.55.79:9090/api/getmoneyctrlproduct",{"productid":id},function(res){
    console.log(res);
    var html=template("goods",{data:res.result});
    $('#introduce').html(html);
},"json");

$("header span").on("click",function () {

    window.history.go(-1);
});