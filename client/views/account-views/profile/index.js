require('./style/index.less');

$('.volcano-global-header').css('background','rgba(11, 24, 29, 0.8)');
$(window).on({
  scroll: function() {
    G.bodyPST = G.bodyCST;
    G.bodyCST = document.body.scrollTop || document.documentElement.scrollTop;
    G.bodyDir = G.bodyPST > G.bodyCST ? -1 : 1;
    if (G.bodyCST > 40) {
      G.header.css({backgroundColor: 'rgba(11, 24, 29, 0.8)'});
      G.toTop.css({opacity: 1});
    } else {
      G.toTop.css({opacity: 1});
      G.header.css({backgroundColor: 'rgba(11, 24, 29, 0.8)'});
    }
  }
});
$('#header-center > li').mouseenter(function() {
  if(!G.mobile) {
    G.header.css({backgroundColor: 'rgba(11, 24, 29, 0.8)'});
  }
}).mouseleave(function() {
  if(G.bodyCST <= 40 && !G.mobile) {
    G.header.css({backgroundColor: 'rgba(11, 24, 29, 0.8)'});
  }
});
if (screen.height == 768) {
  $('.volcano-profile').height(500);
} else if (screen.height == 900) {
  $('.volcano-profile').height(685);
}else if (screen.height == 1440) {
  $('.volcano-profile').height(1310);
}else {
  $('.volcano-profile').height(900);
}