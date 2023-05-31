/**
 * Created by web-bear on 15-3-20.
 * 请关注微信订阅号获取更多:web-bear
 */
Zepto(function($){
    var screenWid = $(window).width();
    if (screenWid > 480) {
        screenWid = 480;
    }
    var screenHeight = $(window).height();
    $("#main").css("height",screenHeight);
    $("#main").css("width",screenWid);
    var itemCount = $('.item').length;
    $('.item').on("swipeUp",function(event){
        var id = $(event.currentTarget).attr("id");
        var limit = "item_" + (itemCount - 1);
        if (limit == id) {
            $(".item").fadeIn(550);
        } else {
            $("#" + id).fadeOut(550);
        }
        if (id == "item_3") {
            if (!flag) {
                readerBegin();
            }
        }
    });
    $('.item').on("click",function(event){
        var id = $(event.currentTarget).attr("id");
        var limit = "item_" + (itemCount - 1);
        if (limit == id) {
            $(".item").fadeIn(550);
        } else {
            $("#" + id).fadeOut(550);
        }
        if (id == "item_3") {
            if (!flag) {
                readerBegin();
            }
        }
    });



    // text
    var flag = false;
    function readerBegin() {
        var str = ["春天就像来捉奸的老婆",
            "没有一点点防备就出现了",
            "又像一场春梦",
            "第二天又了然无痕",
            "抓紧时间，赶紧远行",
            "春风已来，不必等待!"
        ];
        var readX = 0;
        var readY = 0;

        var read = setInterval(function() {
            flag = true;
            var rx = readX;
            var tex = readFunc(readX,readY);
            if (tex) {
                $("#springTip_" + rx).append(tex + "\n");
            }
        },200);
        function readFunc(x,y) {
            if (str[x] && (str[x].length == y)) {
                readX = x + 1;
                readY = 0;
            } else if (str[x]) {
                readX = x;
                readY = y + 1;
                return str[x].substr(y,1);
            } else {
                clearInterval(read);
            }
        }
    }
    document.body.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, false);
    window.onload = function() {
        $(".item").css("display","block");
        setTimeout(function() {
            $("#canvas").css("display","block");
        },2000);
    }
});
