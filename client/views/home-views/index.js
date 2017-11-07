require('./style/index.less');

var srcBase = '/static/assets/home-views/';
var imageSrc = [
  'first-banner-bg.jpg',
  'second-banner-bg.jpg',
  'third-banner-bg.jpg',
  'architecture-bg.png',
  'feature-bg.jpg',
  'com.png',
  'edu.png',
  'fin.png',
  'gov.png',
  'refer-bg.jpg',
  'refer-bg-move1.png',
  'refer-bg-move2.png',
  'refer-bg-move3.png'
];

function preloadImages(srcBase, imageSrc) {
  document.body.style.overflow = 'hidden';
  var total = imageSrc.length;
  var loaded = 0;
  var progress = 0;
  var step = Math.floor(100 / total);

  imageSrc.map(function(item) {
    return srcBase + item;
  }).forEach(function(item) {
    var image = new Image();
    image.onload = function() {
      loaded ++;
      progress += step;
      if(loaded === total) {
        progress = 100;
        updateProgressBar(progress);
        hideMask();
      } else {
        updateProgressBar(progress);
      }
    };
    image.src = item;
  });
}

function updateProgressBar(progress) {
  var $progressBar = $('#preload-mask .progress-bar');
  var $content = $('#preload-mask .content');
  $progressBar.width(progress * 5.5);
  $content.text(progress + '%');
}

function hideMask() {
  document.body.style.overflow = 'auto';
  var mask = document.getElementById('preload-mask');
  if(mask) {
    $(mask).addClass('fading-preload-mask');
    setTimeout(function() {
      document.body.removeChild(mask);
    }, 1500);
  }
}

preloadImages(srcBase, imageSrc);
setTimeout(hideMask, 5000);

$(function() {

  var referTimer;
  var bannerTimer;
  var currentIndex = 0;
  var $bannerWrapper = $('.banner-wrapper');
  var $bannerContentWrapper = $('.banner-content-wrapper');
  var $ctrlPoints = $('.control-bar .point');
  var $areaList = $('.area-list li');
  var fontVisible = false;

  $areaList.on('click', function(evt) {
    var index = $(evt.target).data('index');
    var baseUrl = '/about/clients';
    if(index === 1) {
      window.location = baseUrl + '#education';
    } else if(index === 2) {
      window.location = baseUrl + '#financial';
    } else if(index === 3) {
      window.location = baseUrl + '#government';
    } else {
      window.location = baseUrl;
    }
  });

  $(window).on('resize', resizeHandler);
  $(window).on('scroll', scrollHandler);
  $ctrlPoints.on('click', pointClickHandler);
  $bannerContentWrapper.on('mouseenter', bannerHover);
  $bannerContentWrapper.on('mouseleave', bannerBlur);

  setBannerSize();

  autoPlay();

  function resizeHandler() {
    setBannerSize();
  }

  function scrollHandler(evt) {
    var refetTop = $('.refer-wrapper').position().top;
    var referHeight = $('.refer-wrapper').height();
    var windowH = $(window).height();
    var scollT = $(window).scrollTop();

    if(scollT <= refetTop - referHeight && fontVisible) {
      hideFont();
    } else if(scollT > (refetTop - windowH / 2) && !referTimer) {
      referTimer = setTimeout(typingAnimation, 600);
    }
  }

  function hideFont() {
    if(referTimer) {
      clearTimeout(referTimer);
      referTimer = null;
    }

    var $bigs = $('.refer-content .big');
    var $smalls = $('.refer-content .small');

    $bigs.each(function(i, elem) {
      var $elem = $(elem);
      $elem.removeClass('big' + (i + 1));
    });

    $smalls.each(function(i, elem) {
      var $elem = $(elem);
      $elem.removeClass('small' + (i + 1));
    });
    fontVisible = false;
  }

  function pointClickHandler(evt) {
    if(bannerTimer) {
      autoStop();
    }
    var index = $(evt.target).data('index');
    if(index === currentIndex) {
      return;
    }
    $bannerWrapper.eq(currentIndex).removeClass('active');
    $bannerWrapper.eq(index).addClass('active');
    $ctrlPoints.eq(currentIndex).removeClass('active');
    $ctrlPoints.eq(index).addClass('active');
    currentIndex = index;
    autoPlay();
  }

  function bannerHover(evt) {
    autoStop();
  }

  function bannerBlur(evt) {
    autoPlay();
  }

  function setBannerSize() {
    var winH = $(window).height();
    $('.pc-banner').height(winH);
  }

  function autoPlay() {
    if(!bannerTimer) {
      bannerTimer = setInterval(function() {
        var index = currentIndex + 1;
        if(index === 3) {
          index = 0;
        }
        $ctrlPoints.eq(index).click();
      }, 10000);
    }
  }

  function autoStop() {
    clearInterval(bannerTimer);
    bannerTimer = null;
  }

  function typingAnimation() {
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
    fontVisible = true;
  }
});
