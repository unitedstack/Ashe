const { app, mock, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/apply.test.js',() => {
  describe('list cloud apply', () => {
    it('content', async () => {
      await app.httpRequest().get('/admin/api/apply/train').expect(200);
    });
  });

  describe('list train apply', () => {
   
    it('content', async () => { 
      await app.httpRequest()
        .get('/admin/api/apply/private-cloud')
        .expect(200);
    });
  });
})