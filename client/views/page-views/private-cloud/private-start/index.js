require('./style/index.less');

window.onload = window.onresize = window.onscroll = function(){
  //点击时间弹出、隐藏
  $(document).click(function(event){
    var _con = $('.cloth-content');
    if(!_con.is(event.target) && _con.has(event.target).length === 0){
      close();
    }
  });

  if(!G.mobile){
    $('.paper').css({'height': document.body.clientHeight});
    $('.source ul li').click(function(event){
      event.stopPropagation();
      $('.paper').addClass('selected');
      $('body').css('overflow', 'hidden');
      $('.totop').css('display', 'none');
    });
    $('.close').click(function(){
      close();
    });
  }
  if (G.mobile) {
    $('.paper').css({'height': document.body.clientHeight});
    $('.source ul li').click(function(event){
      event.stopPropagation();
      $('.paper').addClass('selected');
      $('body').css('overflow', 'hidden');
      $('.totop').css('display', 'none');
    });
  }
  $('.mobilex').click(function(event){
    event.stopPropagation();
    if(G.mobile){
      close();
    }
  });
};

function close() {
  event.stopPropagation();
  $('.paper').removeClass('selected');
  $('body').css('overflow', '');
  $('.totop').css('display', '');
}


//正则验证姓名、电话等
function cNameModlue() {
  var valname = $.trim($('.regname').val());
  if(valname == ''){
    $('.icon-user').parents('.line').addClass('selected');
    return false;
  }
  if(!valname.match(/^\S{2,}$/)){
    $('.icon-user').parents('.line').addClass('selected');
    $('.regname').focus();
  }else{
    $('.icon-user').parents('.line').removeClass('selected');
    return true;
  }
}
$('.regname').blur(function(){
  cNameModlue();
});

function checkEmail() {
  if($('.regemail').val()==''){
    $('.icon-eemail').parents('.line').addClass('selected');
    return false;
  }
  var email=$('.regemail').val();
  if(!email.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)){
    $('.icon-eemail').parents('.line').addClass('selected');
    $('.regemail').focus();
  }else{
    $('.icon-eemail').parents('.line').removeClass('selected');
  }
}
$('.regemail').blur(function(){
  checkEmail();
});

function checkPhone() {
  if($('.regtel').val==''){
    $(this).parents('.line').addClass('current');
  }
  var tel=$('.regtel').val();
  if(!tel.match(/^1(3|4|5|7|8)\d{9}$/)){
    $('.icon-tel').parents('.line').addClass('selected');
    $('.regtel').focus();
  }else{
    $('.icon-tel').parents('.line').removeClass('selected');
  }
}
$('.regtel').blur(function(){
  checkPhone();
});

function checkHome(){
  if($('.reghome').val==''){
    $(this).parents('.line').addClass('current');
  }
  var home=$('.reghome').val();
  if(!home.match(/^[\u4E00-\u9FA5]{1,6}|[A-Za-z0-9_-]+$/)){
    $('.icon-myhome').parents('.line').addClass('selected');
    $('.reghome').focus();
  }else{
    $('.icon-myhome').parents('.line').removeClass('selected');
  }
}
$('.reghome').blur(function(){
  checkHome();
});