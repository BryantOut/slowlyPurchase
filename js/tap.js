// itcast(div).tap(function (callback) {
//     console.log(callback);
// })



function itcast(dom) {
    var obj = {
        awfi: function (callback) {
            //获取当前时间
            var startTime;
            //获取当前坐标
            var startX, startY;

            dom.addEventListener('touchstart', function (e) {
                if (e.touches.length > 1) {
                    return;
                }
                startTime = Date.now();

                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            })

            dom.addEventListener('touchend', function (e) {
                var touchendTime = Date.now();
                if (touchendTime - startTime < 300) {
                    return;
                }
                endX = e.changedTouches[0].clientX;
                endY = e.changedTouches[0].clientY;
                if (endX - startX > 5 || endY - startY > 5) {
                    return;
                }
                callback && callback(e);
            })


        }


    };

    return obj;
}
