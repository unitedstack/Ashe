const Service = require('egg').Service;

class ViewService extends Service {

  async applyTrain(train) {
    return await this.app.model.ApplyTrain.create(train);
  }

  async applyCooperation(cooperation){
    return await this.app.model.ApplyCooperation.create(cooperation);
  }

  async applyCloud(cloud){
    return await this.app.model.ApplyCloud.create(cloud);
  }
}

module.exports = ViewService;