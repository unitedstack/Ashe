/*
 * @Author: PengJiyuan
 * @Description: init a slide menu automatically via the article content
 * 
 * @params aside {selector} the selector of aside menu (not jquery selector)
 * @params content {selector} the selector of article content (not jquery selector)
 * 
 * @return {Function}
 */

function slideMenu(aside, content, option) {
  this.aside = aside || document.getElementById('fixedBar');
  this.content = content || document.getElementById('jobsContent');
  this.option = Object.prototype.toString.call(option) === '[object Object]' ? option : {};
  // memu collections
  this.menus = [];
  // no wrapper array
  this._menus = [];
  this.menuHeights = [];
  // cloth scroll bar
  this.scroll = $('#menu-scroll');
  // cloth selected menu item
  this.selectItem = $('#menu-selectItem');
  this.articleList = document.querySelectorAll('.single,.notuse');
  this.arrowUp = $('#arrow-up');
  this.arrowDown = $('#arrow-down');
  // whether the menu wrapper is animating
  this.isWalk = false;
  // click up or down btn, the length menu wrapper move
  this.scrollPace = this.option.scrollPace || 300;
  this.menuWrapperScrollTop = 0;
  this.isLocateBrick = this.option.isLocateBrick || true;
  this.notClick = false;
  this.isBrickRelocate = true;
}

