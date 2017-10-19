'use strict';

const models = require('models').sequelize.models;
const cloudModel = models.apply_cloud;
const trainModel = models.apply_train;

const listCloudApply = function () {
  return cloudModel.findAll();
};
const listTrainApply = function () {
  return trainModel.findAll();
};

module.exports = {listCloudApply, listTrainApply};
