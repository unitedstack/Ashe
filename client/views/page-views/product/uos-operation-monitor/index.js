require('./style/index.less');

window.onload = window.onresize = window.onscroll = function(){
  if(G.mobile){
    $('.framework > img').css('width','80%');
    $('.bg-framework').css({'width': $(window).width() + 15, 'height': $(window).height() + 500, 'top': $(window).scrollTop()});
    $('.bg-framework img').css({'width': ($(window).width()) * .9, 'margin-top': ($(window).height() - $(window).width() * .67) * .5, 'margin-left': ($(window).width() - 15) * .05});
    $('.framework > img').click(function(e){
      e.stopPropagation();
      $('.volcano-global-header').css('display', 'none');
      $('.volcano-global-footer .totop').css('display', 'none');
      $('.bg-framework').css({'display': 'block'});
      $('body').css('overflow','hidden');
    });
    $(document).click(function(event){
      $('.volcano-global-header').css('display', 'block');
      $('.volcano-global-footer .totop').css('display', '');
      $('.bg-framework').css({'display': 'none'});
      $('body').css('overflow','');
    });
  }
  if(!G.mobile){
    $('.volcano-global-header').css('display', '');
    $('.volcano-global-footer .totop').css('display', '');
    $('.bg-framework').css({'display': 'none'});
    $('body').css('overflow','');
    $('.framework > img').css('width','100%');
    $('.framework > img').unbind('click');
    $(document).unbind('click');
  }
};