require('./style/index.less');

window.onload = window.onresize = function(){
  if(!G.mobile){
    $('.partner > .wraper').click(function(event){
      $(this).addClass('selected');
      $('.cloth').addClass('selected');
    });
    $(document).click(function(event){
      var _con = $('.partner');
      if(!_con.is(event.target) && _con.has(event.target).length === 0){
        $('.wraper').removeClass('selected');
        $('.cloth').removeClass('selected');
      }
    });
  }
  
  if(G.mobile){
    $('.partner > .wraper').unbind('click');
    $('.partner > .wraper').click(function(event){
      $(this).toggleClass('selected');
      if($(this).hasClass('selected')){
        $('.wraper').removeClass('selected');
        $(this).addClass('selected');
      }
    });
  }
};