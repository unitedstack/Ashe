const { app,assert,mock } = require('egg-mock/bootstrap');

describe('test/app/controller/view.test.js',()=>{
  describe('chap',()=>{
    it('/api/tool/captcha should 返回验证码',async ()=>{
      const res=await app.httpRequest()
      .get('/api/tool/captcha')
      .expect(200);
      assert(typeof res.body=="object" && res.body!==null);
    });
  });
})