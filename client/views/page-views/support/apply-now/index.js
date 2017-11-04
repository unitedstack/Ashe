require('./style/index.less');

$(function(){

  var SingletonModal = require('./components/modal');
  var modal = new SingletonModal();
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
    $didNotUseBtn.removeClass('checked');
    $appendInfo.prop('placeholder', usedHolderText);
  }

  function didNotUseClickHandler() {
    var $this = $(this);
    if($this.hasClass('checked')) {
      return;
    }
    $this.addClass('checked');
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
    var vName = $('#name').val();
    var vEmail = $('#email').val();
    var vPhone = $('#phone').val();
    var vCompany = $('#company').val();
    var vRemark = $('#appendInfo').val();

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
    
    var data = {
      nickname: vName,
      email: vEmail,
      phone: vPhone,
      company: vCompany
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
        iconSrc: '/static/assets/page-views/support/apply-now/gou.png'
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
        iconSrc: '/static/assets/page-views/support/apply-now/cha.png'
      });
      modal.show();
    });
  }
});