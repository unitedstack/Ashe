'use strict';

const models = require('models').sequelize.models;
const cloudModel = models.apply_cloud;
const trainModel = models.apply_train;

const applyCloud = function (cloud) {
  return cloudModel.create(cloud);
};
const applyTrain = function (train) {
  return trainModel.create(train);
};

module.exports = {applyCloud, applyTrain};
