require('./style/index.less');

window.onload = window.onresize = function(){
  $('.alljourney > .journey > .left > .extend').click(function(){
    $(this).parents('.left').toggleClass('selected');
  });
  $(document).ready(function(e){
    if($('.alljourney').width()>300){
      $('.special').hide();
    }
  });
};
