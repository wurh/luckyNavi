(function () {
    'use strict';
    var lucky,
        luckyTime = 1, //中奖个数
        startTimes = 0, //开始次数
        isStop = true,
        isStart = false,
        narr,
        garr,
        aarr;

    /**
     * 页面JS开始执行
     */
    $(document).ready(function () {
        if (!localStorage.getItem('narr')) {
            narr = playres.narr;
            localStorage.setItem('narr', narr);
        }
//    if (!localStorage.getItem('garr')) {
//      garr = memberLists.garr;
//      localStorage.setItem('garr', garr);
//    }
        lucky = new Lucky();
        bindEvent();
    });


    function getAllarr(narr) {
        var arr = [];
        for (var i = 0; i < narr.length; i++) {
            if (narr[i] === '') {
                break;
            }
            arr.push(narr[i]);
        }
//    for (var j = 0; j < garr.length; j++) {
//      if(garr[i] === ''){
//        break;
//      }
//      arr.push(garr[j]);
//    }
//    for (var k = 0; k < narr.length; k++) {
//      if(narr[i] === ''){
//        break;
//      }
//      arr.push(narr[k]);
//    }
        return arr;
    }


    function resultRender() {
        var team5 = localStorage.getItem('narr').split(',');
        var team1 = localStorage.getItem('luckyteam_1').split('-');
        var team2 = localStorage.getItem('luckyteam_2').split('-');
        var team3 = localStorage.getItem('luckyteam_3').split('-');
        var team4 = localStorage.getItem('luckyteam_4').split('-');
        var team1Str = renderTeam(team1,'A Team:').join('');
        var team2Str = renderTeam(team2,'B Team:').join('');
        var team3Str = renderTeam(team3,'C Team:').join('');
        var team4Str = renderTeam(team4,'D Team:').join('');
        var team5Str = renderTeam(team5,'E Team:').join('');
        $('body').html('');
        $('body').append(team1Str);
        $('body').append(team2Str);
        $('body').append(team3Str);
        $('body').append(team4Str);
        $('body').append(team5Str);
       // $('#lkwrap').html('');
//        $('#lkwrap').append(team1Str);
//        $('#lkwrap').append(team2Str);
//        $('#lkwrap').append(team3Str);
//        $('#lkwrap').append(team4Str);
//        $('#lkwrap').append(team5Str);
       // $('#lkwrap').show();
    }

    function renderTeam(num,name){
        var arr = [];
        if(name.indexOf('E') > -1){
            arr.push('<div class="lkct lastone">')
        }else{
            arr.push('<div class="lkct">')
        }
        arr.push('<ul class="txt" style="-webkit-transform-origin: 0px 0px 0px; opacity: 1; -webkit-transform: scale(1, 1);">');
        arr.push('<div>'+name+'</div>');
        arr.push('<ul class="txt">');
        for (var i = 0; i < num.length; i++) {
            arr.push('<li class="lkman">'+num[i]+'</li>');
        }
        arr.push('</ul>');
        arr.push('</ul>');
        arr.push('</div>');
        return arr;
    }

    /**
     * 渲染抽奖人数
     * @param num
     */
    function renderLuckyMan(num) {
        var arr = [];
        for (var i = 0; i < num; i++) {
            arr.push('<li class="lkman">XXX</li>');
        }
        $('#lkwrap').html(arr.join(''));
    }

    /**
     * 绑定按钮事件
     */
    function bindEvent() {

        //开始按钮事件
        $('#st').bind('click', function () {
            if (!isStart) {
                isStart = true;
                isStop = false;
            } else {
                return;
            }
            aarr = initAarr();
            if (aarr.length === 0) {
                alert('抽奖活动已结束！');
                $('#st').removeClass('indianred');
                $('#cl').removeClass('indianred');
                return;
            }
            if (aarr.length > luckyTime) {
                startTimes++;
                $('#st').addClass('indianred');
                $('#cl').removeClass('indianred');
                lucky.roll();
            } else {
                alert('没有足够的人满足剩下的奖品！');
                $('#st').removeClass('indianred');
            }
        });

        //结束按钮事件
        $('#cl').bind('click', function () {
            if (!isStop) {
                isStop = true;
                isStart = false;
            } else {
                return;
            }
            aarr = initAarr();
            if (aarr.length === 0) {
                alert('抽奖活动已结束！');
                $('#st').removeClass('indianred');
                $('#cl').removeClass('indianred');
            }
            if (luckyTime > aarr.length) {
                return;
            }
            $('#cl').addClass('indianred');
            $('#st').removeClass('indianred');
            lucky.stopRoll();
        });

        /**
         * 结果按钮页面输出
         */
        $('#rl').bind('click', function () {
            $('#lkwrap').hide();
            resultRender();
        });

        $('#rs').bind('click', function () {
           localStorage.clear();
            alert('清除成功!');
            if (!localStorage.getItem('narr')) {
                narr = playres.narr;
                localStorage.setItem('narr', narr);
            }
        });

        //选择中奖数按钮事件
        $('#itmbtn').bind('click', function () {
            $('#itm-balls').show();
        });

        var balls = $('.bls-btn');
        for (var i = 0; i < balls.length; i++) {
            $(balls[i]).bind('click', function (e) {
                $('#itmbtn').html(e.currentTarget.innerHTML);
                renderLuckyMan(parseInt(e.currentTarget.innerHTML));
                luckyTime = e.currentTarget.innerHTML;
                $('#itm-balls').hide();
            })
        }
    }


    function getLuckyGuys(num) {
        var luckyTeam = [];
        for (var i = 0; i < num; i++) {
            var luckyOne = aarr[parseInt(Math.random() * (aarr.length - 1))];
            luckyTeam.push(luckyOne);
            if (narr.indexOf(luckyOne) > -1) {
                narr.splice($.inArray(luckyOne, narr), 1);
                localStorage.setItem('narr', narr);
            }
//      if (garr.indexOf(luckyOne) > -1) {
//        garr.splice($.inArray(luckyOne, garr), 1);
//        localStorage.setItem('garr', garr);
//      }
            aarr = getAllarr(narr, garr);
        }
        localStorage.setItem('luckyteam_' + startTimes, luckyTeam.join('-'));
        setLuckyTeam(luckyTeam);
    }

    /**
     * 设置中奖名单到页面
     * @param arr
     */
    function setLuckyTeam(arr) {
        var lms = $('.lkman');
        for (var j = 0; j < lms.length; j++) {
            $(lms[j]).text(arr[j]);
        }
    }

    function initAarr() {
        narr = localStorage.getItem('narr').split(',');
        // garr = localStorage.getItem('garr').split(',');
        aarr = getAllarr(narr);
        return aarr;
    }

    /**
     * 幸运儿对象
     * @constructor
     */
    function Lucky() {

    }

    /**
     * 开始抽奖的方法
     */
    Lucky.prototype.roll = function () {
        var _me = this;
        _me.timer = setInterval(function () {
            var lms = $('.lkman');
            for (var j = 0; j < lms.length; j++) {
                var i = parseInt(Math.random() * (aarr.length - 1));
                $(lms[j]).text(aarr[i]);
            }
            //$('#lktxt').text(_me.oriArr[i]);
        }, 100);
    }

    Lucky.prototype.stopRoll = function () {
        var _me = this;
        if (_me && _me.timer) {
            clearInterval(_me.timer);
        }
        getLuckyGuys(luckyTime);
    }

})();