(function () {
  $(document).ready(function () {
    setVal();
    bindEvent();
  });

  function setVal(){
    $('#jnum').val(localStorage.getItem('jnum')||'');
    $('#jperson').val(localStorage.getItem('jperson')||'');
    $('#farmer').val(localStorage.getItem('farmer')||'');
    $('#spider').val(localStorage.getItem('spider')||'');
  }

  function bindEvent() {
    $('#jperson').bind('blur', function () {
      var jperson = $('#jperson').val();
      localStorage.setItem('jperson', jperson);
    });

    $('#jnum').bind('blur', function () {
      var jnum = parseInt($('#jnum').val());
      localStorage.setItem('jnum', jnum);
    })

    $('#farmer').bind('blur', function () {
      var farmer = $('#farmer').val();
      localStorage.setItem('farmer', farmer);
    })

    $('#spider').bind('blur', function () {
      var spider = $('#spider').val();
      localStorage.setItem('spider', spider);
    })

    $('#stgame').bind('click', function () {
      var jnum = parseInt($('#jnum').val());
      var jperson = $('#jperson').val();
      var farmer = $('#farmer').val();
      var spider = $('#spider').val();
      var spderNum = parseInt(Math.random() * jnum) + 1;
      $('#spiderNum').text(spderNum);
      localStorage.setItem('jnum', jnum);
      localStorage.setItem('jperson', jperson);
      localStorage.setItem('farmer', farmer);
      localStorage.setItem('spider', spider);
      localStorage.setItem('spiderNum', spderNum);
    });
  }
})();