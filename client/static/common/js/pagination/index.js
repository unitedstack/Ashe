function PageNav(params){
  this.$box = $('#' + params.boxid);
  this.pageAmount = Number($('.content-main').attr('count'));
  this.page = Number($('.content-main').attr('page'));
  this.gotoPage(this.page);
}
PageNav.prototype.changeUrl = function(num) {
  if (window.location.href.indexOf('lang') !== -1) {
    window.location.href = window.location.href.split('lang=')[0] + 'page=' + num;
  } else if (window.location.href.indexOf('page') === -1) {
    window.location.href = window.location.href + '?page=' + num;
  } else {
    window.location.href = window.location.href.split('=')[0] + '=' + num;
  }
};
PageNav.prototype.gotoPage = function(number){

  var arrowLeft = '<i class="icon-arrow-left"></i>';
  var arrowRight = '<i class="icon-arrow-right"></i>';
  if(Number(number) >= 1 && Number(number) <= this.pageAmount){
    this.page = number;
  }else{
    this.pageAmount = 1;
    this.page = 1;
  }
  this.$box.empty();
  $('.content-main').attr('page', this.page);
  if(this.pageAmount <= 7){
    this.page != 1 && $('<a class="cPrev"></a>').html(arrowLeft).appendTo(this.$box);
    for(var i = 0 ; i < this.pageAmount ; i++){
      $('<a></a>').addClass('nBtn').html(i + 1).appendTo(this.$box);
    }
    this.page != this.pageAmount && $('<a class="cNext"></a>').html(arrowRight).appendTo(this.$box);
    this.$box.find('.nBtn').eq(this.page - 1).addClass('cur');
  }else if(this.page < 4){
    this.page != 1 && $('<a></a>').addClass('cPrev').html(arrowLeft).appendTo(this.$box);
    for(var i2 = 1; i2 <= 4; i2 ++) {
      $('<a></a>').addClass('nBtn').html(i2).appendTo(this.$box);
    }
    $('<a></a>').addClass('ellipsis').html('...').appendTo(this.$box);
    $('<a></a>').addClass('nBtn').html(this.pageAmount).appendTo(this.$box);
    $('<a></a>').addClass('cNext').html(arrowRight).appendTo(this.$box);
    this.$box.find('.nBtn').eq(this.page - 1).addClass('cur');
  }else if(this.page <= this.pageAmount - 3){
    $('<a></a>').addClass('cPrev').html(arrowLeft).appendTo(this.$box);
    $('<a></a>').addClass('nBtn').html(1).appendTo(this.$box);
    $('<a></a>').addClass('ellipsis').html('...').appendTo(this.$box);
    for(var i3 = -1; i3 <= 1; i3 ++) {
      $('<a></a>').addClass(i !== 0 ? 'nBtn' : 'nBtn cur').html(this.page + i3).appendTo(this.$box);
    }
    $('<a></a>').addClass('ellipsis').html('...').appendTo(this.$box);
    $('<a></a>').addClass('nBtn').html(this.pageAmount).appendTo(this.$box);
    $('<a></a>').addClass('cNext').html(arrowRight).appendTo(this.$box);
  } else {
    $('<a></a>').addClass('cPrev').html(arrowLeft).appendTo(this.$box);
    $('<a></a>').addClass('nBtn').html(1).appendTo(this.$box);
    $('<a></a>').addClass('ellipsis').html('...').appendTo(this.$box);
    for(var i4 = -2; i4 <= 0; i4 ++) {
      $('<a></a>').addClass('nBtn').html(this.pageAmount + i4).appendTo(this.$box);
    }
    this.page != this.pageAmount && $('<a></a>').addClass('cNext').html(arrowRight).appendTo(this.$box);

    this.$box.find('.nBtn').eq(this.page - this.pageAmount -1).addClass('cur');
  }
  this.bindEvent();
};
PageNav.prototype.bindEvent = function(){
  var self = this;
  $('.nBtn').click(function(){
    var i = parseInt($(this).html());
    self.changeUrl(i);
    self.gotoPage(i);
  });

  $('.cPrev').click(function(){
    var i = self.page - 1;
    self.changeUrl(i);
    self.gotoPage(i);
    return false;
  });

  $('.cNext').click(function(){
    var i = self.page + 1;
    self.changeUrl(i);
    self.gotoPage(i);
    return false;
  });
};

new PageNav({
  'boxid' : 'pn'
});
