require('./style/index.less');

function Modal() {
  var _this = this;
  this.defaultOptions = {
    isMobile: false,
    isCaptcha: true,
    onSendRequest: function() { _this.destroy(); },
    opacity: 0.8,
    zIndex: 1000,
    width: 250,
    height: 192
  };
}

Modal.prototype.setOptions = function (options) {
  this.options = $.extend(false, {}, this.defaultOptions, options);
  this._setModal();
};

Modal.prototype.show = function() {
  var modal = this.modal ? this.modal : this._getModalElem();
  var mask = this.mask ? this.mask : this._getMaskElem();
  var display = window.getComputedStyle(modal).display;
  
  if(document.getElementById('mask')) {
    if(display === 'none') {
      modal.style.display = 'block';
      mask.style.display = 'block';
    }
  } else {
    document.body.appendChild(mask);
    document.body.appendChild(modal);
    modal.style.display = 'block';
    mask.style.display = 'block';
  }

  document.addEventListener('click', this.removeModal.bind(this));
};

Modal.prototype.removeModal = function(evt) {
  if(evt.target === this.mask) {
    this.destroy();
  }
};

Modal.prototype.hide = function() {
  var mask = this.mask;
  var modal = this.modal;
  mask.style.display = 'none';
  modal.style.display = 'none';
};


Modal.prototype._setModal = function() {
  var modalElem = this.modal ? this.modal :this._getModalElem();
  this._setModalContent(modalElem);
};

Modal.prototype._getMaskElem = function() {
  var elem = document.getElementById('modal-mask');
  if(!elem) {
    elem = document.createElement('div');
    elem.id = 'modal-mask';
  }
  var styleText = 'position: fixed; top: 0; left: 0; bottom: 0; right: 0;background: black; opacity:' + this.options.opacity + '; z-index: ' + this.options.zIndex + '; display: none;';
  elem.style.cssText = styleText;
  return this.mask = elem;
};

Modal.prototype._getModalElem = function() {
  var elem = document.getElementById('modal');
  if(!elem) {
    elem = document.createElement('div');
    elem.id = 'modal';
  }
  var styleText = 'position: fixed; top: 50%; left: 50%;' +
    ' transform: translate(-50%, -50%); background: white; z-index: ' + (this.options.zIndex + 1) + '; display: none; border-radius: 2px;';
  
  if(this.options.isMobile) {
    styleText = styleText + ' width: 375px; height: 194px;';
  } else {
    styleText = styleText + ' width:' + this.options.width + 'px; height: ' + this.options.height + 'px';
  }

  elem.style.cssText = styleText;
  return this.modal = elem;
};


