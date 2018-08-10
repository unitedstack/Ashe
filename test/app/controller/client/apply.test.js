const { app,assert,mock } = require('egg-mock/bootstrap');

describe('test/app/controller/client/apply.test.js',()=>{
  describe('applyTrain',()=>{
    it('should be captcha error',async ()=>{
      const ctx=app.mockContext();
      app.mockCsrf();
      const res=await app.httpRequest()
      .post('/apply/api/train')
      .expect(400);
      assert(JSON.stringify(res.error).includes('验证码错误'));
    });

    it('should have checkBody prompt',async ()=>{
      const ctx=app.mockContext({
        session: {
          www_captcha: '1234'
        }
      });
      app.mockCsrf();
      const res=await app.httpRequest()
      .post('/apply/api/train')
      .send({
        captcha:'1234'
      });
      assert(JSON.stringify(res.error).includes('用户名不能为空'));
      assert(true);
    });
  });
})