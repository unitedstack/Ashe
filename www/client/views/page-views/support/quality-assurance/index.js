require('./style/index.less');

$(function() {
  var $navs = $('.agreement-nav li');
  var $anchors = $('.agreement-list .agreement-wrapper');
  
  $navs.on('click', navClickHandler);

  function navClickHandler(evt) {
    var $target = $(evt.target);
    var index = $navs.index($target);
    $target.siblings().addBack().removeClass('checked');
    $target.addClass('checked');
    
    var anchor = $anchors.get(index);
    anchor.scrollIntoView();
    window.scrollBy(0, -100);
  }
});