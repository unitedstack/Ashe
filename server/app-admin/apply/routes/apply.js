'use strict';

const controller = require('../controller/apply');

module.exports = async (router) => {
  router.get('/api/apply/private-cloud', async (ctx, next) => {

    let list = await controller.listCloudApply();
    ctx.body = {
      statusCode: 200,
      message: '获取托管云申请成功',
      payload: {
        list
      }
    };
  });
  router.get('/api/apply/train', async (ctx, next) => {
    let list = await controller.listTrainApply();
    ctx.body = {
      statusCode: 200,
      message: '获取培训申请成功',
      payload: {
        list
      }
    };
  });
};
