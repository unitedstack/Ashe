var SingletonModal = (function () {
  var instance;

  return function() {
    if(!instance) {
      return instance = new Modal();
    }
    return instance;
  };
})();

function Modal() {
  var that = this;
  this.defaultOptions = {
    opacity: 0.8,
    zIndex: 1000,
    width: 250,
    height: 192,
    iconSrc: '/static/assets/page-views/train/train-apply/gou.png',
    content: 'modal content',
    btnContent: 'cancel',
    btnType: 'normal',
    clickHandler: function () { that.hide(); }
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
  var docW = $(document).width();
  var docH = $(document).height();
  if(!elem) {
    elem = document.createElement('div');
    elem.id = 'modal-mask';
  }
  var styleText = 'position: absolute; top: 0; left: 0; background: black; width:' + docW + 'px; height:' + docH + 'px; opacity:' + this.options.opacity + '; z-index: ' + this.options.zIndex + '; display: none;';
  elem.style.cssText = styleText;
  return this.mask = elem;
};

Modal.prototype._getModalElem = function() {
  var elem = document.getElementById('modal');
  if(!elem) {
    elem = document.createElement('div');
    elem.id = 'modal';
  }
  var styleText = 'position: absolute; top: 644px; left: 50%;' +
    ' transform: translateX(-50%); background: white; width: ' +
    this.options.width + 'px; height: ' + this.options.height +
    'px; z-index: ' + (this.options.zIndex + 1) + '; display: none;';

  elem.style.cssText = styleText;
  return this.modal = elem;
};

Modal.prototype._setModalContent = function(modal) {
  // icon
  var iconElem = document.getElementById('modal-icon');
  if(!iconElem) {
    iconElem = document.createElement('img');
    iconElem.id = 'modal-icon';
    modal.appendChild(iconElem);
  }

  iconElem.src = this.options.iconSrc;
  var iconStyleText = 'display: block; margin: 30px auto 0; width:50px; height:50px';
  iconElem.style = iconStyleText;

  // content
  var modalContentElem = document.getElementById('modal-content');
  if(!modalContentElem) {
    modalContentElem = document.createElement('div');
    modalContentElem.id = 'modal-content';
    modal.appendChild(modalContentElem);
  }

  modalContentElem.innerHTML = this.options.content;
  var contentStyleText = 'font-size: 20px; line-height: 28px; letter-spacing: 1.2px; text-align: center; margin: 17px auto;';
  modalContentElem.style = contentStyleText;

  // btn
  var modalBtnElem = document.getElementById('modal-btn');
  if(!modalBtnElem) {
    modalBtnElem = document.createElement('button');
    modalBtnElem.id = 'modal-btn';
    modal.appendChild(modalBtnElem);
  }

  modalBtnElem.innerHTML = this.options.btnContent;
  var btnStyleText = 'padding: 5px 10px; text-align: center; border-radius: 2px; border: 1px solid; font-size： 14px; line-height: 20px; display:block; margin: 0 auto; background: white; font-weight: 200;';

  if(this.options.btnType === 'create') {
    btnStyleText += 'color: #27A04F;';
  } else {
    btnStyleText += 'color: #0280DF;';
  }

  modalBtnElem.style = btnStyleText;

  modalBtnElem.addEventListener('click', this.options.clickHandler);

};

Modal.prototype.destroy = function() {
  if(this.mask) {
    document.body.removeChild(this.mask);
    document.body.removeChild(this.modal);
  }
};

module.exports = SingletonModal;