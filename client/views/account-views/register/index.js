require('./style/index.less');

// var disabled = true;
var email = $('.email');
// var username = $('.name');
var password = $('.password');
var repassword = $('#repassword');
var phone = $('.phone');
var captchaTip = $('#captcha-tip');
var btnSend = $('#sendCaptcha');
var regexPatterns = {
  email: function(value) {
    var regEmail = /^([a-zA-Z0-9.+_-])+@([a-zA-Z0-9_-])+\.([a-zA-Z0-9])+/;
    return !!regEmail.test(value);
  },
  phone: function(value) {
    var regPhone = /^1[3,4,5,6,7,8]\d{9}$/;
    return !!regPhone.test(value);
  }
};

// switch password visable
$('.icon-eye').click(function() {
  $(this).prev().attr('type', function(index, oldvalue) {
    return oldvalue === 'password' ? 'text' : 'password';
  });
});

// send captcha
btnSend.click(function() {
  if(btnSend.hasClass('disabled')) {
    return;
  }
  // remove unnecessary blank
  var phoneNum = phone.val().replace(/\s/g, '');
  var seconds = 60;
  var timer;
  if(regexPatterns.phone(phoneNum)) {
    $.ajax({
      type: 'POST',
      url: '/account/api/register/phone',
      data: {
        phone: phone.val()
      },
      success: function() {
        phone.removeClass('error');
        captchaTip.removeClass('show');
        btnSend.addClass('disabled');
        timer = setInterval(function() {
          if(seconds > 0) {
            btnSend.text('重新获取(' + seconds-- + 's)');
          } else {
            clearInterval(timer);
            btnSend.text('获取验证码').removeClass('disabled');
          }
        }, 1000);
      },
      error: function(err) {
        captchaTip.addClass('show');
        captchaTip.text(JSON.parse(err.responseText).errors[0].message);
      }
    });
  } else {
    phone.removeClass('disabled').addClass('error');
    captchaTip.addClass('show');
    captchaTip.text('手机号格式不正确！');
  }
});

// click button submit
$('.submit').click(function() {
  var vEmail = email.val();
  var vCode = $('.captcha').val();
  var vPhone = phone.val();
  var vPassword = password.val();
  var vRePassword = repassword.val();
  var patterns = [{
    selector: email,
    regex: !regexPatterns.email(vEmail)
  }, {
    selector: password,
    regex: !vPassword
  }, {
    selector: repassword,
    regex: vPassword !== vRePassword
  }];
  patterns.forEach(function(item) {
    if(item.regex) {
      item.selector.addClass('error');
    } else {
      item.selector.removeClass('error');
    }
  });
  $.ajax({
    type: 'POST',
    url: '/account/api/register/unique-email',
    data: {
      email: vEmail
    },
    success: function() {
      if(patterns[1].regex || patterns[2].regex) {
        return;
      }else {
        $.ajax({
          type: 'POST',
          url: '/account/api/register',
          data: {
            email: vEmail,
            phone: vPhone,
            code: vCode,
            password: vPassword
          },
          success: function() {
            window.location.href = '/account/profile';
          },
          error: function(err) {
            captchaTip.addClass('show');
            captchaTip.text(JSON.parse(err.responseText).errors[0].message);
          }
        });
      }
    },
    error: function(err) {
      captchaTip.addClass('show');
      captchaTip.text(JSON.parse(err.responseText).errors[0].message);
    }
  });
});
