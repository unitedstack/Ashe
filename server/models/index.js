'use strict';

const fs = require('fs');
const path = require('path');
const sequelize = require('server/drivers').sequelize;

const db = {};

fs.readdirSync(path.join(__dirname))
  .filter(dir => dir !== 'index.js')
  .forEach(app => {
    let models;
    try {
      models = fs.statSync(path.join(__dirname, app));
    } catch (e) {
      return;
    }
    if (models.isDirectory()) {
      fs.readdirSync(path.join(__dirname, app))
        .filter(file => file.indexOf('.') !== 0)
        .forEach(file => {
          let model = require(`models/${app}/${file}`).model(sequelize, sequelize.Sequelize);
          db[model.name] = model;
        });
    }
  });

Object.keys(db).forEach(modelName => db[modelName].associate && db[modelName].associate(db));

db.sequelize = sequelize;
sequelize.sync().then(() => {
  console.log('MySQL sync Done');
}).catch(console.error);
module.exports = db;
