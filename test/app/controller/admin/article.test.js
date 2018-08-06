const { app, mock, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/article.test.js',() => {
  describe('list all article', () => {
    it('get:/admin/api/article', async () => {
      await app.httpRequest().get('/admin/api/article').expect(200);
    });
  });

  describe('list article by id', () => {
    it('get: /admin/api/article/:id', async () => { 
      await app.httpRequest()
        .get('/admin/api/article/:id')
        .expect(200);
    });
  });

  //forbidden
  describe('add article', () => {
    it('post: /admin/api/article', async () => { 
      app.mockCsrf();
      await app.httpRequest()
        .post('/admin/api/article')
        .send('1111')
        .expect(200);
    });
  });
  //forbidden
  describe('update', () => {
    it('put: /admin/api/article/:id', async () => {
      app.mockCsrf();
      await app.httpRequest()
        .put('/admin/api/article/:id')
        .expect(200);
    });
  });
  //forbidden
  describe('set', () => {
    it('put: /admin/api/article/:id/:field/:value', async () => { 
      await app.httpRequest()
        .put('/admin/api/article/:id/:field/:value')
        .expect(200);
    });
  });
  //forbidden
  describe('updateField', () => {
    it('put: /admin/api/article/:id/:field', async () => { 
      await app.httpRequest()
        .put('/admin/api/article/:id/:field')
        .expect(200);
    });
  });
  //forbidden
  describe('listTag', () => {
    it('put: /api/article-tag', async () => { 
      await app.httpRequest()
        .put('/api/article-tag')
        .expect(200);
    });
  });
})