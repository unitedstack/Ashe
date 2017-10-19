'use strict';

const models = require('server/models').sequelize.models;

const childProcess = require('child_process');
const path = require('path');
const fs = require('fs');

const co = require('co');
const _ = require('lodash');
const multer = require('koa-multer');
const uuid = require('uuid');

const mediaModel = models.media;
const mediaTagModel = models.media_tag;

const config = require('config')('image_upload');


const mediaPath = config.local.upload_path;
const mediaSizeLimit = 10 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: mediaPath,
  filename: function (req, file, cb) {
    let u = uuid.v4();
    fs.mkdir(path.join(mediaPath, u), err => {
      if (err) {
        cb(err);
      } else {
        cb(null, u + '/' + file.originalname);
      }
    });
  }
});

const upload = multer({storage: storage, limits: {fileSize: mediaSizeLimit}});

const middlewareCreate = function (router, url) {
  router.post(
    url,
    upload.single('media'),
    async (ctx, next) => {
      let file = ctx.req.file;
      let arr = file.path.split('/');
      let fileToReturn = {
        name: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
        state: 'SUCCESS',
        prefix: config.local.prefix,
        filename: arr[arr.length - 2] + '/' + arr[arr.length - 1],
      };
      let position = 'local';


      await mediaModel.create(Object.assign(
        {position, tags: '', userId: ctx.session.admin_user.id},
        fileToReturn
      ));

      if (ctx.query.editor) {
        ctx.body = fileToReturn.prefix + fileToReturn.filename;
      } else {
        ctx.body = fileToReturn;
      }
    });
};

const del = (ctx) => {
  return co(function *() {
    let mediaId = ctx.params.id;
    let media = yield mediaModel.findById(mediaId);
    if (!media) {
      return;
    }

    childProcess.exec('rm -rf ' + path.join(mediaPath, media.filename.split('/')[0]));

    yield [
      media.destroy({force: true}),
      mediaTagModel.destroy({
        where: {mediaId: media.id},
        force: true
      })
    ];
  });

};

const list = async (query) => {
  //query.tag:hello
  //query.page
  //query.limit
  let obj = {where: {}};
  if (query.tag) {
    obj.include = [{model: mediaTagModel, where: {tag: query.tag}}];
  }
  query.limit = obj.limit = parseInt(query.limit) || 10;
  query.page = parseInt(query.page) > 0 ? parseInt(query.page) : 1;
  obj.offset = (query.page - 1) * query.limit;
  obj.order = [
    ['createdAt', 'DESC']
  ];
  let result = await mediaModel.findAndCount(obj);
  return {
    medias: result.rows,
    count: result.count,
    page: query.page,
    limit: query.limit,
    prev: query.page > 1 ? query.page - 1 : null,
    next: result.count > query.page * query.limit ? query.page + 1 : null
  };
};

const bulkAddTags = (ctx) => {
  co(function *() {
    let ids = ctx.request.body.ids;
    let tagsAdd = ctx.request.body.tag;
    if (!tagsAdd) {
      return;
    }
    tagsAdd = _.compact(tagsAdd.split('\n'));
    let medias = yield mediaModel.findAll({where: {id: {in: [ids]}}});

    yield medias.map(media => {
      let tagsOld = media.tags.split('\n');
      let tagsToAdd = _.difference(tagsAdd, tagsOld);
      let tagsNew = tagsOld.concat(tagsToAdd);
      if (tagsToAdd.length) {
        return [mediaTagModel.bulkCreate(tagsToAdd.map(tag => {
          return {tag: tag.toLowerCase(), mediaId: media.id};
        })), media.update({tags: tagsNew.join('\n')})];
      } else {
        return media.update({tags: tagsNew.join('\n')});
      }
    });
  });
};

const listTag = () => {
  return mediaTagModel.count({
    attributes: {exclude: ['id', 'mediaId', 'createdAt', 'updatedAt']},
    group: 'tag'
  });
};

const update = (ctx) => {
  return co(function *() {
    let id = ctx.params.id;
    let tags = ctx.request.body.tags;
    let media = yield mediaModel.findById(id);
    if (!media) {
      return Promise.reject({code: 404, error: '附件不存在'});
    }
    if (tags) {
      yield handleTagForAttachment(media, tags);
    }
    yield media.update({description: ctx.request.body.description, tags});
    return media;
  });
};

const get = (id) => mediaModel.findById(id);

module.exports = {
  middlewareCreate, get, del, list, bulkAddTags, update, listTag
};
const handleTagForAttachment = function *(attachment, tagsString) {

  let tagsNew = JSON.parse(tagsString);
  let tagsOld = JSON.parse(attachment.tags);
  if (_.difference(tagsOld, tagsNew).length || _.difference(tagsNew, tagsOld).length) {
    yield mediaTagModel.destroy({where: {attachmentId: attachment.id}, force: true});
    yield [
      mediaTagModel.bulkCreate(tagsNew.map(tag => {
        return {attachmentId: attachment.id, tag: tag};
      })),
      attachment.update({'tags': tagsString})
    ];
  }
};
