require('./style/index.less');
require('../../../static/common/js/pagination/index');

window.onload = window.onresize = function(){

  
  if (document.body.clientWidth >= 1010) {
    $('.pagination').css('display', 'block');
  }
};
