require('./style/index.less');

window.onload = window.onresize = function(){
  if (!G.mobile) {
    $('.feature-item-two').unbind('click');
    $('.feature-item-two').click(function() {
      $('.block-two').fadeIn(1000, function(){
        $('.block-two').css({'z-index':4});
        $('.block-two').stop(true,true).animate({'width':'95.5%','left': '40%','top': 76});//1
        $('.block-one').css({'z-index':1});
        $('.block-one').stop(true,true).animate({'width':'87%','left': '50%','top': 95});//4
      });
    });
    $('.feature-item-one').unbind('click');
    $('.feature-item-one').click(function() {
      $('.block-one').fadeIn(1000, function(){
        $('.block-one').css({'z-index':4});
        $('.block-one').stop(true,true).animate({'width':'95.5%','left': '40%','top': 76});
        $('.block-two').stop(true,true).animate({'width':'87%','left': '50%','top': 95});
        $('.block-two').css({'z-index':1});
      });
    });
  }
  if (G.mobile) {
    $('.feature-left').css('height', $('.block-one').height()* 0.9);
    $('.feature-item-one').unbind('click');
    $('.feature-item-one').click(function() {
      $('.block-one').fadeIn(500);
      $('.block-two').fadeOut(500);
    });
    $('.feature-item-two').unbind('click');
    $('.feature-item-two').click(function() {
      $('.block-two').fadeIn(500);
      $('.block-one').fadeOut(500);
    });
  }
};