slideMenu.prototype = {

  init: function() {
    this.initScrollPosition();
    this.initMenuData();
    this.initAside();
    this._menus = this.getSeparateMenu(this.menus);
    this.initCloth();
    this.initScroll();
  },

  initScrollPosition: function() {
    var that = this;
    $('html, body').animate({
      scrollTop: 0
    }, 300);
  },

  initMenuData: function() {
    var that = this;
    var num = 0;
    this.subproject = $('.subproject');
    this.subproject.each(function() {
      var menuArray = [];
      menuArray.push({
        type: 'title',
        text: $(this).attr('data-title'),
        index: num++
      });
      $(this).children().filter('.single').each(function() {
        menuArray.push({
          type: 'item',
          text: $(this).find('.title').text(),
          index: num++
        });
      });
      that.menus.push(menuArray);
    });
  },

  initAside: function() {
    var that = this;
    var menuItem;
    var submenusLength = this.menus.length;
    this.maxAsideHeight = G.viewHeight - 100 - 40;
    // init aside height
    this.aside.style.height = this.maxAsideHeight + 'px';
    this.menuWrapper = $('#fixedBar > .wrapper > .menu-wrapper');
    for(var i = 0; i < submenusLength; i ++) {
      this.menuWrapper.append('<li class="subproject ' + (i === 0 ? 'select' : '') + '"></li>');
    }
    // init menu items and attach events
    $('#fixedBar > .wrapper > .menu-wrapper > li').each(function(index) {
      $(this).append('<span class="menu-item">' + that.menus[index][0].text + '</span>')
        .append('<ul></ul>');
      that.menus[index].forEach(function(item, i) {
        if(item.type === 'item') {
          $('#fixedBar > .wrapper > .menu-wrapper > li > ul')
          .eq(index)
          .append('<li><div class="menu-item">' +item.text+ '</div></li>');

          menuItem = $('#fixedBar > .wrapper > .menu-wrapper > li > ul')
            .eq(index)
            .children()
            .find('div')
            .eq(i - 1);
          // get each menu item's outer width and push into array
          that.menus[index][i].width = menuItem.outerWidth();
          that.initMenuItemEvent(menuItem, item.index, index);
        }

      });
      // push each subproject's outerheight to array
      that.menuHeights.push($(this).outerHeight() + 40);
    });
    this.menuList = $('.menu-item');

    // init arrow up and down
    this.menuTotalHeight = document.getElementsByClassName('menu-wrapper')[0].scrollHeight;
    this.menuWrapper = $('#fixedBar > .wrapper');
    if(this.menuTotalHeight > this.maxAsideHeight) {
      document.getElementById('fixedBtn').style.right = 30 + 'px';
      this.arrowUp.click(function() {
        that.moveMenuWrapper(true);
      });
      this.arrowDown.click(function() {
        that.moveMenuWrapper(false);
      });
    }
  },

  moveMenuWrapper: function(direction) {
    var that = this;
    this.menuWrapper.animate({
      scrollTop: direction ? this.menuWrapperScrollTop - this.scrollPace : this.menuWrapperScrollTop + this.scrollPace
    }, 300, function() {
      that.menuWrapperScrollTop = that.menuWrapper.scrollTop();
    });
  },

  initCloth: function() {
    this.scroll.height(this.menuHeights[0]);
  },

  /*
   * @params items {jQuery selector array}
   *
   * @Description: attach event on each menu item
   */
  initMenuItemEvent: function(item, index, wrapperIndex) {
    var that = this;
    var top = item.offset().top;
    item.click(function() {
      if(G.mobile) {
        return;
      }
      that.setPage(index);
      that.setSelectItem(item, index, wrapperIndex, top);
    });
  },

  setPage: function(index) {
    var top = document.querySelectorAll('.subproject > li')[index].offsetTop;
    if(!this.notClick) {
      $('html, body').scrollTop(top + 380);
      this.isBrickRelocate = false;
    }
    this.notClick = false;
  },

  setSelectItem: function(item, index, wrapperIndex, top) {
    var that = this;
    var getHeight = function(index) {
      var h = 0;
      for(var i = 0;i <= index; i++) {
        h += that.menuHeights[i];
      }
      return h;
    }
    // handle select item
    this.selectItem.css({
      width: this._menus[index].width + 20,
      top: top - 640
    });
    $('.subproject > ul > li').each(function(m) {
      $(this).removeClass('select');
    });
    item.parent().addClass('select');
    item.parent().parent().parent().addClass('select').siblings().removeClass('select');
    this.scroll.css({
      height: this.menuHeights[wrapperIndex],
      top: wrapperIndex > 0 ? getHeight(wrapperIndex - 1): 0
    });
    //relocate menu wrapper
    if(item[0].getBoundingClientRect().top + item.height() - $('.wrapper')[0].getBoundingClientRect().top - $('.wrapper').height() > 0) {
      this.moveMenuWrapper(false);
    } else if(item[0].getBoundingClientRect().top - $('.wrapper')[0].getBoundingClientRect().top < 0) {
      this.moveMenuWrapper(true);
    }
  },

  initScroll: function() {
    var that = this;
    var footerTop;
    var length = that.articleList.length;
    $(window).scroll(function() {
      if(G.mobile) {
        return;
      }
      // aside bar postion
      that.contentTop = that.content.getBoundingClientRect().top;
      footerTop = document.getElementsByClassName('volcano-global-footer')[0].getBoundingClientRect().top;
      if(that.contentTop <= 100 && footerTop > G.viewHeight) {
        that.aside.classList.add('fixed');
        that.aside.classList.remove('fixed-bottom');
      } else if(footerTop <= G.viewHeight) {
        that.aside.classList.add('fixed-bottom');
        that.aside.classList.remove('fixed');
      } else {
        that.aside.classList.remove('fixed');
      }
      // interact
      if (!that.isLocateBrick) {
        return;
      }
      var toTop = G.viewHeight / 2;

      [].forEach.call(that.articleList, function(_ele, _index) {
        if(_ele.className === 'notuse') {
          return;
        }
        if(that.isBrickRelocate) {
          if(_ele.getBoundingClientRect().top < toTop && (_index == length - 1)) {
            that.notClick = true;
            that.menuList.eq(_index - 1).click();
          } else if (_ele.getBoundingClientRect().top < toTop && that.articleList[_index + 1].getBoundingClientRect().top > toTop) {
            that.notClick = true;
            that.menuList.eq(_index).click();
          }
        } else {
          that.isBrickRelocate = true;
        }
      });

    });
  },

  getSeparateMenu: function(menus) {
    var ret = [];
    menus.forEach(function(item) {
      item.forEach(function(i) {
        ret.push(i);
      });
    });
    return ret;
  }

}

module.exports = slideMenu;
