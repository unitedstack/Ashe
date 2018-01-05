require('./style/index.less');

var srcBase = '/static/assets/home-views/';
var imageSrc = [
  'first-banner-bg.jpg',
  'second-banner-bg.jpg',
  'third-banner-bg.jpg',
  'architecture-bg-v1.1.png',
  'arch-hover.png',
  'arch.png',
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
  var isMobile = $(window).width() <= 1024 ? true : false;
  var width = getWidth(isMobile);
  $progressBar.width(progress * width / 100);
  $content.text(progress + '%');
}

function getWidth(isMobile) {
  var width = isMobile ? ($('#preload-mask .banner-content-wrapper').width() * 0.78) : 550;
  return width;
}

function hideMask() {
  document.body.style.overflow = 'auto';
  var mask = document.getElementById('preload-mask');
  if(mask) {
    $(mask).addClass('fading-preload-mask');
    setTimeout(function() {
      document.body.removeChild(mask);
    }, 750);
  }
}

preloadImages(srcBase, imageSrc);
setTimeout(hideMask, 10000);

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
    var index = $(evt.currentTarget).data('index');
    var baseUrl = '/about/clients';
    if(index === 1) {
      window.location = baseUrl + '#education';
    } else if(index === 2) {
      window.location = baseUrl + '#financial';
    } else if(index === 3) {
      window.location = baseUrl + '#government';
    } else {
      window.location = baseUrl + '#business';
    }
  });

  $(window).on('resize', resizeHandler);
  $(window).on('scroll', scrollHandler);
  $ctrlPoints.on('click', pointClickHandler);
  $bannerContentWrapper.on('mouseenter', bannerHover);
  $bannerContentWrapper.on('mouseleave', bannerBlur);

  $('.flash-fix').hide();

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

