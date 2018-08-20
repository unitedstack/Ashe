require('./style/index.less');

window.onload = function(){
  if (!G.mobile) {
    $('.function-item').click(function() {
      if ($(this).hasClass('hover')) {
        $(this).removeClass('hover');
        $(this).parents('.center-function').css({'width': '845px'});
        $(this).next('.function-intro').css('display', 'none');
      } else {
        $(this).addClass('hover');
        $(this).parents('.center-function').css({'width': '1170px'});
        $(this).next('.function-intro').css('display', 'block').siblings('.function-intro').css('display', 'none');
      }

      $(this).siblings('.function-item').removeClass('hover');
    });
  }
  if (G.pad) {
    $(this).parents('.center-function').css({'width': '980px'});
  }
};