Modal.prototype._setModalContent = function(modal) {
  var _this = this;
  var wrapperElem = document.createElement('div');
  wrapperElem.id = 'captcha-wrapper';
  wrapperElem.style = 'width: 100%; height: 100%';

  var textElem = document.createElement('div');
  textElem.id = 'captcha-text';
  textElem.innerHTML = '请输入验证码，完成验证';
  if(this.options.isMobile) {
    textElem.style.cssText = 'margin: 34px 0 11px 46px; line-height: 24px; font-size: 12px; letter-spacing: .55px; color: #333';
  } else {
    textElem.style.cssText = 'margin: 60px 0 20px 88px; line-height: 30px; font-size: 22px; letter-spacing: 1px; color: #333';
  }

  var inputWrapper = document.createElement('div');
  inputWrapper.id = 'captcha-input-wrapper';
  inputWrapper.style = 'height: 42px;';

  var input = document.createElement('input');
  input.id = 'captcha-input';
  input.type = 'text';
  var inputStyle = 'padding: 5px 10px; border: 1px solid #D8D8D8;border-radius: 2px; color: #333; vertical-align: top;';

  if(this.options.isMobile) {
    input.style.cssText = inputStyle + ' width: 176px; margin-left: 46px; line-height: 24px; font-size: 12px;';
  } else {
    input.style.cssText = inputStyle + ' width: 250px; margin-left: 88px; line-height: 30px; font-size: 22px;';
  }

  var timeStamp = (new Date()).getTime();
  var src = '/api/tool/captcha?' + (String(timeStamp)).slice(-8);
  var captcha = new Image();
  captcha.src = src;
  var captchaStyle = 'display: inline-block; margin-left: 11px; cursor: pointer;';

  if(this.options.isMobile) {
    captcha.style.cssText = captchaStyle + ' width: 76px; height: 33px;';
  } else {
    captcha.style.cssText = captchaStyle + ' width: 91px; height: 40px;';
  }


  captcha.addEventListener('click', this._updateCaptcha);

  var submitBtn = document.createElement('button');
  submitBtn.id = 'submit-captcha';
  submitBtn.innerHTML = '确定';
  var btnStyle = 'display: block; font-weight: 200; color: #fff; background: #0280DF; border-radius: 2px; border: none; line-height: 28px; outline: none; cursor: pointer;';

  if(this.options.isMobile) {
    submitBtn.style.cssText = btnStyle + ' margin: 21px auto; padding: 3.9px 31px 3.1px 31px; font-size: 14px; letter-spacing: 0.33px;';
  } else {
    submitBtn.style.cssText = btnStyle + ' margin: 34px auto; padding: 11px 37px 11px 38px; font-size: 18px; letter-spacing: 0.5px;';
  }


  submitBtn.addEventListener('click', function(evt) {
    evt.preventDefault();
    var captcha = document.getElementById('captcha-input').value.trim();
    var btn = document.getElementById('submit-captcha');
    $(btn).prop('disabled', true);
    _this.options.onSendRequest(captcha, _this.showTip.bind(_this));
  });
  
  inputWrapper.appendChild(input);
  inputWrapper.appendChild(captcha);
  wrapperElem.appendChild(textElem);
  wrapperElem.appendChild(inputWrapper);
  wrapperElem.appendChild(submitBtn);

  modal.appendChild(wrapperElem);
};

Modal.prototype._updateCaptcha = function(evt) {
  var timeStamp = (new Date()).getTime();
  var src = '/api/tool/captcha?' + (String(timeStamp)).slice(-8);
  evt.target.src = src;
};

Modal.prototype.showTip = function(tipConfig, parent, tipType) {
  this.destroy();
  var tipElem = document.createElement('div');
  tipElem.id = 'submit-tip';
  
  var tipIconElem = document.createElement('img');
  tipIconElem.id = 'submit-tip-icon';
  tipIconElem.src = tipConfig.tipIconSrc;

  var tipContentWrapper = document.createElement('div');
  tipContentWrapper.id = 'submit-tip-content-wrapper';

  var tipTitle = document.createElement('div');
  tipTitle.id = 'submit-tip-title';
  tipTitle.innerHTML = tipConfig.tipTitle;

  var tipContent = document.createElement('div');
  if(tipType === 'fail') {
    tipContent.id = 'submit-tip-fail-content';
  } else {
    tipContent.id = 'submit-tip-success-content';
  }

  tipContent.innerHTML = tipConfig.tipContent;

  tipElem.appendChild(tipIconElem);
  tipElem.appendChild(tipContentWrapper);
  tipContentWrapper.appendChild(tipTitle);
  tipContentWrapper.appendChild(tipContent);

  parent.appendChild(tipElem);

  if(!this.options.isMobile) {
    setTimeout(function() {
      $(tipElem).addClass('enter');
    }, 150);
  }

  setTimeout(function() {
    $(tipElem).removeClass('enter');
    setTimeout(function() {
      parent.removeChild(tipElem);
    }, 800);
  }, 5000);
};

Modal.prototype.destroy = function() {
  if(this.mask) {
    document.body.removeChild(this.mask);
    document.body.removeChild(this.modal);
    this.mask = null;
    this.modal = null;
  }
  document.removeEventListener('click', this.destroy);
};

module.exports = Modal;