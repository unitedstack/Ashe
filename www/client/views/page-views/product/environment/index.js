require('./style/index.less');

window.onload = window.onresize = window.onscroll = function(){
  $('.bg-click').css('width','');
  $('.bg-click2').css('width','');
  $('.bg-click3').css('width','');
  $('.bg-framework').css({'width': $(window).width() + 15, 'height': $(window).height() + 450, 'top': $(window).scrollTop()});
  $('.bg-framework img').css({'width': ($(window).width()) * .63, 'margin-top': ($(window).height() - $(window).width() * .37) * .1, 'margin-left': ($(window).width() -15) * 0.17});
  $('.bg-framework2').css({'width': $(window).width() + 15, 'height': $(window).height() + 500, 'top': $(window).scrollTop()});
  $('.bg-framework2 img').css({'width': ($(window).width()) * .7, 'margin-top': ($(window).height() - $(window).width() * .1) * .2, 'margin-left': ($(window).width() -15) * 0.17});
  $('.bg-framework3').css({'width': $(window).width() + 15, 'height': $(window).height() + 500, 'top': $(window).scrollTop()});
  $('.bg-framework3 img').css({'width': ($(window).width()) * .7, 'margin-top': ($(window).height() - $(window).width() * .26) * .1, 'margin-left': ($(window).width() -15) * 0.17});
  $('.bg-click').click(function(e){
    e.stopPropagation();
    $('.volcano-global-header').css('display', 'none');
    $('.volcano-global-footer .totop').css('display', 'none');
    $('.bg-framework').css({'display': 'block'});
    $('body').css('overflow','hidden');
  });
  $('.bg-click2').click(function(e){
    e.stopPropagation();
    $('.volcano-global-header').css('display', 'none');
    $('.volcano-global-footer .totop').css('display', 'none');
    $('.bg-framework2').css({'display': 'block'});
    $('body').css('overflow','hidden');
  });
  $('.bg-click3').click(function(e){
    e.stopPropagation();
    $('.volcano-global-header').css('display', 'none');
    $('.volcano-global-footer .totop').css('display', 'none');
    $('.bg-framework3').css({'display': 'block'});
    $('body').css('overflow','hidden');
  });
  $(document).click(function(event){
    $('.volcano-global-header').css('display', 'block');
    $('.volcano-global-footer .totop').css('display', '');
    $('.bg-framework').css({'display': 'none'});
    $('.bg-framework2').css({'display': 'none'});
    $('.bg-framework3').css({'display': 'none'});
    $('body').css('overflow','');
  });
  if (G.mobile) {
    $('.bg-framework img').css({'width': ($(window).width()) * .83, 'margin-top': ($(window).height() - $(window).width() * .37 ) * .4, 'margin-left': ($(window).width() -15) * 0.09});
    $('.bg-framework2 img').css({'width': ($(window).width()) * .83, 'margin-top': ($(window).height() - $(window).width() * .37) * .45, 'margin-left': ($(window).width() -15) * 0.09});
    $('.bg-framework3 img').css({'width': ($(window).width()) * .83, 'margin-top': ($(window).height() - $(window).width() * .37) * .4, 'margin-left': ($(window).width() -15) * 0.09});
  }
};