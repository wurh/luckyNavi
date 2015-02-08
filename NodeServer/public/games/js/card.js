(function () {
  $(document).ready(function () {
    startup()
  });

  function startup() {
    setInterval(function () {
      var gameinfo = getGameInfo();
      renderPlayer(gameinfo.perArr);
    }, 1000);
  }

  function getGameInfo() {
    var perArr = [];
    if (localStorage.getItem('jperson')) {
      var arr = localStorage.getItem('jperson').split('-');
      if(localStorage.getItem('spiderNum') && localStorage.getItem('spider') && localStorage.getItem('farmer')){
        for (var i = 0; i < arr.length; i++) {
          if (localStorage.getItem('spiderNum') == (i + 1)) {
            perArr.push({
              name: arr[i],
              card: localStorage.getItem('spider') || ''
            });
          } else {
            perArr.push({
              name: arr[i],
              card: localStorage.getItem('farmer') || ''
            });
          }
        }
      }else{
        for (var i = 0; i < arr.length; i++) {
          perArr.push({
            name: arr[i],
            card: ''
          });
        }
      }

    }

    return {
      jnum: localStorage.getItem('jnum') || '',
      farmer: localStorage.getItem('farmer') || '',
      spider: localStorage.getItem('spider') || '',
      perArr: perArr,
      spiderNum: localStorage.getItem('spiderNum') || ''
    }

  }

  function renderPlayer(parr) {
    var arr = [];
    for (var i = 0; i < parr.length; i++) {
      arr.push('<li>');
      arr.push('<div>' + parr[i].name + '</div>');
      arr.push('<div>' + parr[i].card + '</div>');
      arr.push('</li>');
    }
    $('#cards').html(arr.join(''));
  }

})();