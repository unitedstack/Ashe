require('./style/index.less');

$(function(){

  var Modal = require('../../../../static/common/js/modal/modal');
  var modal = new Modal();
  // 交互事件处理部分
  var $form = $('#application-form');
  var $name = $form.find('#name');
  var $company = $form.find('#company');
  var $phone = $form.find('#phone');
  var $email = $form.find('#email');
  var $submitBtn = $form.find('#submitBtn');
  var $usedBtn = $form.find('#used');
  var $didNotUseBtn = $form.find('#didNotUse');
  var usedHolderText = $form.find('#usedHolder').text();
  var didNotUseHolderText = $form.find('#didNotUseHolder').text();
  var $appendInfo = $form.find('#appendInfo');
  var $starsList = $form.find('.stars');

  $name.on('blur', nameBlurHandler);
  $phone.on('blur', phoneBlurHandler);
  $email.on('blur', emailBlurHandler);
  $company.on('blur', companyBlurHandler);
  $usedBtn.on('click', usedClickHandler);
  $didNotUseBtn.on('click', didNotUseClickHandler);
  $submitBtn.on('click', btnClickHandler);
  $starsList.on('click', '.icon-star', starClickHandler);

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

  function usedClickHandler(evt) {
    var $this = $(this);
    if($this.hasClass('checked')) {
      return;
    }
    $this.addClass('checked');
    $('.company-evaluation').show();
    $didNotUseBtn.removeClass('checked');
    $appendInfo.prop('placeholder', usedHolderText);
  }

  function didNotUseClickHandler() {
    var $this = $(this);
    if($this.hasClass('checked')) {
      return;
    }
    $this.addClass('checked');
    $('.company-evaluation').hide();
    $usedBtn.removeClass('checked');
    $appendInfo.prop('placeholder', didNotUseHolderText);
  }

  function starClickHandler(evt) {
    var $target = $(evt.target);
    var $allStars = $target.siblings().addBack();
    var $previousStars = $target.prevAll();
    var $checkedStars = $allStars.filter('.checked');
    $allStars.removeClass('checked');
    if($previousStars.add($target).length === $checkedStars.length) {
      return;
    }
    $previousStars.add($target).addClass('checked');
  }


  function btnClickHandler(evt) {
    evt.preventDefault();
    var vName = $name.val().trim();
    var vEmail = $email.val().trim();
    var vPhone = $phone.val().trim();
    var vCompany = $company.val().trim();

    if(!vName) {
      $name.blur();
      $name.focus();
      return;
    }

    if(!vPhone) {
      $phone.blur();
      $phone.focus();
      return;
    }

    if(!vEmail) {
      $email.blur();
      $email.focus();
      return;
    }

    if(!vCompany) {
      $company.blur();
      $company.focus();
      return;
    }

    var isMobile = document.documentElement.clientWidth <= 960 ? true : false;
    
    modal.setOptions({
      isMobile: isMobile,
      opacity: 0.2,
      width: 550,
      height: 296,
      isCaptcha: true,
      onSendRequest: onSendRequest
    });
    modal.show();
    
  }

  function onSendRequest(captcha, cb) {
    var vName = $name.val().trim();
    var vEmail = $email.val().trim();
    var vPhone = $phone.val().trim();
    var vCompany = $company.val().trim();
    var vRemark = $appendInfo.val();

    var data = {
      nickname: vName,
      email: vEmail,
      phone: vPhone,
      company: vCompany,
      captcha: captcha
    };
    if (vRemark) {
      data.description = vRemark;
    }

    if($('#used').hasClass('checked')) {
      var $stars = $('.stars');
      var ev1 = $stars.eq(0).find('.checked').length;
      var ev2 = $stars.eq(1).find('.checked').length;
      var ev3 = $stars.eq(2).find('.checked').length;
      var ev4 = $stars.eq(3).find('.checked').length;
      data.evaluation = [ev1, ev2, ev3, ev4].join();
    }

    $.ajax({
      type: 'POST',
      url: '/apply/api/private-cloud',
      data: data
    }).done(function(data) {
      var tipConfig = {
        tipIconSrc: '/static/assets/page-views/train/train-apply/checked.png',
        tipTitle: '申请成功',
        tipContent: '同方云已收到您的申请'
      };
      var parent = document.getElementsByClassName('main-content')[0];

      cb(tipConfig, parent, 'success');
    }).fail(function(jqXHR) {
      var tipConfig = {
        tipIconSrc: '/static/assets/page-views/train/train-apply/warning.png',
        tipTitle: '申请失败',
        tipContent: '同方云没有收到您的申请'
      };
      var parent = document.getElementsByClassName('main-content')[0];

      cb(tipConfig, parent, 'fail');
    });
  }
});