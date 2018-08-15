'use strict';

const Controller = require('egg').Controller;
const ccap = require('ccap');

class ToolController extends Controller {
  async tool() {
    const { ctx } = this;
    const captcha = ccap({
      width: 200, //set width,default is 256
      height: 60, //set height,default is 60
      offset: 30, //set text spacing,default is 40
      quality: 50, //set pic quality,default is 50
      fontsize: 45 //set font size,default is 57
    });

    let ary = captcha.get();
    ctx.session.admin_captcha = ary[0];
    ctx.body = ary[1];
  }
}

module.exports = ToolController;