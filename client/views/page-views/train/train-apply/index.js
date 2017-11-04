require('./style/index.less');
$(function() {

  // 交互事件处理部分

  var SingletonModal = require('./components/modal');
  var modal = new SingletonModal();
  var $form = $('#application-form');
  var $name = $form.find('#name');
  var $phone = $form.find('#phone');
  var $email = $form.find('#email');
  var $company = $form.find('#company');
  var $location = $form.find('[name=location]');
  var $submitBtn = $form.find('#submitBtn');

  $name.on('blur', nameBlurHandler);
  $phone.on('blur', phoneBlurHandler);
  $email.on('blur', emailBlurHandler);
  $company.on('blur', companyBlurHandler);
  $location.on('change', locChangeHandler);
  $location.on('blur', locBlurHandler);
  $submitBtn.on('click', btnClickHandler);
  $(window).on('resize', resizeHandler);

  function locChangeHandler(evt) {
    $location.blur();
    cityArr.forEach(function(city) {
      city.checked = false;
    });
    cityArr[$(evt.target).data('index')].check();
  }

  function nameBlurHandler(evt) {
    changeInputState(evt.target);
  }

  function phoneBlurHandler(evt) {
    var Regexp = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;

    changeInputState(evt.target, Regexp);
  }

  function emailBlurHandler(evt) {
    var Regexp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    
    changeInputState(evt.target, Regexp);
  }

  function companyBlurHandler(evt) {
    changeInputState(evt.target);
  }

  function locBlurHandler(evt) {
    var $msg = $('.class-location-field .message');
    var value = $location.filter(':checked').val().trim();

    if(value !== '') {
      $msg.find('.correct-msg').show();
      $msg.find('.error-msg').hide();
    } else {
      $msg.find('.error-msg').show();
      $msg.find('.correct-msg').hide();
    }
  }


  function changeInputState(target, regexp) {
    var $target = $(target);
    var $msg = $target.next('.message');
    var value = $target.val().trim();

    if(regexp) {
      if (regexp.test(value)) {
        $target.addClass('input-correct-border')
          .removeClass('input-error-border');
        $msg.find('.correct-msg').show();
        $msg.find('.error-msg').hide();
      } else {
        $target.addClass('input-error-border')
          .removeClass('input-correct-border');
        $msg.find('.error-msg').show();
        $msg.find('.correct-msg').hide();
      }
    } else {
      if(value !== '') {
        $target.addClass('input-correct-border')
          .removeClass('input-error-border');
        $msg.find('.correct-msg').show();
        $msg.find('.error-msg').hide();
      } else {
        $target.addClass('input-error-border')
          .removeClass('input-correct-border');
        $msg.find('.error-msg').show();
        $msg.find('.correct-msg').hide();
      }
    }

  }

  // 提交
  function btnClickHandler(evt) {
    evt.preventDefault();
    var vName = $('#name').val();
    var vEmail = $('#email').val();
    var vPhone = $('#phone').val();
    var vCompany = $('#company').val();
    var location = $('[name=location]:checked').val();

    if(!vName.trim()) {
      $name.blur();
      return;
    }

    if(!vPhone.trim()) {
      $phone.blur();
      return;
    }

    if(!vEmail.trim()) {
      $email.blur();
      return;
    }

    if(!vCompany.trim()) {
      $company.blur();
      return;
    }

    if(!location) {
      $location.blur();
    }

    var data = {
      nickname: vName,
      email: vEmail,
      phone: vPhone,
      company: vCompany,
      location: location
    };

    $.ajax({
      type: 'POST',
      url: '/apply/api/train',
      data: data,
      beforeSend: function(jqXHR){
        modal.setOptions({
          content: '申请中',
          btnContent: '退出申请',
          clickHandler: function() {
            jqXHR.abort();
            modal.hide();
          }
        });
        modal.show();
      }
    }).done(function(data) {
      modal.setOptions({
        content: data.message,
        btnContent: '知道了',
        btnType: 'create',
        iconSrc: '/static/assets/page-views/train/train-apply/gou.png'
      });
      modal.show();
    }).fail(function(jqXHR) {
      var response = JSON.parse(jqXHR.responseText);
      var message;
      if(response.errors) {
        message = response.errors[0].message;
      } else {
        message = '申请失败';
      }
      modal.setOptions({
        content: message,
        btnContent: '重新申请',
        iconSrc: '/static/assets/page-views/train/train-apply/cha.png'
      });
      modal.show();
    });
  }

  function resizeHandler(evt) {
    drawMap(canvas, cityArr);
  }

  function clickHandler(evt) {
    var pageX = evt.pageX;
    var pageY = evt.pageY;
    var offset = $(evt.target).offset();
    var offsetX = offset.left;
    var offsetY = offset.top;
    var left = pageX - offsetX;
    var top = pageY - offsetY;
    var docW = document.documentElement.clientWidth;
    var scaleObj;
    if( docW <= 955) {
      scaleObj = getScaleRatio(canvas, docW);
      left = left / scaleObj.w;
      top = top / scaleObj.h;
    }
    $.each(cityArr, function(idx, city) {
      if( left >= city.x && left <= city.x + city.w &&
        top >= city.y && top <= city.y + city.h) {
        cityArr.forEach(function(ci) {
          ci.checked = false;
        });
        cityArr[idx].check();
        $location.eq(idx).prop('checked', true);
        return;
      }
    });
  }


  // 绘制 canvas 部分
  var canvas = $form.find('#class-map')[0];
  var canvasAspectRatio = 1.2847;
  var mapImg = new Image();
  var defaultImg = new Image();
  var checkedImg = new Image();
  var imgArr = [mapImg, defaultImg, checkedImg];
  var imgLoadedCount = 0;
  var timer;

  for(var i = 0; i < 3; i++) {
    imgArr[i].onload = function() {
      imgLoadedCount++;
    };
    imgArr[i].onerror = function() {
      console.log('图片加载失败');
    };
  }

  mapImg.src = '/static/assets/page-views/train/train-apply/map.jpg';
  defaultImg.src = '/static/assets/page-views/train/train-apply/default.jpg';
  checkedImg.src = '/static/assets/page-views/train/train-apply/selected.jpg';

  $(canvas).on('click', clickHandler);


  var cityNameArr = [];
  var $labelArr = $('.class-location-field ul li label');
  $labelArr.each(function(idx, ele) {
    cityNameArr.push($(ele).text());
  });

  var cityArr = new Array();
  var cityDataArr = [{
    // 北京
    x: 642,
    y: 210,
    w: 50,
    h: 50,
    tx: 667,
    ty: 230,
    cx: 649,
    cy: 231
  }, {
    // 上海
    x: 728,
    y: 445,
    w: 80,
    h: 30,
    tx: 785,
    ty: 468,
    cx: 730,
    cy: 444
  }, {
    // 天津
    x: 672,
    y: 265,
    w: 80,
    h: 30,
    tx: 725,
    ty: 288,
    cx: 669,
    cy: 263
  }, {
    // 成都
    x: 417,
    y: 456,
    w: 50,
    h: 60,
    tx: 443,
    ty: 504,
    cx: 424,
    cy: 453
  }, {
    // 哈尔滨
    x: 775,
    y: 120,
    w: 100,
    h: 30,
    tx: 836,
    ty: 143,
    cx: 772,
    cy: 119
  }, {
    // 太原
    x: 572,
    y: 308,
    w: 50,
    h: 50,
    tx: 597,
    ty: 328,
    cx: 580,
    cy: 330
  }, {
    // 合肥
    x: 665,
    y: 400,
    w: 50,
    h: 60,
    tx: 690,
    ty: 424,
    cx: 673,
    cy: 425
  }, {
    // 济南
    x: 653,
    y: 320,
    w: 80,
    h: 30,
    tx: 705,
    ty: 343,
    cx: 651,
    cy: 320
  }, {
    // 西安
    x: 522,
    y: 382,
    w: 50,
    h: 60,
    tx: 549,
    ty: 432,
    cx: 530,
    cy: 380
  }, {
    // 南宁
    x: 521,
    y: 608,
    w: 80,
    h: 30,
    tx: 580,
    ty: 630,
    cx: 523,
    cy: 607
  }];

  for(i = 0; i < 10; i++) {
    cityArr.push(new City(cityNameArr[i], cityDataArr[i]));
  }

  // 绘制地图
  function drawMap(canvas, cityArr) {
    var ctx = canvas.getContext('2d');
    var docW = document.documentElement.clientWidth;
    setCanvasSize(canvas, docW);
    // 当页面宽度不足时，缩放 canvas
    if (docW <= 955) {
      scaleCanvas(canvas, docW);
    }
    var canvasW = canvas.width;
    var canvasH = canvas.height;
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvasW, canvasH);
    ctx.font = '20px PingFangSC-Regular';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#666';
    ctx.drawImage(mapImg, 0, 0, 880, 685);

    cityArr.forEach(function(city) {
      city.drawCity(ctx);
    });
  }

  // 3张图片加载完成后开始绘制 canvas
  timer = setInterval(function () {
    if (imgLoadedCount === 3) {
      drawMap(canvas, cityArr);
      clearInterval(timer);
    }
  }, 150);

  function scaleCanvas(canvas, docW) {
    var scaleObj = getScaleRatio(canvas, docW);
    canvas.getContext('2d').scale(scaleObj.w, scaleObj.h);
  }

  function getScaleRatio(canvas, docW) {
    var wScaleRatio = Number((canvas.width / 880).toFixed(2));
    var hScaleRatio = Number((canvas.height / 685).toFixed(2));
    return {
      w: wScaleRatio,
      h: hScaleRatio
    };
  }

  function setCanvasSize(canvas, docW) {
    if(docW >= 956) {
      canvas.width = 880;
      canvas.height = 685;
      return;
    }
    var canvasAreaW = Number((docW * 0.92).toFixed(4));
    canvas.width = canvasAreaW + 5;
    canvas.height = Number((canvasAreaW / canvasAspectRatio).toFixed(4));
  }

  /**
   * 
   * @param {string} name city name 
   * @param {obj} size click rect area size 
   */
  function City(name, size) {
    this.name = name;
    this.x = size.x;
    this.y = size.y;
    this.w = size.w;
    this.h = size.h;
    this.tx = size.tx;
    this.ty = size.ty;
    this.cx = size.cx;
    this.cy = size.cy;
    this.checked = false;
  }

  City.prototype.drawCity = function(ctx) {
    var img;
    ctx.save();
    // ctx.strokeRect(this.x, this.y, this.w, this.h);
    if(this.checked) {
      ctx.fillStyle = '#0280DF';
      ctx.font = '22px PingFangSC-Regular';
      img = checkedImg;
    } else {
      img = defaultImg; 
    }
    ctx.fillText(this.name, this.tx, this.ty);
    ctx.drawImage(img, this.cx, this.cy, 34, 34);
    ctx.restore();
  };

  City.prototype.check = function() {
    if(this.checked) {
      return;
    }

    this.checked = true;
    drawMap(canvas, cityArr);
  };


});