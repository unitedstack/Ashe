'use strict';
const controller = require('../controller/job');

module.exports = async (router, globalLang, viewsPath) => {
  router.get('/api/job', async (ctx, next) => {
    const jobs = await controller.listJobs();

    ctx.body = {jobs};
  });
};
