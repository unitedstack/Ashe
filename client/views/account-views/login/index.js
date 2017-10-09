require('./style/index.less');

var captchaTip = $('#captcha-tip');
$('#icon-eye').click(function() {
  $('#pwd').attr('type', function(index, oldvalue) {
    return oldvalue === 'password' ? 'text' : 'password';
  });
});

$('.submit').click(function() {
  var vEmail = $('.email').val();
  var vPassword = $('.password').val();
  $.ajax({
    type: 'POST',
    url: '/account/api/login',
    data: {
      username: vEmail,
      password: vPassword
    },
    success: function() {
      var href = window.location.href.split('?')[1];
      window.location.href = href || '/';
    },
    error: function(err) {
      captchaTip.addClass('show');
      captchaTip.text(JSON.parse(err.responseText).errors[0].message);
    }
  });
});