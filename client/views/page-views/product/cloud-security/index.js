require('./style/index.less');

window.onload = window.onresize = window.onscroll = function(){
  if (!G.mobile) {
    $('.function-item').click(function() {
      $(this).css({'background':'linear-gradient(54deg, #5A64FA 0%, #28C7EA 100%)','border-radius': '4px 0 0 4px'});
      $(this).children('.line').css('background', '#ffffff');
      $(this).children('.function-brief').css('color', '#ffffff');
      $(this).parents('.center-function').css({'width': '1170px'});
      $(this).next('.function-intro').css('display', 'block').siblings('.function-intro').css('display', 'none');
      if($(this).next('.function-intro').css('display', 'block')) {
        $(this).children('.normal').css('display', 'none');
        $(this).children('.hover').css('display', 'block');
      }
      $(this).siblings('.function-item').css('background', '#ffffff');
      $(this).siblings('.function-item').children('.hover').css('display', 'none');
      $(this).siblings('.function-item').children('.normal').css('display', 'block');
      $(this).siblings('.function-item').children('.line').css('background', 'linear-gradient(90deg, #2FBAEC 0%, #4A83F5 100%)');
      $(this).siblings('.function-item').children('.function-brief').css('color', '#333333');
      $(this).siblings('.function-item').mouseenter(function() {
        $(this).css({'background':'linear-gradient(54deg, #5A64FA 0%, #28C7EA 100%)','border-radius': '4px 0 0 4px'});
        $(this).children('.line').css('background', '#ffffff');
        $(this).children('.function-brief').css('color', '#ffffff');
        $(this).children('.normal').css('display', 'none');
        $(this).children('.hover').css('display', 'block');
      });
      $(this).siblings('.function-item').mouseleave(function() {
        $(this).siblings('.function-item').css('background', '#ffffff');
        $(this).siblings('.function-item').children('.hover').css('display', 'none');
        $(this).siblings('.function-item').children('.normal').css('display', 'block');
        $(this).siblings('.function-item').children('.line').css('background', 'linear-gradient(90deg, #2FBAEC 0%, #4A83F5 100%)');
        $(this).siblings('.function-item').children('.function-brief').css('color', '#333333');
      });
    });
  }
  if (G.pad) {
    $(this).parents('.center-function').css({'width': '980px'});
  }
};