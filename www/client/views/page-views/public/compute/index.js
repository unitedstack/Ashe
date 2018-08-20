require('./style/index.less');

window.onload = window.onresize = function(){
  if (!G.mobile) {
    $('.feature-item-two').unbind('click');
    $('.feature-item-two').click(function() {
      $('.block-two').fadeIn(1000, function(){
        $('.block-two').css({'z-index':4});
        $('.block-two').stop(true,true).animate({'width':'51%','left': '40%','top': 49});//1
        $('.block-one').css({'z-index':1});
        $('.block-one').stop(true,true).animate({'width':'34.4%','left': '70%','top': 107});//4
        $('.block-three').stop(true,true).animate({'width':'46.5%','left': '50%','top': 65});//2
        $('.block-three').css({'z-index':3});
        $('.block-four').stop(true,true).animate({'width':'37.8%','left': '60%','top': 96});//3
        $('.block-four').css({'z-index':2});
      });
    });
    $('.feature-item-three').unbind('click');
    $('.feature-item-three').click(function() {
      $('.block-three').fadeIn(1000, function(){
        $(this).css({'z-index':4});
        $(this).stop(true,true).animate({'width':'51%','left': '40%','top': 49});
        $('.block-two').css({'z-index':1});
        $('.block-two').stop(true,true).animate({'width':'34.4%','left': '70%','top': 107});
        $('.block-four').stop(true,true).animate({'width':'46.5%','left': '50%','top': 65});
        $('.block-four').css({'z-index':3});
        $('.block-one').stop(true,true).animate({'width':'37.8%','left': '60%','top': 96});
        $('.block-one').css({'z-index':2});
      });
    });
    $('.feature-item-four').unbind('click');
    $('.feature-item-four').click(function() {
      $('.block-four').fadeIn(1000, function(){
        $(this).css({'z-index':4});
        $(this).stop(true,true).animate({'width':'51%','left': '40%','top': 49});
        $('.block-three').css({'z-index':1});
        $('.block-three').stop(true,true).animate({'width':'34.4%','left': '70%','top': 107});
        $('.block-one').stop(true,true).animate({'width':'46.5%','left': '50%','top': 65});
        $('.block-one').css({'z-index':3});
        $('.block-two').stop(true,true).animate({'width':'37.8%','left': '60%','top': 96});
        $('.block-two').css({'z-index':2});
      });
    });
    $('.feature-item-one').unbind('click');
    $('.feature-item-one').click(function() {
      $('.block-one').fadeIn(1000, function(){
        $('.block-one').css({'z-index':4});
        $('.block-one').stop(true,true).animate({'width':'51%','left': '40%','top': 49});
        $('.block-four').css({'z-index':1});
        $('.block-four').stop(true,true).animate({'width':'34.4%','left': '70%','top': 107});
        $('.block-two').stop(true,true).animate({'width':'46.5%','left': '50%','top': 65});
        $('.block-two').css({'z-index':3});
        $('.block-three').stop(true,true).animate({'width':'37.8%','left': '60%','top': 96});
        $('.block-three').css({'z-index':2});
      });
    });

    // 2个的
    $('.feature-item-two2').unbind('click');
    $('.feature-item-two2').click(function() {
      $('.block-two2').fadeIn(1000, function(){
        $('.block-two2').css({'z-index':4});
        $('.block-two2').stop(true,true).animate({'width':'95.5%','left': '40%','top': 76});
        $('.block-one2').css({'z-index':1});
        $('.block-one2').stop(true,true).animate({'width':'87%','left': '50%','top': 95});
      });
    });
    $('.feature-item-one2').unbind('click');
    $('.feature-item-one2').click(function() {
      $('.block-one2').fadeIn(1000, function(){
        $('.block-one2').css({'z-index':4});
        $('.block-one2').stop(true,true).animate({'width':'95.5%','left': '40%','top': 76});
        $('.block-two2').stop(true,true).animate({'width':'87%','left': '50%','top': 95});
        $('.block-two2').css({'z-index':1});
      });
    });
  }
  if (G.mobile) {
    $('.mobile-top').css('height', $('.block-mobile-one').height()* 0.9);
    $('.feature-item-one').unbind('click');
    $('.feature-item-one').click(function() {
      $('.block-mobile-one').fadeIn(500);
      $('.block-mobile-two').fadeOut(500);
      $('.block-mobile-four').fadeOut(500);
      $('.block-mobile-three').fadeOut(500);
    });
    $('.feature-item-three').unbind('click');
    $('.feature-item-three').click(function() {
      $('.block-mobile-three').fadeIn(500);
      $('.block-mobile-one').fadeOut(500);
      $('.block-mobile-two').fadeOut(500);
      $('.block-mobile-four').fadeOut(500);
    });
    $('.feature-item-two').unbind('click');
    $('.feature-item-two').click(function() {
      $('.block-mobile-two').fadeIn(500);
      $('.block-mobile-one').fadeOut(500);
      $('.block-mobile-three').fadeOut(500);
      $('.block-mobile-four').fadeOut(500);
    });
    $('.feature-item-four').unbind('click');
    $('.feature-item-four').click(function() {
      $('.block-mobile-four').fadeIn(500);
      $('.block-mobile-one').fadeOut(500);
      $('.block-mobile-three').fadeOut(500);
      $('.block-mobile-two').fadeOut(500);
    });
    // 2个的
    $('.feature-left2').css('height', $('.block-one2').height()* 0.9);
    $('.feature-item-one2').unbind('click');
    $('.feature-item-one2').click(function() {
      $('.block-one2').fadeIn(500);
      $('.block-two2').fadeOut(500);
    });
    $('.feature-item-two2').unbind('click');
    $('.feature-item-two2').click(function() {
      $('.block-two2').fadeIn(500);
      $('.block-one2').fadeOut(500);
    });
  }

  // if (!G.mobile) {
  //   $('.feature-item-two-section').unbind('click');
  //   $('.feature-item-two-section').click(function() {
  //     $('.block-two-section').fadeIn(1000, function(){
  //       $('.block-two-section').css({'z-index':4});
  //       $('.block-two-section').stop(true,true).animate({'width':'51%','left': '40%','top': 49});//1
  //       $('.block-one-section').css({'z-index':1});
  //       $('.block-one-section').stop(true,true).animate({'width':'34.4%','left': '70%','top': 107});//4
  //       $('.block-three-section').stop(true,true).animate({'width':'46.5%','left': '50%','top': 65});//2
  //       $('.block-three-section').css({'z-index':3});
  //       $('.block-four-section').stop(true,true).animate({'width':'37.8%','left': '60%','top': 96});//3
  //       $('.block-four-section').css({'z-index':2});
  //     });
  //   });
  //   $('.feature-item-three-section').unbind('click');
  //   $('.feature-item-three-section').click(function() {
  //     $('.block-three-section').fadeIn(1000, function(){
  //       $(this).css({'z-index':4});
  //       $(this).stop(true,true).animate({'width':'51%','left': '40%','top': 49});
  //       $('.block-two-section').css({'z-index':1});
  //       $('.block-two-section').stop(true,true).animate({'width':'34.4%','left': '70%','top': 107});
  //       $('.block-four-section').stop(true,true).animate({'width':'46.5%','left': '50%','top': 65});
  //       $('.block-four-section').css({'z-index':3});
  //       $('.block-one-section').stop(true,true).animate({'width':'37.8%','left': '60%','top': 96});
  //       $('.block-one-section').css({'z-index':2});
  //     });
  //   });
  //   $('.feature-item-four-section').unbind('click');
  //   $('.feature-item-four-section').click(function() {
  //     $('.block-four-section').fadeIn(1000, function(){
  //       $(this).css({'z-index':4});
  //       $(this).stop(true,true).animate({'width':'51%','left': '40%','top': 49});
  //       $('.block-three-section').css({'z-index':1});
  //       $('.block-three-section').stop(true,true).animate({'width':'34.4%','left': '70%','top': 107});
  //       $('.block-one-section').stop(true,true).animate({'width':'46.5%','left': '50%','top': 65});
  //       $('.block-one-section').css({'z-index':3});
  //       $('.block-two-section').stop(true,true).animate({'width':'37.8%','left': '60%','top': 96});
  //       $('.block-two-section').css({'z-index':2});
  //     });
  //   });
  //   $('.feature-item-one-section').unbind('click');
  //   $('.feature-item-one-section').click(function() {
  //     $('.block-one-section').fadeIn(1000, function(){
  //       $('.block-one-section').css({'z-index':4});
  //       $('.block-one-section').stop(true,true).animate({'width':'51%','left': '40%','top': 49});
  //       $('.block-four-section').css({'z-index':1});
  //       $('.block-four-section').stop(true,true).animate({'width':'34.4%','left': '70%','top': 107});
  //       $('.block-two-section').stop(true,true).animate({'width':'46.5%','left': '50%','top': 65});
  //       $('.block-two-section').css({'z-index':3});
  //       $('.block-three-section').stop(true,true).animate({'width':'37.8%','left': '60%','top': 96});
  //       $('.block-three-section').css({'z-index':2});
  //     });
  //   });
  // }
  // if (G.mobile) {
  //   $('.mobile-top-section').css('height', $('.block-mobile-one').height()* 0.9);
  //   $('.feature-item-one-section').unbind('click');
  //   $('.feature-item-one-section').click(function() {
  //     $('.block-mobile-one-section').fadeIn(500);
  //     $('.block-mobile-two-section').fadeOut(500);
  //     $('.block-mobile-four-section').fadeOut(500);
  //     $('.block-mobile-three-section').fadeOut(500);
  //   });
  //   $('.feature-item-three-section').unbind('click');
  //   $('.feature-item-three-section').click(function() {
  //     $('.block-mobile-three-section').fadeIn(500);
  //     $('.block-mobile-one-section').fadeOut(500);
  //     $('.block-mobile-two-section').fadeOut(500);
  //     $('.block-mobile-four-section').fadeOut(500);
  //   });
  //   $('.feature-item-two-section').unbind('click');
  //   $('.feature-item-two-section').click(function() {
  //     $('.block-mobile-two-section').fadeIn(500);
  //     $('.block-mobile-one-section').fadeOut(500);
  //     $('.block-mobile-three-section').fadeOut(500);
  //     $('.block-mobile-four-section').fadeOut(500);
  //   });
  //   $('.feature-item-four-section').unbind('click');
  //   $('.feature-item-four-section').click(function() {
  //     $('.block-mobile-four-section').fadeIn(500);
  //     $('.block-mobile-one-section').fadeOut(500);
  //     $('.block-mobile-three-section').fadeOut(500);
  //     $('.block-mobile-two-section').fadeOut(500);
  //   });
  // }
};
