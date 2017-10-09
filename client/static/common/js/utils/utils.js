/**
 * @Author: PengJiyuan
 * @Description: Some helpful functions
 */

module.exports = {
  // bind event listener
  bind: function(target, eventType, handler) {
    try {
      if (window.addEventListener) {
        target.addEventListener(eventType, handler, false);
      } else if (target.attachEvent) {
        target.attachEvent('on' + eventType, handler);
      } else {
        target['on' + eventType] = handler;
      }
      return target;
    } catch(e) {}
  },

  // remove event listener
  unbind: function(target, eventType, handler) {
    try {
      if (window.removeEventListener) {
        target.removeEventListener(eventType, handler, false);
      } else if (window.detachEvent) {
        target.detachEvent(eventType, handler);
      } else {
        target['on' + eventType] = '';
      }
    } catch(e) {}
  },

  // get style (css or inline-style) from element
  getStyle: function (selector) {
    try {
      return selector.currentStyle ? selector.currentStyle : document.defaultView.getComputedStyle(selector, null);
    } catch(e) {
      return null;
    }
  }
}