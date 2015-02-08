(function(){
'use strict';
  var lucky;
  $(document).ready(function () {
    lucky = new Lucky();
    bindEvent();
    //lucky.roll();
  });

  /**
   * 绑定按钮事件
   */
  function bindEvent(){

      $('#st').bind('click',function(){
        $('#st').addClass('indianred');
        $('#cl').removeClass('indianred');
        lucky.roll();
      });

    $('#cl').bind('click',function(){
      $('#cl').addClass('indianred');
      $('#st').removeClass('indianred');
      lucky.stopRoll();
    });
  }

  function Lucky(){
    this.oriArr = ['张三','李四','王五','陈六','李七','吴八']
  }

  /**
   * 开始抽奖的方法
   */
  Lucky.prototype.roll = function(){
    var _me = this;
    _me.timer = setInterval(function(){
      var i = parseInt(Math.random()*(_me.oriArr.length-1))
      $('#lktxt').text(_me.oriArr[i]);
    },100);
  }

  Lucky.prototype.stopRoll = function(){
    var _me = this;
    if(_me && _me.timer){
      clearInterval(_me.timer);
    }
  }
})();