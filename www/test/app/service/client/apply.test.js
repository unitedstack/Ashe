const { app,assert,mock } = require('egg-mock/bootstrap');

describe('test/app/service/client/apply.test.js',()=>{
  describe('applyTrain',()=>{
    it('should create table train',async ()=>{
      const ctx=app.mockContext();
      const result=await ctx.service.client.apply.applyTrain({});
      assert(typeof result=="object" && result!==null)
    });
  });

  describe('applyCooperation',()=>{
    it('should create table cooperation',async ()=>{
      const ctx=app.mockContext();
      const result=await ctx.service.client.apply.applyCooperation({});
      assert(typeof result=="object" && result!==null)
    });
  });

  describe('applyCloud',()=>{
    it('should create table cloud',async ()=>{
      const ctx=app.mockContext();
      const result=await ctx.service.client.apply.applyCloud({});
      assert(typeof result=="object" && result!==null)
    });
  });
})