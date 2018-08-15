const Service = require('egg').Service;
class JobService extends Service{
  async listJobs(){
    const { ctx }= this;
    let jobs = await ctx.model.Job.findAll({
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
  }
}
module.exports=JobService;