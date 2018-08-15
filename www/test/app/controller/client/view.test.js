const { app,assert,mock } = require('egg-mock/bootstrap');

describe('test/app/controller/view.test.js',()=>{
  describe('index',()=>{
    it('get(\'/\') status should be 200',async ()=>{
      await app.httpRequest()
      .get('/')
      .expect(200);
    });
  });

  describe('errorPage',()=>{
    it('get /xxx status should be 404',async ()=>{
      const result=await app.httpRequest()
      .get('/xxx')
      .expect(404);
    })
  });

  describe('staticPage',()=>{
    it('get /about/clients status should be 200',async ()=>{
      await app.httpRequest()
      .get('/about/clients')
      .expect(200);
    })
  });
})