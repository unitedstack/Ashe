const { app, mock, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/account.test.js',() => {
  describe('showList', () => {
    it('account content', async () => {
      await app.httpRequest().get('/admin/api/account').expect(200);
    });
  });

  describe('create', () => {
   
    it('create account', async () => { 
      await app.httpRequest()
        .post('/admin/api/account')
        .send({
          username: 'yan',
          password: 'yjk',
          nickname: 'yjk',
          email:"357571433@qq.com",
          phone:"15122579960"     
        })
        .expect(200);
    });
  });

  describe('update', () => {
    it('update account', async () => {
      const ctx = app.mockContext({
        session: {
          admin_user:{
            id: 'a34f3fe8-2053-4350-bbc7-4d4162ddc373 '
          }
        }
      });
      const reqUrl = '/admin/api/account/' + ctx.session.admin_user.id;
      await app.httpRequest().put(reqUrl).expect(200);
    });
  });

  describe('enable', () => {
    it('enable account', async () => {
      const ctx = app.mockContext({
        session: {
          admin_user:{
            id: 'a34f3fe8-2053-4350-bbc7-4d4162ddc373 '
          }
        }
      });
      const reqUrl = '/admin/api/account/' + ctx.session.admin_user.id + '/enable';
      await app.httpRequest().put(reqUrl).expect(200);
    });
  });
})