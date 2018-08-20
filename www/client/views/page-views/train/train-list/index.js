require('./style/index.less');

window.onload = window.onresize = function(){
  var per = $('.wrapper .cover .per');
  var tr = $('.trainlist .pctable .tr');
  $('.wrapper .cover .per').unbind('click');
  $('.pctable .tbody .tr').unbind('click');
  $('.per .icon').removeClass('selected');
  $('.mobiletable').css('display', 'none');
  $('.pctable .tbody .tr').each(function(){
    $(this).click(function(){
      $(this).children('.icon').toggleClass('selected');
      $(this).next('.info').slideToggle();
      if($(this).children('.icon').hasClass('selected')){
        $(this).css('background','#0280DF');
        $(this).css('color','#ffffff');
        $(this).children('.icon').css('color','#fff');
        $(this).mouseleave(function(){
          $(this).css('background','#0280DF');
          $(this).css('color','#ffffff');
          $(this).children('.icon').css('color','#fff');
        });
        $(this).mouseenter(function(){
          $(this).css('background','#0280DF');
          $(this).css('color','#ffffff');
          $(this).children('.icon').css('color','#fff');
        });
      } else if ($(this).children('.icon').removeClass('selected')) {

        $(this).css('background','#fff');
        $(this).css('color', '#0280DF');
        $(this).children('.icon').css('color','#0280DF');
        $(this).mouseleave(function(){
          $(this).css('background','#fff');
          $(this).css('color', '#333333');
          $(this).children('.icon').css('color','#0280DF');
        });
        $(this).mouseenter(function(){
          $(this).css('color', '#0280DF');
          $(this).css('background','#fff');
          $(this).children('.icon').css('color','#0280DF');
        });
      }else {
        $(this).css('background','#fff');
        $(this).css('color', '#333333');
        $(this).children('.icon').css('color','#0280DF');
        $(this).mouseleave(function(){
          $(this).css('background','#fff');
          $(this).css('color', '#333333');
          $(this).children('.icon').css('color','#0280DF');
        });
        $(this).mouseenter(function(){
          $(this).css('background','#fff');
          $(this).css('color', '#333333');
          $(this).children('.icon').css('color','#0280DF');
        });
      }
    });
  });
  per.each(function() {
    $(this).on({
      click: function(e) {
        var type = $(this).data('course-type');
        $(this).addClass('selected').siblings(per).removeClass('selected');
        if (type == 'all') {
          $('.pctable .tbody .tr').css('background','#fff');
          $('.pctable .tbody .tr .icon').css('color','#0280DF');
          $('.pctable .tbody .tr .icon').removeClass('selected');
          tr.addClass('selected');
          $('.pctable .tbody .tr').css('color','#333333');
          $(this).mouseleave(function(){
            $(this).css('color', '#333333');
            $(this).css('background-color', '#ffffff');
            $(this).children('.icon').css('color','#0280DF');
          });
          $(this).mouseenter(function(){
            $(this).css('color', '#0280DF');
            $(this).children('.icon').css('color','#0280DF');
            $(this).css('background-color', '#ffffff');
          });
        } else {
          tr.removeClass('selected');
          tr.each(function() {
            if ($(this).data('course-type') === type) {
              $('.pctable .tbody .tr').css('background','#fff');
              $('.pctable .tbody .tr .icon').css('color','#0280DF');
              $('.pctable .tbody .tr .icon').removeClass('selected');
              $(this).addClass('selected');
              $('.pctable .tbody .tr').css('color','#333333');
              $(this).mouseleave(function(){
                $(this).css('color', '#333333');
                $(this).children('.icon').css('color','#0280DF');
                $(this).css('background-color', '#ffffff');
              });
              $(this).mouseenter(function(){
                $(this).css('color', '#0280DF');
                $(this).children('.icon').css('color','#0280DF');
                $(this).css('background-color', '#ffffff');
              });
            }
          });
        }
        $('.pctable .tbody .info').css('display','none');
      }
    });
  });
};
