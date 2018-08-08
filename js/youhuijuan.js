$(function(){
    $.ajax({
        url:"http://193.112.55.79:9090/api/getcoupon",
        dataType:"json",
        success:function(result){
            console.log(result)
            var lihtml = template("liTemplate",result);
            $(".cate ul").html(lihtml);
        }
    })
    $('.dropdown-toggle').dropdown()
})