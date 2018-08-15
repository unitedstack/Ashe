const { app,assert,mock } = require('egg-mock/bootstrap');

describe('test/app/controller/client/apply.test.js',()=>{
  it('should add FileHash to app',()=>{
    assert(app.FileHash);
  });
})