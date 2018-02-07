require('./style/index.less');
require('../../../static/common/js/pagination/index');

window.onload = window.onresize = function(){
  if (window.location.href.indexOf('search') !== -1) {
    $('input').attr('value', decodeURI(window.location.href.split('search/')[1]));
  }
  $('.search .input').click(function() {
    if (document.body.clientWidth <= 1025) {
      $('.search').addClass('search-mobile');
      $('article').css({'background-color': '#0B181D', 'min-height': '1120px'});
      $('.header-left').css({'background-color': '#030819'});
      $('.right-content .down').removeClass('hidden');
      $('.content-banner').css('display', 'none');
      $('.content-main').css('padding-top', '50px');
      $('.content-wrapper').css('display','none');
      $('.mobile-footer').css('display','none');
      $('.right-content .search .input').addClass('search-input');
      $('.right-content .search .input input').addClass('input-mobile');
      $('.right-content .search .icon_srch').addClass('icon-mobile');
      $('.right-content .tags').addClass('tag-mobile');
      $('.right-content .tags .tags-title').addClass('title-mobile');
      $('.right-content .tags .tags-content').css('color', '#fff');
      $('.right-content .head-line').addClass('line-mobile');
      $('.right-content .head-line .title').removeClass('head-title').addClass('head-mobile');
      $('.right-content .head-content li').addClass('li-mobile');
      $('.left-content').css('display', 'none');
      $('.right-content .head-content li').removeClass('head-li');
      $('.right-content .head-content img').removeClass('head-img').addClass('hidden');
      $('.right-content .head-content a').removeClass('head-a');
      $('.pagination').css('display', 'none');
      $('.srh').css('display', 'none');
    }
  });
  $('.right-content .down').click(function() {
    $('article').css({'background-color': '', 'min-height': ''});
    $('.left-content').css('display', 'block');
    $('.right-content .tags').removeClass('tag-mobile');
    $('.right-content .tags .tags-title').removeClass('title-mobile');
    $('.right-content .tags .tags-content').css('color', '#999999');
    $('.right-content .head-line').removeClass('line-mobile');
    $('.right-content .head-line .title').addClass('head-title').removeClass('head-mobile');
    $('.right-content .head-content li').removeClass('li-mobile');
    $('.right-content .down').addClass('hidden');
    $('.search').removeClass('search-mobile');
    $('.right-content .search .input').removeClass('search-input');
    $('.right-content .search .input input').removeClass('input-mobile');
    $('.right-content .search .icon_srch').removeClass('icon-mobile');
    $('.right-content .head-content li').addClass('head-li');
    $('.right-content .head-content img').addClass('head-img').removeClass('hidden');
    $('.right-content .head-content a').addClass('head-a');
    $('.pagination').css('display', 'block');
    $('.srh').css('display', 'block');
    $('.content-banner').css('display', '');
    $('.content-main').css('padding-top', '');
    $('.content-wrapper').css('display','');
    $('.mobile-footer').css('display','');
  });
  if (document.body.clientWidth >= 1010) {
    $('article').css({'background-color': '', 'min-height': ''});
    $('.left-content').css('display', 'block');
    $('.right-content .tags').removeClass('tag-mobile');
    $('.right-content .tags .tags-title').removeClass('title-mobile');
    $('.right-content .tags .tags-content').css('color', '#999999');
    $('.right-content .head-line').removeClass('line-mobile');
    $('.right-content .head-line .title').addClass('head-title').removeClass('head-mobile');
    $('.right-content .head-content li').removeClass('li-mobile');
    $('.right-content .down').addClass('hidden');
    $('.search').removeClass('search-mobile');
    $('.right-content .search .input').removeClass('search-input');
    $('.right-content .search .input input').removeClass('input-mobile');
    $('.right-content .search .icon_srch').removeClass('icon-mobile');
    $('.right-content .head-content li').addClass('head-li');
    $('.right-content .head-content img').addClass('head-img').removeClass('hidden');
    $('.right-content .head-content a').addClass('head-a');
    $('.pagination').css('display', 'block');
    $('.srh').css('display', 'block');
  }

  if (window.location.href.indexOf('tag') !== -1) {
    var blog_tag = window.location.href.split('tag/')[1];
    $('.tags-item').each(function(_index, _ele){
      if ($(_ele).attr('tag') === blog_tag) {
        $(_ele).addClass('checked');
      }
    });
  }

  $('.tags-item').click(function() {
    if ($(this).hasClass('checked')) {
      window.location.href = '/news?page=1';
    } else {
      var tag = $(this).attr('tag');
      window.location.href = '/news/tag/' + tag;
    }
  });

  $('.icon_srch').click(function() {
    var name = $('input').val();
    window.location.href = name ? '/news/search/' + name : '/news?page=1';
  });

  $('input').keydown(function(e){
    var name = $('input').val();
    if(e.keyCode==13){
      window.location.href = name ? '/news/search/' + name : '/news?page=1';
    }
  });
};
