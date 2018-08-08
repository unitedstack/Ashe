const { app, mock, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/job.test.js',() => {
  describe('list all job', () => {
    it('get:/admin/api/job', async () => {
      await app.httpRequest().get('/admin/api/job').expect(200);
    });
  });

  describe('add job', () => {
    it('post: /admin/api/job', async () => { 
      app.mockCsrf();
      await app.httpRequest()
        .post('/admin/api/job')
        .send({
          title: 'node.js',
          description: 'nothing',
          requirement: 'nothing',
          preffered: 'english',
          location: ['上海'],
          type: '全职',
          role: '技术',
          status: 'public'
        })
        .expect(200);
    });
  });

  describe('update', () => {
    it('put: /admin/api/job/:id', async () => {
      const ctx = app.mockContext({
        session: {
          admin_user:{
            id: 'd70a78aa-f3fa-478b-a184-d649f2be95cc'
          }
        }
      });
      const reqUrl = '/admin/api/job/' + ctx.session.admin_user.id;
      await app.httpRequest()
        .put(reqUrl)
        .expect(200);
    });
  });

  describe('updateField', () => {
    it('put: /admin/api/job/:id/:field', async () => { 
      const ctx = app.mockContext({
        session: {
          admin_user:{
            id: 'd70a78aa-f3fa-478b-a184-d649f2be95cc'
          }
        }
      });
      const filed = 'title'; 
      const reqUrl = '/admin/api/job/' + ctx.session.admin_user.id + '/' + filed;

      await app.httpRequest()
        .put(reqUrl)
        .send({
          title: 'node'
        })
        .expect(200);
    });
  });

  describe('delete', () => {
    it('put: /admin/api/job/:id', async () => { 
      const ctx = app.mockContext({
        session: {
          admin_user:{
            id: '9130444e-337f-4155-994c-0aab6cb56d71'
          }
        }
      });
      const reqUrl = '/admin/api/job/' + ctx.session.admin_user.id;
      await app.httpRequest()
        .delete(reqUrl)
        .expect(204);
    });
  });
})