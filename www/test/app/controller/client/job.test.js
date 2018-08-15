const { app,assert,mock } = require('egg-mock/bootstrap');

describe('test/app/controller/view.test.js',()=>{
  describe('listJobs',()=>{
    it('get (\'/api/job\') result body should be object',async ()=>{
      const result=await app.httpRequest()
      .get('/api/job')
      .expect(200);
      assert((typeof result.body=="object") && result.body!==null);
    });
  });
})