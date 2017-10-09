require('./style/index.less');

function subString(str, len) {
  var newLength = 0, newStr = '', singleChar, length;
  var m = encodeURIComponent(str).match(/%[89ABab]/g);
  length = str.length + (m ? m.length / 2 : 0);
  for(var i = 0; i < str.length; i ++) {
    singleChar = str.charAt(i).toString();
    if (singleChar.match(/[^\x00-\xff]/g) !== null) {
      newLength += 2;
    } else {
      newLength += 1;
    }
    if (newLength > len) {
      break;
    }
    newStr += singleChar;
  }
  if (length > len) {
    newStr += ' ...';
  }
  return newStr;
}

window.onload = window.onresize = function(){
  var prev = $('.prev a').attr('prev');
  var next = $('.next a').attr('next');
  var wordLength = Math.floor($('.left-content').width() * .44 / 12 - 8);
  var prevWord = prev && subString(prev, wordLength * 2);
  var nextWord = next && subString(next, wordLength * 2);
  prev && $('.prev a').html(prevWord);
  next && $('.next a').html(nextWord);
  var text = $('.wangEditor-txt').attr('content');
  $('.wangEditor-txt').html(text);
  $('.search .input').click(function(e) {
    if (document.body.clientWidth <= 1025) {
      $('.search').addClass('search-mobile');
      $('article').css({'background-color': 'rgba(11, 24, 29, .85)', 'min-height': '1120px'});
      $('.right-content .down').removeClass('hidden');
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

  $('.icon_srch').click(function() {
    var name = $('input').val();
    window.location.href = name ? '/news/search/' + name : '/news?page=1';
  });
  $('input').keydown(function(e){
    if(e.keyCode==13){
      var name = $('input').val();
      window.location.href = name ? '/news/search/' + name : '/news?page=1';
    }
  });
};
