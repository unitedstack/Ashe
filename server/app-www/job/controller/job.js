'use strict';

const models = require('models').sequelize.models;
const jobModel = models.job;

const listJobs = async () => {

  let jobs = await jobModel.findAll({
    where: {
      status: 'public'
    },
    order: [
      ['top', 'DESC'],
      ['createdAt', 'DESC']
    ]
  });
  jobs.forEach(job => {
    job.location = job.location ? job.location.split(',') : [];
  });
  return jobs;
};


module.exports = {listJobs};
