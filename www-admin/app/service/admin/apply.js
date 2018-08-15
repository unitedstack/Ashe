'use strict';

const Service = require('egg').Service;

class ApplyService extends Service {
  async cloudFindAll() {
    return this.ctx.model.ApplyCloud.findAll();
  }

  async trainFindAll() {
    console.log(this.ctx.model);
    return this.ctx.model.ApplyTrain.findAll();
  }
}

module.exports = ApplyService;