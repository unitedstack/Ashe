require('./style/index.less');

window.onload = window.onresize = function(){
  var liList= $('table > tbody > tr');
  liList.each(function(i,item){
    if(i==0){
      i=liList.length;
    }else if(i==liList.length){
      i=0;
    }
  });
  var idx=0;
  $('.icon-arrow-left').click(function(){
    idx--;
    $(this).parents('tr').removeClass('selected');
    $(this).parents('tr').prev().addClass('selected');
    if(idx == -1){
      $('table > tbody > tr.first').removeClass('selected');
      $('table > tbody > tr.last').addClass('selected');
    }
  });
  $('.icon-arrow-right').click(function(){
    idx++;
    $(this).parents('tr').removeClass('selected');
    $(this).parents('tr').next().addClass('selected');
    if(idx == $('tr').length){
      $('table > tbody > tr.last').removeClass('selected');
      $('table > tbody > tr.first').addClass('selected');
    }
  });
};