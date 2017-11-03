require('./style/index.less');

$(function() {

  var referTimer;
  var bannerTimer;
  var currentIndex = 1;
  var $doc = $(document);
  var $carousel = $('.carousel').eq(0);
  var $bannerWrapper = $('.banner-wrapper');
  var $bannerContentWrapper = $('.banner-content-wrapper');
  var $ctrlPoints = $('.control-bar .point');
  var $areaList = $('.area-list li');
  var animating = false;

  $areaList.on('click', function(evt) {
    var index = $(evt.target).data('index');
    if(index === 1) {
      // 
    }
  });

  $(window).on('resize', resizeHandler);
  $(window).on('scroll', scrollHandler);
  $ctrlPoints.on('click', pointClickHandler);
  $bannerContentWrapper.on('mouseenter', function() {
    if(bannerTimer) {
      clearInterval(bannerTimer);
      bannerTimer = null;
    }
  });
  $bannerContentWrapper.on('mouseleave', bannerPlay);

  setBannerSize();
  bannerPlay();

  function resizeHandler() {
    if(animating) {
      $carousel.stop(false, true);
    }
    setBannerSize();
  }

  function bannerPlay() {
    if(bannerTimer) {
      return;
    }
    bannerTimer = setInterval(function() {
      var newIndex = currentIndex + 1;
      if(newIndex == 4) {
        newIndex = 1;
      }
      $ctrlPoints.eq(newIndex - 1).click();
      currentIndex = newIndex;
    }, 2500);
  }

  function pointClickHandler(evt) {
    clearInterval(bannerTimer);
    bannerTimer = null;

    if(animating) {
      $carousel.stop(false, true);
    }
    animating = true;
    var $target = $(evt.target);
    var index = $target.data('index');
    if(index === currentIndex) {
      return;
    }
    
    $ctrlPoints.removeClass('active');
    $target.addClass('active');
    bannerRotate(index);
  }

  function bannerRotate(index) {
    var docWidth = $doc.width();
    var newLeft;
    if(index === 1) {
      newLeft = 0;
    } else if(index === 2) {
      newLeft = -1 * docWidth;
    } else {
      newLeft = -2 * docWidth;
    }

    $carousel.animate({
      left: newLeft
    }, 800, function() {
      if(!bannerTimer) {
        bannerPlay();
      }
      animating = false;
      currentIndex = index;
    });
  }

  function setBannerSize() {
    var docWidth = $doc.width();
    var winH = $(window).height();
    $('.pc-banner').height(winH);
    $carousel.width(5 * docWidth);
    $bannerWrapper.width(docWidth);
  }

  function typingAnimation() {
    console.log('ffsfsf');
    var $bigs = $('.refer-content .big');
    var $smalls = $('.refer-content .small');
    $bigs.each(function(i, elem) {
      var $elem = $(elem);
      $elem.addClass('big' + (i + 1));
    });

    $smalls.each(function(i, elem) {
      var $elem = $(elem);
      $elem.addClass('small' + (i + 1));
    });
  }

  function scrollHandler(evt) {
    var refetTop = $('.refer-wrapper').position().top;
    var scollT = $(window).scrollTop();
    if(scollT > (refetTop - 400) && !referTimer) {
      referTimer = setTimeout(typingAnimation, 600);
    }
  }
});
