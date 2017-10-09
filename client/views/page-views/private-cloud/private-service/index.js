require('./style/index.less');

window.onload = window.onresize = window.onscroll=function(){
  if(G.mobile){
    $('.blueline').unbind('click');
    $('.blueline').hasClass('selected') && $('.blueline').removeClass('selected');
    $('.classify ul').css('display', 'none');
    $('.blueline').click(function(){
      $(this).toggleClass('selected');
      $(this).siblings('ul').slideToggle();
    });
  }
  if(!G.mobile){
    $('.classify ul').css('display', 'block');
    setInterval(function(){
      $('.animate-picture').addClass('hover');
    },3000);
  }
};
