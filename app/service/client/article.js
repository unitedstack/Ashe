'use strict'
// const ctx.model = require('ctx.model').sequelize.ctx.model;
// const ctx.model.article = ctx.model.article;
const publicStatus = 'public';
const Service = require('egg').Service;
class ArticleService extends Service {

  async getArticle(params){
    const {ctx}=this;
    const {category, url} = params;
    const article = await ctx.model.article.findOne({where: {url: encodeURI(url), category, status: publicStatus}});
    if (article) {
      article.increment('view_count');
    }
    return article;
}

  async listArticle(params){

    const {ctx}=this;
    const obj = {where: {status: publicStatus}};
    if (params.search) {
      obj.where.title = {$like: '%' + decodeURI(params.search) + '%'};
    }

    if (params.tag) {
      obj.include = [{model: ctx.model.Article_tag, where: {tag: params.tag}}];
    }
    if (params.category) {
      obj.where.category = params.category;
    }

    params.limit = obj.limit = parseInt(params.limit) || 10;
    params.page = parseInt(params.page) > 0 ? parseInt(params.page) : 1;
    obj.offset = (params.page - 1) * params.limit;

    obj.order = [['top', 'DESC'], ['createdAt', 'DESC']];

    obj.attributes = {exclude: ['content']};

    const result = await ctx.model.Article.findAndCount(obj);
    return {
      articles: result.rows,
      count: result.count,
      page: params.page,
      limit: params.limit,
      prev: params.page > 1 ? params.page - 1 : null,
      next: result.count > params.page * params.limit ? params.page + 1 : null
    };
  }

  async getTags(category = 'blog') {
    const {ctx}=this;
    return await ctx.model.Article_tag.count({
      where: {category},
      attributes: {exclude: ['id', 'articleId', 'createdAt', 'updatedAt']},
      group: ['tag']
    });
  }

  async getTops(category = 'blog') {
    const {ctx}=this;
    return await ctx.model.article.findAll({
      where: {status: publicStatus, category},
      limit: 10,
      attributes: {exclude: ['content']},
      order: [['top', 'DESC'], ['view_count', 'DESC']]
    });

  }
  
  async getPrevNext(category = 'blog', articleId){

    const {ctx}=this;
    return await Promise.all([
      ctx.model.article.findOne({
        where: {status: publicStatus, category, id: {$lt: articleId}},
        limit: 1,
        attributes: ['url', 'title'],
        order: [['top', 'DESC'], ['createdAt', 'DESC']]
      }),
      ctx.model.article.findOne({
        where: {status: publicStatus, category, id: {$gt: articleId}},
        limit: 1,
        attributes: ['url', 'title'],
        order: [['top', 'DESC'], ['createdAt', 'DESC']]
      })
    ]);
    }

}
module.exports = ArticleService;