'use strict';

const Controller = require('egg').Controller;

class ApplyController extends Controller {
  async listCloudApply() {
    const { ctx, service } = this;
    let list = await service.admin.apply.cloudFindAll();

    ctx.body = {
      statusCode: 200,
      message: '获取托管云申请成功',
      payload: {
        list
      }
    };
  }

  async listTrainApply() {
    const { ctx,service } = this;
    let list = await service.admin.apply.trainFindAll();

    ctx.body = { 
      statusCode: 200,
      message: '获取培训成功',
      payload: {
        list
      }
    };
  }
}

module.exports = ApplyController;