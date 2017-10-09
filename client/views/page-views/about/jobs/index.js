require('./style/index.less');

var SlideMenu = require('../../../../static/common/js/slide_menu/index');
var slideMenu = new SlideMenu(document.getElementById('fixedBar'), document.getElementById('jobsContent'));

slideMenu.init();

window.onload = window.onresize = function(){
  // mobile
  if(G.mobile) {
    $('.single .title span').hasClass('open') && $('.single .title span').removeClass('open');
    $('.single > .detail').css('display', 'none');
    $('.single > .title').unbind('click');
    $('.single > .title').each(function(_index, _ele){
      $(this).click(function() {
        $(this).next().slideToggle();
        $(this).children().toggleClass('open');
      });
    });
  }

  if (!G.mobile) {
    $('.single > .detail').css('display', 'block');
  }
};
