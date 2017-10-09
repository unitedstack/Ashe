require('./style/index.less');

// var disabled = true;
var email = $('.email');
// var username = $('.name');
var password = $('.password');
var repassword = $('#repassword');
var phone = $('.phone');
var captchaTip = $('#captcha-tip');
var btnSend = $('#sendCaptcha');
var code = $('.captcha');
var submit = $('.submit');
var pwdTip = $('#pwd-tip');
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
  var vPhone = phone.val();
  var vEmail = email.val();
  if(regexPatterns.phone(phoneNum)) {
    $.ajax({
      type: 'POST',
      url: '/account/api/forget/phone',
      data: {username: vEmail, phone: vPhone},
      success: function() {
        phone.removeClass('error');
        captchaTip.removeClass('show');
        btnSend.addClass('disabled');
        submit.removeClass('disabled');
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
  var that = $(this);
  if (!$(this).hasClass('disabled')) {
    var vEmail = email.val();
    var vPhone = phone.val();
    var vPassword = password.val();
    var vCode = code.val();
    if (!email.parent().hasClass('hidden')) {
      $('.wrapper').addClass('hidden');
      $(this).parent().next().children('.submit').addClass('disabled');
      $(this).parent().next().removeClass('hidden');
    } else if (!password.parent().parent().hasClass('hidden')) {
      $.ajax({
        type: 'POST',
        url: '/account/api/forget',
        data: {username: vEmail, phone: vPhone, code: vCode, password: vPassword},
        success: function() {
          captchaTip.removeClass('show');
          submit.removeClass('disabled');
          $('.wrapper').addClass('hidden');
          that.parent().next().removeClass('hidden');
        },
        error: function(err) {
          pwdTip.addClass('show');
          pwdTip.text(JSON.parse(err.responseText).errors[0].message);
        }
      });
    } else {
      window.location.href = '/account/login';
    }
  }
});
email.blur(function() {
  var vEmail = email.val();
  if (regexPatterns.email(vEmail)) {
    email.removeClass('error');
  } else {
    email.addClass('error');
  }
});
repassword.keyup(keyupInput);
password.keyup(keyupInput);

function keyupInput() {
  var vPassword = password.val();
  var vRePassword = repassword.val();
  if (!vPassword) {
    password.addClass('error');
    repassword.parent().next().addClass('disabled');
  } else if (vPassword  && vPassword !== vRePassword) {
    password.removeClass('error');
    repassword.addClass('error');
    repassword.parent().next().addClass('disabled');
  } else {
    repassword.removeClass('error');
    repassword.parent().parent().children('.submit').removeClass('disabled');
  }
}
