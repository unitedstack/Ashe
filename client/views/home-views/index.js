require('./style/index.less');
$('.content-banner').height(G.viewHeight);
$('.content-banner .carousel').height(G.viewHeight);
$('.content-banner .carousel .wrapper .m_unit li').height(G.viewHeight);

window.onload = window.onresize = function(){
  var $circleLis = $('#circle .item');
  var $wrapper = $('#wrapper');
  var idx = 0, nowLeft;
  var imgWidth = $(window).width();

  $('.content-banner').height(G.viewHeight);
  $('.content-banner .carousel').height(G.viewHeight);
  $('.content-banner .carousel .wrapper .m_unit li').height(G.viewHeight);

  $circleLis.click(function(){
    idx = $(this).index();
    nowLeft = idx * imgWidth;
    $wrapper.stop(true).animate({'left': -nowLeft},1000);
    $circleLis.eq(idx).children().addClass('cur').parent().siblings().children().removeClass('cur');
    $('#circle > .item > .li.circle_left > span').css('background','rgba(255, 255, 255, 0.4)');
    $('#circle > .item > .li.circle_left.cur > span').css('background','rgba(255, 255, 255, 1)');
  });

  $('.service').click(function(){
    location.href = '/private-cloud/private-service';
  });
  $('.construction').click(function(){
    location.href = '/private-cloud/private-skill';
  });
  $('.om').click(function(){
    location.href = '/private-cloud/private-start';
  });
  $('.documents').click(function(){
    location.href = '/docs';
  });
  if(!G.mobile){
    $('.milestones').unbind('click');
    $('.contact').unbind('click');
    $('.train').unbind('click');
    $('.recruitment').unbind('click');
    var txtNum= $('#fold').html(); 
    var htmlStr='';
    if(txtNum.length > 10){
      htmlStr =txtNum.substring(0,txtNum.length-10);
      htmlStr = htmlStr+'......';
      $('#fold').html(htmlStr);
    }
    $('.framephoto4').mouseenter(function(event){
      event.stopPropagation();
      $('.framephoto1').css('background-image','url(/static/assets/framework-1-2.png)');
      $('.framephoto2').css('background-image','url(/static/assets/framework-2-2.png)');
      $('.framephoto3').css('background-image','url(/static/assets/framework-3-2.png)');
    });
    $('.framephoto3').mouseenter(function(event){
      event.stopPropagation();
      $('.framephoto1').css('background-image','url(/static/assets/framework-1-2.png)');
      $('.framephoto2').css('background-image','url(/static/assets/framework-2-2.png)');
      $('.framephoto4').css('background-image','url(/static/assets/framework-4-2.png)');
    });
    $('.framephoto2').mouseenter(function(event){
      event.stopPropagation();
      $('.framephoto1').css('background-image','url(/static/assets/framework-1-2.png)');
      $('.framephoto3').css('background-image','url(/static/assets/framework-3-2.png)');
      $('.framephoto4').css('background-image','url(/static/assets/framework-4-2.png)');
    });
    $('.framephoto1').mouseenter(function(event){
      event.stopPropagation();
      $('.framephoto2').css('background-image','url(/static/assets/framework-2-2.png)');
      $('.framephoto3').css('background-image','url(/static/assets/framework-3-2.png)');
      $('.framephoto4').css('background-image','url(/static/assets/framework-4-2.png)');
    });
    $('.framephoto1').mouseleave(function(event){
      event.stopPropagation();
      $('.framephoto2').css('background-image','');
      $('.framephoto3').css('background-image','');
      $('.framephoto4').css('background-image','');
    });
    $('.framephoto2').mouseleave(function(event){
      event.stopPropagation();
      $('.framephoto1').css('background-image','');
      $('.framephoto3').css('background-image','');
      $('.framephoto4').css('background-image','');
    });
    $('.framephoto3').mouseleave(function(event){
      event.stopPropagation();
      $('.framephoto1').css('background-image','');
      $('.framephoto2').css('background-image','');
      $('.framephoto4').css('background-image','');
    });
    $('.framephoto4').mouseleave(function(event){
      event.stopPropagation();
      $('.framephoto1').css('background-image','');
      $('.framephoto2').css('background-image','');
      $('.framephoto3').css('background-image','');
    });
  }
  if(G.mobile){
    $('.milestones').click(function(){
      location.href = '/about/milestones';
    });
    $('.contact').click(function(){
      location.href = '/about/contact-us';
    });
    $('.train').click(function(){
      location.href = '/training/train';
    });
    $('.recruitment').click(function(){
      location.href = '/about/jobs';
    });
    $('.list1').click(function(){
      location.href = '/product/uos-director';
    });
    $('.list2').click(function(){
      location.href = '/product/uos-enterprise';
    });
    $('.list3').click(function(){
      location.href = '/product/uos-halo';
    });
    $('.list4').click(function(){
      location.href = '/product/uos-operation-monitor';
    });
  }
};