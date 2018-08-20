const Controller = require('egg').Controller;
class JobController extends Controller{
  async listJobs(){
    const { ctx }= this;
    const jobs = await this.ctx.service.client.job.listJobs();
    ctx.body = {jobs};
  }
}
module.exports=JobController;