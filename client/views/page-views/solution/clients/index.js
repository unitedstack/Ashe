require('./style/index.less');

window.onload = window.onresize = function(){
  if(G.mobile){
    $('.content-main > .inner > .part > .more').click(function(){
      $(this).siblings('.flow').children('li').addClass('selected');
      $(this).hide();
    });
  }
};