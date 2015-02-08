(function () {
  'use strict';
  var lucky;
  var luckyTime = 1; //中奖个数
  $(document).ready(function () {
    lucky = new Lucky();
    bindEvent();
    //lucky.roll();
  });

  /**
   * 绑定按钮事件
   */
  function bindEvent() {

    //开始按钮事件
    $('#st').bind('click', function () {
      $('#st').addClass('indianred');
      $('#cl').removeClass('indianred');
      lucky.roll();
    });

    //结束按钮事件
    $('#cl').bind('click', function () {
      $('#cl').addClass('indianred');
      $('#st').removeClass('indianred');
      lucky.stopRoll();
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
        $('#itm-balls').hide();
      })
    }
  }

  function Lucky() {
    this.oriArr = ['张三', '李四', '王五', '陈六', '李七', '吴八']
  }

  function renderLuckyMan(num){
    var arr = [];
    for(var i = 0;i<num;i++){
      arr.push('<li class="lkman">XXX</li>');
    }
    $('#lkwrap').html(arr.join(''));
  }

  /**
   * 开始抽奖的方法
   */
  Lucky.prototype.roll = function () {
    var _me = this;
    _me.timer = setInterval(function () {
      var lms = $('.lkman');
      for(var j = 0 ; j< lms.length; j++){
        var i = parseInt(Math.random() * (_me.oriArr.length - 1));
        $(lms[j]).text(_me.oriArr[i]);
      }
      //$('#lktxt').text(_me.oriArr[i]);
    }, 100);
  }

  Lucky.prototype.stopRoll = function () {
    var _me = this;
    if (_me && _me.timer) {
      clearInterval(_me.timer);
    }
  }
})();