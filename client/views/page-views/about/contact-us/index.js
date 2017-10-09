require('./style/index.less');

window.onload = window.onresize = function(){
  $('.wraper .right .tab li').unbind('click');
  $('.wraper .right .tab li').click(function() {
    $(this).parents('.right').toggleClass('selected');
  });
};