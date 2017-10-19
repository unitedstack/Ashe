'use strict';
const fs = require('fs-async-await');
const path = require('path');
const cp = require('child_process');
const config = require('config')('docs');
const models = require('server/models').sequelize.models;
const modesDocs = models.docs;

try {
  fs.statSync(config.repoPath);
} catch (e) {
  fs.mkdirSync(config.repoPath);
}
try {
  fs.statSync(config.buildPath);
} catch (e) {
  fs.mkdirSync(config.buildPath);
}
try {
  fs.statSync(config.pdfPath);
} catch (e) {
  fs.mkdirSync(config.pdfPath);
}

const build = async (doc, repoDir, buildDir, pdfDir) => {
  cp.exec(`gitbook build ${repoDir} ${buildDir} && gzip -kr9 ${buildDir}`, async (err) => {
    if (err) {
      console.error(err);
      await doc.update({status: 'Error:build Error'});
      return;
    }
    await doc.update({status: 'success'});
  });
  cp.exec(`gitbook pdf ${repoDir} ${pdfDir}/${doc.name || doc.projectName}.pdf && gzip -k9 ${pdfDir}/${doc.name || doc.projectName}.pdf`, async (err) => {
    if (err) {
      console.error(err);
      await doc.update({pdf: 'Error:pdf build Error'});
      return;
    }
    await doc.update({pdf: `${doc.name || doc.projectName}.pdf`});
  });
};

//
/**
 * 创建文档
 * 执行命令
 * git clone xxx
 * gitbook build
 *
 * @return {Promise.<void>}
 */
const create = async (doc) => {
  let repoDir = path.join(config.repoPath, doc.directory);
  let buildDir = path.join(config.buildPath, doc.projectName);
  let pdfDir = path.join(config.pdfPath);
  cp.exec(`git clone -b ${doc.branch} ${doc.repository} ${repoDir}`, async (err) => {
    if (err) {
      console.error(err);
      await doc.update({status: 'Error:clone Error'});
      return;
    }
    await build(doc, repoDir, buildDir, pdfDir);
  });
};

const upgrade = async (doc) => {
  let repoDir = path.join(config.repoPath, doc.directory);
  let buildDir = path.join(config.buildPath, doc.projectName);
  let pdfDir = path.join(config.pdfPath);
  try {
    await fs.statAsync(repoDir);
  } catch (e) {
    create(doc);
    return;
  }
  cp.exec(`git pull origin ${doc.branch}`, {cwd: repoDir}, async (err) => {
    if (err) {
      console.error(err);
      await doc.update({status: 'Error:clone Error'});
      return;
    }
    await build(doc, repoDir, buildDir, pdfDir);
  });
};

const createDoc = async (opt = {}) => {
  opt.status = 'pending';
  opt.directory = `${opt.projectName}-${new Date().getTime()}`;
  let doc = await modesDocs.create(opt);
  create(doc);
  return doc;
};

const updateDoc = async (id, body) => {
  let doc = await modesDocs.find({where: {id}});

  if (!doc) {
    return Promise.reject({statusCode: 404, errors: [{message: '文档不存在'}]});
  }

  doc.directory = `${doc.projectName}-${new Date().getTime()}`;
  Object.assign(doc, body);
  let changedRepository = false;
  if (doc.changed('repository') || doc.changed('branch')) {
    changedRepository = true;
    doc.status = 'pending';
  }
  doc = await doc.save();
  if (changedRepository || doc.status !== 'success') {
    create(doc);
  }
  return doc;
};

const listDoc = async () => {
  return modesDocs.findAll({attributes: {exclude: ['projectName', 'directory']}});
};
const upgradeDoc = async (id) => {
  let doc = await modesDocs.find({where: {id}});

  if (!doc) {
    return Promise.reject({statusCode: 404, errors: [{message: '文档不存在'}]});
  }
  doc.status = 'pending';
  upgrade(doc);
  return await doc.save();

};


module.exports = {createDoc, updateDoc, listDoc, upgradeDoc};
