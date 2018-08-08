
$(function () {
    $.get("http://193.112.55.79:9090/api/getinlanddiscount", "", function (res) {
    console.log(res);
    var res = res.result;
    // console.log(res1[0].productImg);
    for (var i = 0; i < res.length; i++) {
        // var indexlength = res[i].productImg.length - 1;
        var startIndex=res[i].productImg.indexOf("\"");
        var endIndex=res[i].productImg.indexOf("\"",startIndex+1);
        var ssrrcc= res[i].productImg.slice(startIndex+1,endIndex);
        console.log(ssrrcc)
        res[i].productImg = ssrrcc;
        //console.log(res[i].productImg);
        var productImg = res[i].productImg;

    }

    // res.result.forEach(function (value, index, arr) {
    //     var indexlength = value.productImg.length - 1;
    //     value.productImg = value.productImg.slice(5,indexlength);
    // });
    console.log(res)
    var html = template('discounts', {
        data: res
    });
    //console.log(html);

    $("#uls").html(html);

    $("#uls img.lazy").lazyload({
        effect: "fadeIn"
    });
}, "json");

   
});