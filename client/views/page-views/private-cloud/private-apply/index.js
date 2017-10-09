require('./style/index.less');

function cNameModlue() {
  var valname = $.trim($('.regname').val());
  if(valname == ''){
    $('.icon-user').parents('.circle').removeClass('right');
    $('.icon-user').parents('.circle').addClass('selected');
    return false;
  }
  if(!valname.match(/^\S{2,}$/)){
    $('.icon-user').parents('.circle').removeClass('right');
    $('.icon-user').parents('.circle').addClass('selected');
    $('.regname').focus();
  }else{
    $('.icon-user').parents('.circle').removeClass('selected');
    $('.icon-user').parents('.circle').addClass('right');
    return true;
  }
}

$('.regname').blur(function(){
  cNameModlue();
});
function checkEmail() {
  if($('.regemail').val()==''){
    $('.icon-eemail').parents('.circle').removeClass('right');
    $('.icon-eemail').parents('.circle').addClass('selected');
    return false;
  }
  var email=$('.regemail').val();
  if(!email.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)){
    $('.icon-eemail').parents('.circle').removeClass('right');
    $('.icon-eemail').parents('.circle').addClass('selected');
    $('.regemail').focus();
  }else{
    $('.icon-eemail').parents('.circle').removeClass('selected');
    $('.icon-eemail').parents('.circle').addClass('right');
  }
}
$('.regemail').blur(function(){
  checkEmail();
});
function checkPhone() {
  if($('.regtel').val==''){
    $('.icon-tel').parents('.circle').removeClass('right');
    $('.icon-tel').parents('.circle').addClass('selected');
  }
  var tel=$('.regtel').val();
  if(!tel.match(/^1(3|4|5|7|8)\d{9}$/)){
    $('.icon-tel').parents('.circle').removeClass('right');
    $('.icon-tel').parents('.circle').addClass('selected');
    $('.regtel').focus();
  }else{
    $('.icon-tel').parents('.circle').removeClass('selected');
    $('.icon-tel').parents('.circle').addClass('right');
  }
}
$('.regtel').blur(function(){
  checkPhone();
});

function checkHome(){
  if($('.reghome').val==''){
    $('.icon-myhome').parents('.circle').removeClass('right');
    $('.icon-myhome').parents('.circle').addClass('selected');
  }
  var home=$('.reghome').val();
  if(!home.match(/^[\u4E00-\u9FA5]{1,6}|[A-Za-z0-9_-]+$/)){
    $('.icon-myhome').parents('.circle').removeClass('right');
    $('.icon-myhome').parents('.circle').addClass('selected');
    $('.reghome').focus();
  }else{
    $('.icon-myhome').parents('.circle').removeClass('selected');
    $('.icon-myhome').parents('.circle').addClass('right');
  }
}
$('.reghome').blur(function(){
  checkHome();
});
window.onload = window.onresize = function(){
  $('.button').unbind('click');
  $('.box-replace').click(function(){
    $(this).toggleClass('selected');
  });

  $('.button').click(function(){
    $(this).parents('.btn').toggleClass('selected');
    $('.summarize').toggleClass('selected');
  });
  $('.comment-star li').unbind('click');
  $('.comment-star li').each(function(index){
    $(this).click(function(){
      if ($(this).nextAll().hasClass('selected')) {
        $(this).nextAll().removeClass('selected');
        $(this).prevAll().addClass('selected');
        $(this).addClass('selected');
      } else if ($(this).hasClass('selected')){
        $(this).removeClass('selected');
        $(this).prevAll().removeClass('selected');
      } else {
        $(this).toggleClass('selected');
        $(this).prevAll().addClass('selected');
      }
    });
  });
};

$('.submit').click(function() {
  var vName = $('.regname').val();
  var vEmail = $('.regemail').val();
  var vPhone = $('.regtel').val();
  var vCompany = $('.reghome').val();
  var vRemark = $('.remark').val();
  var data = {
    nickname: vName,
    email: vEmail,
    phone: vPhone,
    company: vCompany
  };
  if (vRemark) {
    data.description = vRemark;
  }
  if (!$('.btn').hasClass('selected')) {
    var vEvaluation = [$('.seconds .selected').length, $('.total .selected').length,
      $('.nature .selected').length, $('.terrace .selected').length].join();
    data.evaluation = vEvaluation;
  }
  $.ajax({
    type: 'POST',
    url: '/apply/api/private-cloud',
    data: data,
    success: function() {
      $('.tip').css('display','block');
      $('.none').css('display', 'none');
      $('.over').css('display', 'block');
    },
    error: function(err) {
      $('.over').css('display', 'none');
      $('.none').css('display', 'block');
      $('.none').text(JSON.parse(err.responseText).errors[0].company);
    }
  });
});