window.onload = window.onresize = window.onscroll = function(){
  function ZoomPic (){
    this.initialize.apply(this, arguments);
  }
  ZoomPic.prototype = {
    initialize : function (id)
    {
      var _this = this;
      this.wrap = typeof id === 'string' ? document.getElementById(id) : id;
      this.oUl = this.wrap.getElementsByTagName('ul')[0];
      this.aLi = this.wrap.getElementsByTagName('li');
      this.prev = this.wrap.getElementsByTagName('span')[0];
      this.next = this.wrap.getElementsByTagName('span')[1];
      this.timer = 2000;
      this.aSort = [];
      this.iCenter = 1;
      this._doPrev = function () {return _this.doPrev.apply(_this);};
      this._doNext = function () {return _this.doNext.apply(_this);};
      this.options = [
        {width:440, height:220, top:20, left:50, zIndex:2, imgWidth: 180, imgHeight: 180, titleFont: 14, introFont: 12, introHeight: 16, rightWidth: 183},
        {width:560, height:280, top:0, left:350, zIndex:3, imgWidth: 220, imgHeight: 220, titleFont: 20, introFont: 14, introHeight: 20, rightWidth: 443},
        {width:440, height:220, top:20, left:680, zIndex:2, imgWidth: 180, imgHeight: 180, titleFont: 14, introFont: 12, introHeight: 16, rightWidth: 183},
      ];
      for (var i = 0; i < this.aLi.length; i++) this.aSort[i] = this.aLi[i];
      this.aSort.unshift(this.aSort.pop());
      this.setUp();
      this.addEvent(this.prev, 'click', this._doPrev);
      this.addEvent(this.next, 'click', this._doNext);
      this.doImgClick();    
      this.timer = setInterval(function ()
      {
        _this.doNext();
      }, 2000);   
      this.wrap.onmouseover = function ()
      {
        clearInterval(_this.timer); 
      };
      this.wrap.onmouseout = function ()
      {
        _this.timer = setInterval(function ()
        {
          _this.doNext();
        }, 2000); 
      };
    },
    doPrev : function ()
    {
      this.aSort.unshift(this.aSort.pop());
      this.setUp();
    },
    doNext : function ()
    {
      this.aSort.push(this.aSort.shift());
      this.setUp();
    },
    doImgClick : function ()
    {
      var _this = this;
      for (var i = 0; i < this.aSort.length; i++)
      {
        this.aSort[i].onclick = function ()
        {
          if (this.index > _this.iCenter)
          {
            for (var i = 0; i < this.index - _this.iCenter; i++) _this.aSort.push(_this.aSort.shift());
            _this.setUp();
          }
          else if(this.index < _this.iCenter)
          {
            for (var ii = 0; ii < _this.iCenter - this.index; ii++) _this.aSort.unshift(_this.aSort.pop());
            _this.setUp();
          }
        };
      }
    },
    setUp : function ()
    {
      var _this = this;
      var i = 0;
      for (i = 0; i < this.aSort.length; i++) this.oUl.appendChild(this.aSort[i]);
      for (i = 0; i < this.aSort.length; i++)
      {
        this.aSort[i].index = i;
        if (i < 3)
        {
          this.css(this.aSort[i], 'display', 'block');
          this.doMove(this.aSort[i], this.options[i], function ()
          {
            _this.doMove(_this.aSort[_this.iCenter].getElementsByTagName('img')[0], {opacity:100}, function ()
            {
              _this.doMove(_this.aSort[_this.iCenter].getElementsByTagName('img')[0], {opacity:100}, function ()
              {
                _this.aSort[_this.iCenter].onmouseover = function ()
                {
                  _this.doMove(this.getElementsByTagName('img')[0], {bottom:0});
                };
                _this.aSort[_this.iCenter].onmouseout = function ()
                {
                  _this.doMove(this.getElementsByTagName('img')[0], {bottom:-100});
                };
              });
            });
          });
        }
        else
        {
          this.css(this.aSort[i], 'display', 'none');
          this.css(this.aSort[i], 'width', 0);
          this.css(this.aSort[i], 'height', 0);
          this.css(this.aSort[i], 'top', 37);
          this.css(this.aSort[i], 'left', this.oUl.offsetWidth / 2);
        }
        if (i < this.iCenter || i > this.iCenter)
        {
          this.css(this.aSort[i].getElementsByTagName('img')[0], 'opacity', 100);
          this.css(this.aSort[i], 'width', 440);
          this.css(this.aSort[i].children[0].children[0], 'width', 170);
          this.css(this.aSort[i].children[0].children[0], 'height', 170);
          this.css(this.aSort[i].children[0].children[0], 'margin-right', 25);
          this.css(this.aSort[i].children[1].children[0], 'font-size', 18);
          this.css(this.aSort[i].children[1].children[1], 'font-size', 12);
          this.css(this.aSort[i].children[1].children[1], 'line-height', 1.4);
          this.css(this.aSort[i].children[1], 'width', 183);
          this.css(this.aSort[i].children[1].children[2], 'margin-top', '5px');
          this.aSort[i].onmouseover = function ()
          {
            _this.doMove(this.getElementsByTagName('img')[0], {opacity:100});
          };
          this.aSort[i].onmouseout = function ()
          {
            _this.doMove(this.getElementsByTagName('img')[0], {opacity:100});
          };
          this.aSort[i].onmouseout();
        }
        else
        {
          this.css(this.aSort[i], 'width', 560);
          this.css(this.aSort[i].children[0].children[0], 'width', 220);
          this.css(this.aSort[i].children[0].children[0], 'height', 220);
          this.css(this.aSort[i].children[1].children[0], 'font-size', 20);
          this.css(this.aSort[i].children[1].children[1], 'font-size', 14);
          this.css(this.aSort[i].children[1].children[1], 'line-height', 1.8);
          this.css(this.aSort[i].children[1], 'width', 243);
          this.css(this.aSort[i].children[1].children[2], 'margin-top', '50px');
          this.aSort[i].onmouseover = this.aSort[i].onmouseout = null;
        }
      }   
    },
    addEvent : function (oElement, sEventType, fnHandler)
    {
      return oElement.addEventListener ? oElement.addEventListener(sEventType, fnHandler, false) : oElement.attachEvent('on' + sEventType, fnHandler);
    },
    css : function (oElement, attr, value)
    {
      if (arguments.length == 2)
      {
        return oElement.currentStyle ? oElement.currentStyle[attr] : getComputedStyle(oElement, null)[attr];
      }
      else if (arguments.length == 3)
      {
        switch (attr)
        {
          case 'width':
          case 'height':
          case 'top':
          case 'left':
          case 'bottom':
            oElement.style[attr] = value + 'px';
            break;
          case 'opacity' :
            oElement.style.filter = 'alpha(opacity=' + value + ')';
            oElement.style.opacity = value / 100;
            break;
          default :
            oElement.style[attr] = value;
            break;
        } 
      }
    },
    doMove : function (oElement, oAttr, fnCallBack)
    {
      var _this = this;
      clearInterval(oElement.timer);
      oElement.timer = setInterval(function ()
      {
        var bStop = true;
        for (var property in oAttr)
        {
          var iCur = parseFloat(_this.css(oElement, property));
          property == 'opacity' && (iCur = parseInt(iCur.toFixed(2) * 100));
          var iSpeed = (oAttr[property] - iCur) / 3;
          iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
          
          if (iCur != oAttr[property])
          {
            bStop = false;
            _this.css(oElement, property, iCur + iSpeed);
          }
        }
        if (bStop)
        {
          clearInterval(oElement.timer);
          fnCallBack && fnCallBack.apply(_this, arguments);
        }
      }, 30);
    }
  };
  if(!G.mobile) {
    window.onload = function (){
      new ZoomPic('focus_Box');
    };
  }
  if(G.pad) {
    ZoomPic.prototype.initialize = function(id) {
      var _this = this;
      this.wrap = typeof id === 'string' ? document.getElementById(id) : id;
      this.oUl = this.wrap.getElementsByTagName('ul')[0];
      this.aLi = this.wrap.getElementsByTagName('li');
      this.prev = this.wrap.getElementsByTagName('span')[0];
      this.next = this.wrap.getElementsByTagName('span')[1];
      this.timer = 2000;
      this.aSort = [];
      this.iCenter = 1;
      this._doPrev = function () {return _this.doPrev.apply(_this);};
      this._doNext = function () {return _this.doNext.apply(_this);};
      this.options = [
        {width:380, height:180, top:20, left:60, zIndex:2, imgWidth: 160, imgHeight: 160, titleFont: 14, introFont: 12, introHeight: 16, rightWidth: 203},
        {width:460, height:240, top:0, left:350, zIndex:3, imgWidth: 200, imgHeight: 200, titleFont: 20, introFont: 14, introHeight: 20, rightWidth: 443},
        {width:380, height:180, top:20, left:680, zIndex:2, imgWidth: 160, imgHeight: 160, titleFont: 14, introFont: 12, introHeight: 16, rightWidth: 203},
      ];
      for (var i = 0; i < this.aLi.length; i++) this.aSort[i] = this.aLi[i];
      this.aSort.unshift(this.aSort.pop());
      this.setUp();
      this.addEvent(this.prev, 'click', this._doPrev);
      this.addEvent(this.next, 'click', this._doNext);
      this.doImgClick();    
      this.timer = setInterval(function ()
      {
        _this.doNext();
      }, 2000);   
      this.wrap.onmouseover = function ()
      {
        clearInterval(_this.timer); 
      };
      this.wrap.onmouseout = function ()
      {
        _this.timer = setInterval(function ()
        {
          _this.doNext();
        }, 2000); 
      };
    },
    ZoomPic.prototype.setUp = function() {
      var _this = this;
      var i = 0;
      for (i = 0; i < this.aSort.length; i++) this.oUl.appendChild(this.aSort[i]);
      for (i = 0; i < this.aSort.length; i++)
      {
        this.aSort[i].index = i;
        if (i < 3)
        {
          this.css(this.aSort[i], 'display', 'block');
          this.doMove(this.aSort[i], this.options[i], function ()
          {
            _this.doMove(_this.aSort[_this.iCenter].getElementsByTagName('img')[0], {opacity:100}, function ()
            {
              _this.doMove(_this.aSort[_this.iCenter].getElementsByTagName('img')[0], {opacity:100}, function ()
              {
                _this.aSort[_this.iCenter].onmouseover = function ()
                {
                  _this.doMove(this.getElementsByTagName('img')[0], {bottom:0});
                };
                _this.aSort[_this.iCenter].onmouseout = function ()
                {
                  _this.doMove(this.getElementsByTagName('img')[0], {bottom:-100});
                };
              });
            });
          });
        }
        else
        {
          this.css(this.aSort[i], 'display', 'none');
          this.css(this.aSort[i], 'width', 0);
          this.css(this.aSort[i], 'height', 0);
          this.css(this.aSort[i], 'top', 37);
          this.css(this.aSort[i], 'left', this.oUl.offsetWidth / 2);
        }
        if (i < this.iCenter || i > this.iCenter)
        {
          this.css(this.aSort[i].getElementsByTagName('img')[0], 'opacity', 100);
          this.css(this.aSort[i], 'width', 350);
          this.css(this.aSort[i].children[0].children[0], 'width', 140);
          this.css(this.aSort[i].children[0].children[0], 'height', 140);
          this.css(this.aSort[i].children[0].children[0], 'margin-right', 25);
          this.css(this.aSort[i].children[1].children[0], 'font-size', '16px');
          this.css(this.aSort[i].children[1].children[0], 'line-height', '20px');
          this.css(this.aSort[i].children[1].children[1], 'font-size', '10px');
          this.css(this.aSort[i].children[1].children[1], 'line-height', 1.2);
          this.css(this.aSort[i].children[1], 'width', 160);
          this.css(this.aSort[i].children[1].children[2], 'margin-top', '5px');
          this.aSort[i].onmouseover = function ()
          {
            _this.doMove(this.getElementsByTagName('img')[0], {opacity:100});
          };
          this.aSort[i].onmouseout = function ()
          {
            _this.doMove(this.getElementsByTagName('img')[0], {opacity:100});
          };
          this.aSort[i].onmouseout();
        }
        else
        {
          this.css(this.aSort[i], 'width', 460);
          this.css(this.aSort[i].children[0].children[0], 'width', 180);
          this.css(this.aSort[i].children[0].children[0], 'height', 180);
          this.css(this.aSort[i].children[1].children[0], 'font-size', '18px');
          this.css(this.aSort[i].children[1].children[0], 'line-height', '24px');
          this.css(this.aSort[i].children[1].children[1], 'font-size', '12px');
          this.css(this.aSort[i].children[1].children[1], 'line-height', 1.4);
          this.css(this.aSort[i].children[1], 'width', 180);
          this.css(this.aSort[i].children[1].children[2], 'margin-top', '20px');
          this.aSort[i].onmouseover = this.aSort[i].onmouseout = null;
        }
      }
    };
  }
};
