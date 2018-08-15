'use strict';

const Service = require('egg').Service;
const tools = require('../../tools');

class ArticleSevice extends Service {
  async handleTagForArticle(article, tagsString) {
    let tagsNew = JSON.parse(tagsString);
    let tagsOld = JSON.parse(article.tags);
    if (tools._.difference(tagsOld, tagsNew).length || tools._.difference(tagsNew, tagsOld).length) {
      await this.app.model.article_tag.destroy({ where: { articleId: article.id }, force: true });
      await this.app.model.article_tag.bulkCreate(tagsNew.map(tag => {
        return {
          articleId: article.id,
          tag: tag,
          category: article.category
        };
      }));
      await this.app.model.Article.update({ 'tags': tagsString });
    }
  }

  // async handleTagForArticle(article, tagsString) {
  //   let tagsNew = JSON.parse(tagsString);
  //   let tagsOld = JSON.parse(article.tags);
  //   if (tools._.difference(tagsOld, tagsNew).length || tools._.difference(tagsNew, tagsOld).length) {
  //     await this.app.model.ArticleTag.destroy({ where: { article_id: article.id }, force: true });
  //     await [
  //       this.app.model.ArticleTag.bulkCreate(tagsNew.map(tag => {
  //         return {
  //           article_id: article.id,
  //           tag: tag,
  //           category: article.category
  //         };
  //       })),
  //       article.update({ 'tags': tagsString })
  //     ];
  //   }
  // }
  async list(query) {
    //query.status:
    //query.tags:"['hello']"
    //query.month:2017-02
    //query.page
    //query.limit
    //query.category
    //query.search

    let obj = { where: {}, attributes: { exclude: ['content'] } };
    if (query.search) {
      obj.where.title = {
        $like: '%' + decodeURI(query.search) + '%'
      };
    }

    if (query.tags) {
      query.tags = JSON.parse(query.tags);
      obj.include = [
        {
          model: this.app.model.ArticleTag,
          where: { tag: { $in: query.tags } }
        }
      ];
    }

    query.limit = obj.limit = parseInt(query.limit) || 10;
    query.page = parseInt(query.page) > 0 ? parseInt(query.page) : 1;
    obj.offset = (query.page - 1) * query.limit;

    if (query.month) {
      obj.where.createdAt = {};
      obj.where.createdAt.$gt = new Date(query.month);
      let yearAndMonth = query.month.split('-');
      if ('12' === yearAndMonth[1]) {
        yearAndMonth[0]++;
        yearAndMonth[1] = ['01'];
      } else if ('09' === yearAndMonth[1] || '10' === yearAndMonth[1] || '11' === yearAndMonth[1]) {
        yearAndMonth[1]++;
      } else {
        yearAndMonth[1] = '0' + (++yearAndMonth[1]);
      }
      obj.where.createdAt.$lt = new Date(yearAndMonth.join('-'));
    }

    if (query.status) {
      if ('top' === query.status) {
        obj.where.top = true;
      } else {
        obj.where.status = query.status;
      }
    }

    if (query.category) {
      obj.where.category = query.category;
    }
    obj.order = [
      ['createdAt', 'DESC']
    ];

    let result = await this.app.model.Article.findAndCount(obj);
    return {
      articles: result.rows,
      count: result.count,
      page: query.page,
      limit: query.limit,
      prev: query.page > 1 ? query.page - 1 : null,
      next: result.count > query.page * query.limit ? query.page + 1 : null
    };
  }

  async get(id) {
    let article = await this.app.model.Article.findById(id);
    article.url = decodeURI(article.url);
    return article;
  }

  async create(body, author) {
    body.authorName = author.nickname;
    body.authorId = author.id;
    if (body.url) {
      body.url = encodeURI(body.url);
    }

    let article = await this.app.model.Article.create(body);
    let tags = [];
    if (body.tags) {
      tags = JSON.parse(body.tags);
    } else {
      body.tags = JSON.stringify([]);
    }

    if (!body.url) {
      article.url = article.id;
      await article.save();
    }

    await this.app.model.ArticleTag.bulkCreate(tags.map(tag => {
      return {
        article_id: article.id,
        tag: tag,
        category: article.category
      };
    }));
    return article;
  }

  async update(article_id, body) {
    let article = await this.app.model.Article.find({ where: { id: article_id } });
    if (body.tags) {
      await this.handleTagForArticle(article, body.tags);
    }
    if (!article) {
      return Promise.reject({ statusCode: 404, errors: [{ message: '文章不存在' }] });
    }
    if (body.url) {
      body.url = encodeURI(body.url);
    }
    delete body.status;
    Object.assign(article, body);
    article = await article.save();
    return article;
  }

  async setStatus(article_id, status) {
    let statuses = ['public', 'private', 'trash', 'draft'];
    let article = await this.app.model.Article.findOne({ where: { id: article_id } });
    if (!article) {
      return Promise.reject({ status: 404, message: '文章不存在' });
    }
    if (statuses.indexOf(status) < 0) {
      return Promise.reject({ status: 400, message: '参数错误' });
    }
    return await article.update({ status });
  }

  async setTop(article_id, top) {
    return this.app.model.Article.update({ top }, { where: { id: article_id } });
  }

  async setLevel(article_id, level) {
    level = parseInt(level);
    if (article_id && level >= 0 && level <= 9) {
      return this.app.model.Article.update({ level }, { where: { id: article_id } });
    }
  }

  async updateField(article_id, field, value) {
    const fields = ['title', 'introduction', 'content', 'tags', 'url', 'cover', 'time'];
    if (fields.indexOf(field) < 0) {
      return Promise.reject({ statusCode: 400, errors: [{ message: '错误的请求参数' }] });
    }

    let article = await this.app.model.Article.findOne({ where: { id: article_id } });
    if (!article) {
      return Promise.reject({ statusCode: 404, errors: [{ message: '文章不存在' }] });
    }
    if ('tags' === field) {
      await this.handleTagForArticle(article, value);
    } else if ('url' === field) {
      let update = {};
      update[field] = encodeURI(value);
      article = await article.update(update);
    } else {
      let update = {};
      update[field] = value;
      article = await article.update(update);
    }
    return article;
  }

  async listTag() {
    return this.app.model.ArticleTag.count({
      attributes: ['category', 'tag'],
      group: ['category', 'tag']
    });
  }
}

module.exports = ArticleSevice;