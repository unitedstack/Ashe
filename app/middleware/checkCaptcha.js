module.exports = () => {
  return function checkCaptcha(ctx, next) {
    let captcha = ctx.request.body.captcha;
    let sessionCaptcha = ctx.session.www_captcha;
    captcha = captcha && captcha.toLowerCase();
    sessionCaptcha = sessionCaptcha && sessionCaptcha.toLowerCase();
    if ( captcha && sessionCaptcha && captcha === sessionCaptcha) {
      ctx.session.www_captcha = '';
      return next();
    } else {
      ctx.status = 400;
      ctx.body = {
        statusCode: 400,
        errors: [{
          location: 'captcha',
          message: '验证码错误'
        }]
      };
    }
  }
}