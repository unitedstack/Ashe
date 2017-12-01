'use strict';

const models = require('models').sequelize.models;
const cloudModel = models.apply_cloud;
const trainModel = models.apply_train;
const cooperationModel = models.apply_cooperation;

const applyCloud = function (cloud) {
  return cloudModel.create(cloud);
};
const applyTrain = function (train) {
  return trainModel.create(train);
};
const applyCooperation = (cooperation) => {
  return cooperationModel.create(cooperation);
};

module.exports = {applyCloud, applyTrain, applyCooperation};
