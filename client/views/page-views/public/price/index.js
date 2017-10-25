require('./style/index.less');

(function(doc, win) {
  'use strict';
  var flavorObj = {'flavors': [{'name': 'compute-12', 'links': [{'href': 'http://console.ustack.com/v2/8fb9f2b042ee4233a519784db37a5f2f/flavors/215ea357-2d56-4387-9991-0c083806e3f8', 'rel': 'self'}, {'href': 'http://console.ustack.com/8fb9f2b042ee4233a519784db37a5f2f/flavors/215ea357-2d56-4387-9991-0c083806e3f8', 'rel': 'bookmark'}], 'ram': 12288, 'OS-FLV-DISABLED:disabled': false, 'vcpus': 12, 'swap': '', 'os-flavor-access:is_public': true, 'rxtx_factor': 1.0, 'OS-FLV-EXT-DATA:ephemeral': 0, 'disk': 20, 'id': '215ea357-2d56-4387-9991-0c083806e3f8'}, {'name': 'memory-2', 'links': [{'href': 'http://console.ustack.com/v2/8fb9f2b042ee4233a519784db37a5f2f/flavors/21c0cf18-d0dc-43ab-8fdb-40ba8b0935d9', 'rel': 'self'}, {'href': 'http://console.ustack.com/8fb9f2b042ee4233a519784db37a5f2f/flavors/21c0cf18-d0dc-43ab-8fdb-40ba8b0935d9', 'rel': 'bookmark'}], 'ram': 8192, 'OS-FLV-DISABLED:disabled': false, 'vcpus': 2, 'swap': '', 'os-flavor-access:is_public': true, 'rxtx_factor': 1.0, 'OS-FLV-EXT-DATA:ephemeral': 0, 'disk': 20, 'id': '21c0cf18-d0dc-43ab-8fdb-40ba8b0935d9'}, {'name': 'compute-8', 'links': [{'href': 'http://console.ustack.com/v2/8fb9f2b042ee4233a519784db37a5f2f/flavors/270a6d65-d1da-4a15-ad3a-7bcf969839e5', 'rel': 'self'}, {'href': 'http://console.ustack.com/8fb9f2b042ee4233a519784db37a5f2f/flavors/270a6d65-d1da-4a15-ad3a-7bcf969839e5', 'rel': 'bookmark'}], 'ram': 8192, 'OS-FLV-DISABLED:disabled': false, 'vcpus': 8, 'swap': '', 'os-flavor-access:is_public': true, 'rxtx_factor': 1.0, 'OS-FLV-EXT-DATA:ephemeral': 0, 'disk': 20, 'id': '270a6d65-d1da-4a15-ad3a-7bcf969839e5'}, {'name': 'micro-2', 'links': [{'href': 'http://console.ustack.com/v2/8fb9f2b042ee4233a519784db37a5f2f/flavors/3332c026-533a-43d0-b415-abd3fdab09bf', 'rel': 'self'}, {'href': 'http://console.ustack.com/8fb9f2b042ee4233a519784db37a5f2f/flavors/3332c026-533a-43d0-b415-abd3fdab09bf', 'rel': 'bookmark'}], 'ram': 1024, 'OS-FLV-DISABLED:disabled': false, 'vcpus': 1, 'swap': '', 'os-flavor-access:is_public': true, 'rxtx_factor': 1.0, 'OS-FLV-EXT-DATA:ephemeral': 0, 'disk': 20, 'id': '3332c026-533a-43d0-b415-abd3fdab09bf'}, {'name': 'standard-2', 'links': [{'href': 'http://console.ustack.com/v2/8fb9f2b042ee4233a519784db37a5f2f/flavors/7f05780f-caf6-43bd-af55-b183cec6a758', 'rel': 'self'}, {'href': 'http://console.ustack.com/8fb9f2b042ee4233a519784db37a5f2f/flavors/7f05780f-caf6-43bd-af55-b183cec6a758', 'rel': 'bookmark'}], 'ram': 4096, 'OS-FLV-DISABLED:disabled': false, 'vcpus': 2, 'swap': '', 'os-flavor-access:is_public': true, 'rxtx_factor': 1.0, 'OS-FLV-EXT-DATA:ephemeral': 0, 'disk': 20, 'id': '7f05780f-caf6-43bd-af55-b183cec6a758'}, {'name': 'standard-12', 'links': [{'href': 'http://console.ustack.com/v2/8fb9f2b042ee4233a519784db37a5f2f/flavors/8aaf699a-c760-43cf-8241-4b4cabbfaa51', 'rel': 'self'}, {'href': 'http://console.ustack.com/8fb9f2b042ee4233a519784db37a5f2f/flavors/8aaf699a-c760-43cf-8241-4b4cabbfaa51', 'rel': 'bookmark'}], 'ram': 24576, 'OS-FLV-DISABLED:disabled': false, 'vcpus': 12, 'swap': '', 'os-flavor-access:is_public': true, 'rxtx_factor': 1.0, 'OS-FLV-EXT-DATA:ephemeral': 0, 'disk': 20, 'id': '8aaf699a-c760-43cf-8241-4b4cabbfaa51'}, {'name': 'micro-1', 'links': [{'href': 'http://console.ustack.com/v2/8fb9f2b042ee4233a519784db37a5f2f/flavors/8abaa0f9-30e1-4509-8ba5-5c97366029df', 'rel': 'self'}, {'href': 'http://console.ustack.com/8fb9f2b042ee4233a519784db37a5f2f/flavors/8abaa0f9-30e1-4509-8ba5-5c97366029df', 'rel': 'bookmark'}], 'ram': 512, 'OS-FLV-DISABLED:disabled': false, 'vcpus': 1, 'swap': '', 'os-flavor-access:is_public': true, 'rxtx_factor': 1.0, 'OS-FLV-EXT-DATA:ephemeral': 0, 'disk': 20, 'id': '8abaa0f9-30e1-4509-8ba5-5c97366029df'}, {'name': 'memory-12', 'links': [{'href': 'http://console.ustack.com/v2/8fb9f2b042ee4233a519784db37a5f2f/flavors/8e49d971-a306-4e59-ab04-fd0db8ba8f06', 'rel': 'self'}, {'href': 'http://console.ustack.com/8fb9f2b042ee4233a519784db37a5f2f/flavors/8e49d971-a306-4e59-ab04-fd0db8ba8f06', 'rel': 'bookmark'}], 'ram': 49152, 'OS-FLV-DISABLED:disabled': false, 'vcpus': 12, 'swap': '', 'os-flavor-access:is_public': true, 'rxtx_factor': 1.0, 'OS-FLV-EXT-DATA:ephemeral': 0, 'disk': 20, 'id': '8e49d971-a306-4e59-ab04-fd0db8ba8f06'}, {'name': 'standard-1', 'links': [{'href': 'http://console.ustack.com/v2/8fb9f2b042ee4233a519784db37a5f2f/flavors/8e7ae928-b7ee-4883-b2b5-49d23e0b1909', 'rel': 'self'}, {'href': 'http://console.ustack.com/8fb9f2b042ee4233a519784db37a5f2f/flavors/8e7ae928-b7ee-4883-b2b5-49d23e0b1909', 'rel': 'bookmark'}], 'ram': 2048, 'OS-FLV-DISABLED:disabled': false, 'vcpus': 1, 'swap': '', 'os-flavor-access:is_public': true, 'rxtx_factor': 1.0, 'OS-FLV-EXT-DATA:ephemeral': 0, 'disk': 20, 'id': '8e7ae928-b7ee-4883-b2b5-49d23e0b1909'}, {'name': 'memory-8', 'links': [{'href': 'http://console.ustack.com/v2/8fb9f2b042ee4233a519784db37a5f2f/flavors/aa5987fe-6bf4-4162-a817-5cdc5c4338db', 'rel': 'self'}, {'href': 'http://console.ustack.com/8fb9f2b042ee4233a519784db37a5f2f/flavors/aa5987fe-6bf4-4162-a817-5cdc5c4338db', 'rel': 'bookmark'}], 'ram': 32768, 'OS-FLV-DISABLED:disabled': false, 'vcpus': 8, 'swap': '', 'os-flavor-access:is_public': true, 'rxtx_factor': 1.0, 'OS-FLV-EXT-DATA:ephemeral': 0, 'disk': 20, 'id': 'aa5987fe-6bf4-4162-a817-5cdc5c4338db'}, {'name': 'memory-4', 'links': [{'href': 'http://console.ustack.com/v2/8fb9f2b042ee4233a519784db37a5f2f/flavors/b59c48a8-f816-4689-8f0c-2951d37e9c44', 'rel': 'self'}, {'href': 'http://console.ustack.com/8fb9f2b042ee4233a519784db37a5f2f/flavors/b59c48a8-f816-4689-8f0c-2951d37e9c44', 'rel': 'bookmark'}], 'ram': 16384, 'OS-FLV-DISABLED:disabled': false, 'vcpus': 4, 'swap': '', 'os-flavor-access:is_public': true, 'rxtx_factor': 1.0, 'OS-FLV-EXT-DATA:ephemeral': 0, 'disk': 20, 'id': 'b59c48a8-f816-4689-8f0c-2951d37e9c44'}, {'name': 'compute-2', 'links': [{'href': 'http://console.ustack.com/v2/8fb9f2b042ee4233a519784db37a5f2f/flavors/b59d6ef7-95dd-424d-9db5-a2bc9c792f73', 'rel': 'self'}, {'href': 'http://console.ustack.com/8fb9f2b042ee4233a519784db37a5f2f/flavors/b59d6ef7-95dd-424d-9db5-a2bc9c792f73', 'rel': 'bookmark'}], 'ram': 2048, 'OS-FLV-DISABLED:disabled': false, 'vcpus': 2, 'swap': '', 'os-flavor-access:is_public': true, 'rxtx_factor': 1.0, 'OS-FLV-EXT-DATA:ephemeral': 0, 'disk': 20, 'id': 'b59d6ef7-95dd-424d-9db5-a2bc9c792f73'}, {'name': 'standard-4', 'links': [{'href': 'http://console.ustack.com/v2/8fb9f2b042ee4233a519784db37a5f2f/flavors/be7f5c4e-08c2-4576-8bac-290d2a9335f5', 'rel': 'self'}, {'href': 'http://console.ustack.com/8fb9f2b042ee4233a519784db37a5f2f/flavors/be7f5c4e-08c2-4576-8bac-290d2a9335f5', 'rel': 'bookmark'}], 'ram': 8192, 'OS-FLV-DISABLED:disabled': false, 'vcpus': 4, 'swap': '', 'os-flavor-access:is_public': true, 'rxtx_factor': 1.0, 'OS-FLV-EXT-DATA:ephemeral': 0, 'disk': 20, 'id': 'be7f5c4e-08c2-4576-8bac-290d2a9335f5'}, {'name': 'compute-4', 'links': [{'href': 'http://console.ustack.com/v2/8fb9f2b042ee4233a519784db37a5f2f/flavors/c40bf599-a979-4404-8332-5a23f75a66cd', 'rel': 'self'}, {'href': 'http://console.ustack.com/8fb9f2b042ee4233a519784db37a5f2f/flavors/c40bf599-a979-4404-8332-5a23f75a66cd', 'rel': 'bookmark'}], 'ram': 4096, 'OS-FLV-DISABLED:disabled': false, 'vcpus': 4, 'swap': '', 'os-flavor-access:is_public': true, 'rxtx_factor': 1.0, 'OS-FLV-EXT-DATA:ephemeral': 0, 'disk': 20, 'id': 'c40bf599-a979-4404-8332-5a23f75a66cd'}, {'name': 'memory-1', 'links': [{'href': 'http://console.ustack.com/v2/8fb9f2b042ee4233a519784db37a5f2f/flavors/d049a545-6f64-49d0-81d2-68a3e11f656f', 'rel': 'self'}, {'href': 'http://console.ustack.com/8fb9f2b042ee4233a519784db37a5f2f/flavors/d049a545-6f64-49d0-81d2-68a3e11f656f', 'rel': 'bookmark'}], 'ram': 4096, 'OS-FLV-DISABLED:disabled': false, 'vcpus': 1, 'swap': '', 'os-flavor-access:is_public': true, 'rxtx_factor': 1.0, 'OS-FLV-EXT-DATA:ephemeral': 0, 'disk': 20, 'id': 'd049a545-6f64-49d0-81d2-68a3e11f656f'}, {'name': 'standard-16', 'links': [{'href': 'http://console.ustack.com/v2/8fb9f2b042ee4233a519784db37a5f2f/flavors/d200524b-f8b1-4024-986b-ec9c341c55ff', 'rel': 'self'}, {'href': 'http://console.ustack.com/8fb9f2b042ee4233a519784db37a5f2f/flavors/d200524b-f8b1-4024-986b-ec9c341c55ff', 'rel': 'bookmark'}], 'ram': 32768, 'OS-FLV-DISABLED:disabled': false, 'vcpus': 16, 'swap': '', 'os-flavor-access:is_public': true, 'rxtx_factor': 1.0, 'OS-FLV-EXT-DATA:ephemeral': 0, 'disk': 20, 'id': 'd200524b-f8b1-4024-986b-ec9c341c55ff'}, {'name': 'standard-8', 'links': [{'href': 'http://console.ustack.com/v2/8fb9f2b042ee4233a519784db37a5f2f/flavors/e15253c2-c340-4402-89ae-cfd794774560', 'rel': 'self'}, {'href': 'http://console.ustack.com/8fb9f2b042ee4233a519784db37a5f2f/flavors/e15253c2-c340-4402-89ae-cfd794774560', 'rel': 'bookmark'}], 'ram': 16384, 'OS-FLV-DISABLED:disabled': false, 'vcpus': 8, 'swap': '', 'os-flavor-access:is_public': true, 'rxtx_factor': 1.0, 'OS-FLV-EXT-DATA:ephemeral': 0, 'disk': 20, 'id': 'e15253c2-c340-4402-89ae-cfd794774560'}]};
  var priceObj = [
    {'currency': 'CNY', 'unit': 'hour', 'unit_price': '0.0500', 'name': 'listener', 'service': 'network'},
    {'currency': 'CNY', 'unit': 'hour', 'unit_price': '2.0000', 'name': 'instance:compute-12', 'service': 'compute'},
    {'currency': 'CNY', 'unit': 'hour', 'unit_price': '1.3330', 'name': 'instance:compute-8', 'service': 'compute'},
    {'currency': 'CNY', 'unit': 'hour', 'unit_price': '0.6670', 'name': 'instance:compute-4', 'service': 'compute'},
    {'currency': 'CNY', 'unit': 'hour', 'unit_price': '0.3330', 'name': 'instance:compute-2', 'service': 'compute'},
    {'currency': 'CNY', 'unit': 'hour', 'unit_price': '2.8890', 'name': 'instance:memory-8', 'service': 'compute'},
    {'currency': 'CNY', 'unit': 'hour', 'unit_price': '1.4440', 'name': 'instance:memory-4', 'service': 'compute'},
    {'currency': 'CNY', 'unit': 'hour', 'unit_price': '0.7220', 'name': 'instance:memory-2', 'service': 'compute'},
    {'currency': 'CNY', 'unit': 'hour', 'unit_price': '0.3610', 'name': 'instance:memory-1', 'service': 'compute'},
    {'currency': 'CNY', 'unit': 'hour', 'unit_price': '2.6670', 'name': 'instance:standard-12', 'service': 'compute'},
    {'currency': 'CNY', 'unit': 'hour', 'unit_price': '1.7780', 'name': 'instance:standard-8', 'service': 'compute'},
    {'currency': 'CNY', 'unit': 'hour', 'unit_price': '0.8890', 'name': 'instance:standard-4', 'service': 'compute'},
    {'currency': 'CNY', 'unit': 'hour', 'unit_price': '0.4440', 'name': 'instance:standard-2', 'service': 'compute'},
    {'currency': 'CNY', 'unit': 'hour', 'unit_price': '0.2220', 'name': 'instance:standard-1', 'service': 'compute'},
    {'currency': 'CNY', 'unit': 'hour', 'unit_price': '0.1110', 'name': 'instance:micro-2', 'service': 'compute'},
    {'currency': 'CNY', 'unit': 'hour', 'unit_price': '0.0560', 'name': 'instance:micro-1', 'service': 'compute'},
    {'currency': 'CNY', 'unit': 'hour', 'unit_price': '0.0300', 'name': 'alarm', 'service': 'monitor'},
    {'currency': 'CNY', 'unit': 'hour', 'unit_price': '0.0500', 'name': 'router', 'service': 'network'},
    {'currency': 'CNY', 'unit': 'hour', 'unit_price': '0.0300', 'name': 'ip.floating', 'service': 'network'},
    {'currency': 'CNY', 'unit': 'hour', 'unit_price': '0.0002', 'name': 'snapshot.size', 'service': 'block_storage'},
    {'currency': 'CNY', 'unit': 'hour', 'unit_price': '0.0006', 'name': 'sata.volume.size', 'service': 'block_storage'},
    {'currency': 'CNY', 'unit': 'hour', 'unit_price': '0.0020', 'name': 'volume.size', 'service': 'block_storage'},
    {'currency': 'CNY', 'unit': 'hour', 'unit_price': '0.0006', 'name': 'sata.volume.size', 'service': 'block_storage'},
    {'currency': 'CNY', 'unit': 'hour', 'unit_price': '0.0020', 'name': 'volume.size', 'service': 'block_storage'},
    {'currency': 'CNY', 'unit': 'hour', 'unit_price': '4.3330', 'name': 'instance:memory-12', 'service': 'compute'},
    {'currency': 'CNY', 'unit': 'hour', 'unit_price': '3.5560', 'name': 'instance:standard-16', 'service': 'compute'},
    {'currency': 'CNY', 'unit': 'hour', 'unit_price': '0.0002', 'name': 'hostSnapshot', 'service': 'compute'},
    {'currency': 'CNY', 'unit': 'hour', 'unit_price': '0.0060', 'name': 'fileShare', 'service': 'compute'}];
  var Slider = function(wrapper, min, max, unit, onChange) {
    this.min = min;
    this.max = max;
    this.unit = unit;
    this.wrapper = wrapper;
    this.onChange = onChange;
    this.value = this.min;
    this.start = 0;
    var html = [];
    var index = 0;
    html[index++] = '<div class="g-slider">';
    html[index++] = '<div class="track"><div class="hasValue"></div><div class="thumb"><span class="num"></span></div></div>';
    html[index++] = '<div class="numberPad">' + this.min + ' - ' + this.max + this.unit + '</div>';
    html[index++] = '<div class="resPad"><input class="numberUnit" type="text" value="" /><div class="unit">' + this.unit + '</div></div></div>';
    this.wrapper.html(html.join(''));
    var that = this;
    this.x = 0;
    this.thumbnail = this.wrapper.find('.thumb');
    this.onDragging = false;
    this.barLength = this.wrapper.find('.track').width();
    this.thumbnail.on('mousedown touchstart', function(e) { console.log('start');
      that.start = parseInt(that.thumbnail.css('left'));
      if(e.type == 'touchstart'){
        that.isTouch = true;
        that.x = e.originalEvent.changedTouches[0].pageX;
      }else{
        that.x = e.pageX;
      }
      that.onDragging = true;
      // e.preventDefault();
    });

    $(document).on('mouseup touchend', function(e) { console.log('end');
      if(that.isTouch){
        if(e.type == 'touchend'){
          that.onDragging = false;
        }
        return;
      }
      that.onDragging = false;
      that.isTouch    = false;
    });
    $(document).on('mousemove touchmove', function(e) {
      if (that.thumbnail && that.onDragging) {
        if(that.isTouch){
          if(e.type == 'touchmove'){
            that.ex = e.originalEvent.changedTouches[0].pageX;
          }else{
            return;
          }
        }else{
          that.ex = e.pageX;
        }
        var pos = that.ex - that.x;
        var v = Math.round( (that.start + pos) / that.barLength * (that.max - that.min) + that.min);
        that.setValue(v);
      }
    });

    $(window).on({
      resize: function(){
        that.barLength = that.wrapper.find('.track').width();
      }
    });
    this.wrapper.find('input').blur(function(e) {
      var v = parseInt($(this).val(), 10);
      if (!isNaN(v)) {
        that.setValue(v);
      }
      e.preventDefault();
    });
    
    this.wrapper.find('.track').on('click',function(e) {
      var v = Math.round( (e.pageX - $(this).offset().left) / that.barLength * (that.max - that.min) + that.min );
      if (!isNaN(v)) {
        that.setValue(v);
      }
      e.preventDefault(); 
    });
  };

  Slider.prototype = {
    setValue: function(v) {
      if (v < this.min) {
        v = this.min;
      }
      if (v > this.max) {
        v = this.max;
      }
      var pos = (v - this.min) / (this.max - this.min) * this.barLength;
      this.thumbnail.css({
        left: pos - 6
      });
      this.wrapper.find('input').val(v);
      this.wrapper.find('.hasValue').width(pos);
      this.value = v;
      if (this.onChange) {
        this.onChange(v);
      }
    }
  };

  var serviceObj = {};
  var vcpus = [];
  var rams = [];
  priceObj.forEach(function(node) {
    var service = node.name;
    if (/^instance\:/.test(service)) {
      service = 'instance';
    } else if (/^(.+)\.size$/.test(service)) {
      service = service.replace('.size', '');
    }
    if (!serviceObj[service]) {
      serviceObj[service] = [node];
    } else {
      serviceObj[service].push(node);
    }
  });
  var services          = serviceObj['instance'];
  var voluemPrice       = serviceObj['volume'][0];
  var sataVolumePrice   = serviceObj['sata.volume'][0];
  var snapshotPrice     = serviceObj['snapshot'][0];
  var ipPrice           = serviceObj['ip.floating'][0];
  var routerPrice       = serviceObj['router'][0];
  var hostSnapshotPrice = serviceObj['hostSnapshot'][0];
  var listenerPrice     = serviceObj['listener'][0];
  var alarmPrice        = serviceObj['alarm'][0];
  var fileSharePrice    = serviceObj['fileShare'][0];

  var flavor = flavorObj.flavors;

  services.forEach(function(price) {
    for (var i = 0; i < flavor.length; i++) {
      var f = flavor[i];
      if (f.name == price.name.replace('instance:', '')) {
        price.vcpus = f.vcpus;
        price.ram = f.ram;
      }
    }
    var vcpu = price.vcpus;
    var ram = price.ram;
    if (ram && vcpu) {
      if (vcpus.indexOf(vcpu) < 0) {
        vcpus.push(vcpu);
      }
      if (rams.indexOf(ram) < 0) {
        rams.push(ram);
      }
    }
  });
  var s = function(a, b) {
    return a - b;
  };
  vcpus.sort(s);
  rams.sort(s);
  // Generate the instance flavor selector.
  var Calcalutor = function() {
    this.instance = null;
    this.instanceNumber = 0;
    this.instancePrice = 0;
    this.volume = null;
    this.volumeNumber = 0;
    this.volumePrice = 0;
    this.sataVolume = null;
    this.sataVolumeNumber = 0;
    this.sataVolumePrice = 0;
    this.router = null;
    this.routerNumber = 0;
    this.routerPrice = 0;
    this.ip = null;
    this.ipNumber = 0;
    this.ipPrice = 0;
    this.snapshot = null;
    this.snapshotNumber = 0;
    this.snapshotPrice = 0;
    this.hostSnapshot = null;
    this.hostSnapshotNumber = 0;
    this.hostSnapshotPrice = 0;
    this.listener = null;
    this.listenerNumber = 0;
    this.listenerPrice = 0;
    this.alarm = null;
    this.alarmNumber = 0;
    this.alarmPrice = 0;
    this.fileShare = null;
    this.fileShareNumber = 0;
    this.fileSharePrice = 0;
    this.currentVpu = null;
    this.currentRam = null;
    this.currentSys = null;
    this.total = 0;
  };

  Calcalutor.prototype = {
    setTotal: function() {
      this.total = this.instancePrice * this.instanceNumber + this.volumePrice * this.volumeNumber + this.ipPrice * this.ipNumber + this.routerPrice * this.routerNumber + this.sataVolumePrice * this.sataVolumeNumber
                   + this.snapshotPrice * this.snapshotNumber + this.hostSnapshotPrice * this.hostSnapshotNumber + this.listenerPrice * this.listenerNumber + this.alarmPrice * this.alarmNumber + this.fileSharePrice * this.fileShareNumber;
      $('.pricelist .total strong').text(this.toMonth(this.total).toFixed(2));
    },
    setInstance: function(obj) {
      this.instance = obj;
      this.setPrice('instance', obj.unit_price);
    },
    setInstanceNumber: function(count) {
      var obj = this.instance;
      var flavor = '';
      if (/micro/.test(obj.name)) {
        flavor += '微型 ';
      } else if (/compute/.test(obj.name)) {
        flavor += '计算型 ';
      } else if (/standard/.test(obj.name)) {
        flavor += '标准型 ';
      } else if (/memory/.test(obj.name)) {
        flavor += '内存型 ';
      }
      flavor += obj.vcpus + 'vCPU ';
      if (obj.ram < 1024) {
        flavor += obj.ram + 'M';
      } else {
        flavor += Math.round(obj.ram / 1024) + 'G';
      }
      if (count < 1) {
        count = 1;
      }
      this.instanceNumber = count;
      this.instancePrice = parseFloat(this.instance.unit_price);
      cal.addType('云主机', flavor, count, this.instancePrice);
    },
    setVolume: function(size) {
      this.volume = size;
      this.setPrice('volume', voluemPrice.unit_price * size);
    },
    setVolumeNumber: function(count) {
      this.volumeNumber = count;
      this.volumePrice = parseFloat(voluemPrice.unit_price) * this.volume;
      cal.addType('性能型云硬盘', this.volume + 'GB', count, this.volumePrice);
    },
    setSataVolume: function(size) {
      this.sataVolume = size;
      this.setPrice('sataVolume', sataVolumePrice.unit_price * size);
    },
    setSataVolumeNumber: function(count) {
      this.sataVolumeNumber = count;
      this.sataVolumePrice = parseFloat(sataVolumePrice.unit_price) * this.sataVolume;
      cal.addType('容量型云硬盘', this.sataVolume + 'GB', count, this.sataVolumePrice);
    },
    setIP: function(size) {
      this.ip = size;
      this.setPrice('ip', ipPrice.unit_price * size);
    },
    setIPNumber: function(count) {
      this.ipNumber = count;
      this.ipPrice = parseFloat(ipPrice.unit_price) * this.ip;
      cal.addType('公网IP', this.ip + 'Mbps', count, this.ipPrice);
    },
    setRouter: function(size) {
      this.router = size;
      this.setPrice('router', routerPrice.unit_price * size);
    },
    setRouterNumber: function(count) {
      this.routerNumber = count;
      this.routerPrice = parseFloat(routerPrice.unit_price) * this.router;
      cal.addType('路由器', this.router + '个', count, this.routerPrice);
    },
    setSnapshot: function(size) {
      this.snapshot = size;
      this.setPrice('snapshot', snapshotPrice.unit_price * size);
    },
    setSnapshotNumber: function(count) {
      this.snapshotNumber = count;
      this.snapshotPrice = parseFloat(snapshotPrice.unit_price) * this.snapshot;
      cal.addType('云硬盘快照', this.snapshot + 'GB', count, this.snapshotPrice);
    },
    setHostSnapshot: function(size) {
      this.hostSnapshot = size;
      this.setPrice('hostSnapshot', hostSnapshotPrice.unit_price * size);
    },
    setHostSnapshotNumber: function(count) {
      this.hostSnapshotNumber = count;
      this.hostSnapshotPrice = parseFloat(hostSnapshotPrice.unit_price) * this.hostSnapshot;
      cal.addType('主机快照', this.hostSnapshot + 'GB', count, this.hostSnapshotPrice);
    },
    setListener: function(size) {
      this.listener = size;
      this.setPrice('listener', listenerPrice.unit_price * size);
    },
    setListenerNumber: function(count) {
      this.listenerNumber = count;
      this.listenerPrice = parseFloat(listenerPrice.unit_price) * this.listener;
      cal.addType('监听器', this.listener + '连接数', count, this.listenerPrice);
    },
    setAlarm: function(size) {
      this.alarm = size;
      this.setPrice('alarm', alarmPrice.unit_price * size);
    },
    setAlarmNumber: function(count) {
      this.alarmNumber = count;
      this.alarmPrice = parseFloat(alarmPrice.unit_price) * this.alarm;
      cal.addType('监控报警', this.alarm + '个', count, this.alarmPrice);
    },
    setFileShare: function(size) {
      this.fileShare = size;
      this.setPrice('fileShare', fileSharePrice.unit_price * size);
    },
    setFileShareNumber: function(count) {
      this.fileShareNumber = count;
      this.fileSharePrice = parseFloat(fileSharePrice.unit_price) * this.fileShare;
      cal.addType('文件共享', this.fileShare + 'GB', count, this.fileSharePrice);
    },
    setPrice: function(type, value) {
      var v = parseFloat(value);
      var res = $('.res[data-vtype="' + type + '"]');
      res.find('span:eq(0) strong').text(this.toMonth(v).toFixed(2));
      res.find('span:eq(1) strong').text(this.toHour(v).toFixed(4));
    },
    toMonth: function(v) {
      return v * 24 * 30;
    },
    toHour: function(v) {
      return v;
    }
  };
  var c = new Calcalutor();
  $('.interactiveArea').on('click', '.options.vcpu a', function() {
    if ($(this).hasClass('selected')) {
      return;
    }
    $('.interactiveArea .options.vcpu a').removeClass('selected');
    $(this).addClass('selected');
    // Get valid CPU.
    $('.interactiveArea .options.ram >li >a').addClass('hide');
    var type = parseInt($(this).data('vcpu'), 10);
    var allData = [];
    priceObj.forEach(function(price) {
      if (price.vcpus == type) {
        allData.push(price);
      }
    });
    var activeRam = [];
    allData.forEach(function(o) {
      if (activeRam.indexOf(o.ram) < 0) {
        activeRam.push(o.ram);
      }
    });
    var str = [];
    activeRam.forEach(function(ram, idx) {
      str[idx] = 'a[data-ram="' + ram + '"]';
    });
    $('.interactiveArea .options.ram').find(str.join(', ')).removeClass('hide');
    c.currentVpu = type;
    $('.options.ram a:visible').removeClass('selected').eq(0).trigger('click');
  });
  $('.interactiveArea').on('click', '.options.ram a', function() {
    if ($(this).hasClass('selected')) {
      return;
    }
    $('.interactiveArea .options.ram a').removeClass('selected');
    $(this).addClass('selected');
    var type = parseInt($(this).data('ram'), 10);
    c.currentRam = type;
    priceObj.forEach(function(price) {
      if (price.vcpus == c.currentVpu && price.ram == c.currentRam) {
        c.setInstance(price);
      }
    });
  });
  $('.interactiveArea').on('click', '.options.sys a', function() {
    if ($(this).hasClass('selected')) {
      return;
    }
    $('.interactiveArea .options.sys a').removeClass('selected');
    $(this).addClass('selected');
    var type = $(this).data('sys');
    c.currentSys = type;
  });

  $('.interactiveArea').each(function(index) {
    switch (index) {
      case 0:
        // Generate the instance tab.
        priceObj.forEach(function(price) {
          var name = price.name;
          if (name.indexOf('instance') >= 0) {
            name = name.replace('instance:', '');
            var a = name.split('-');
            if (a.length < 2) {
              return;
            }
            var type = a[0];
            if (!services[type]) {
              services[type] = [price];
            } else {
              services[type].push(price);
            }
          }
        });
        var html = [];
        var _index = 0;
        html[_index++] = '</ul><ul class="sys options">';
        var syss = new Array('Linux','Windows');
        syss.forEach(function(sys) {
          html[_index++] = '<li class="option"><a href="javascript:;" class="tab" data-sys="' + sys + '">';
          html[_index++] = sys;
          html[_index++] = '</a></li>';
        });
        html[_index++] = '</ul><ul class="vcpu options">';
        vcpus.forEach(function(vcpu) {
          html[_index++] = '<li class="option"><a href="javascript:;" class="tab" data-vcpu="' + vcpu + '">';
          html[_index++] = vcpu + ' <span class="unit">vCPU</span>';
          html[_index++] = '</a></li>';
        });
        html[_index++] = '</ul><ul class="ram options">';
        rams.forEach(function(ram) {
          var value = ram + '<span class="unit">M</span>';
          if (ram >= 1024) {
            value = Math.round(ram / 1024) + '<span class="unit">G</span>';
          }
          html[_index++] = '<li class="option"><a href="javascript:;" class="tab hide" data-ram="' + ram + '">';
          html[_index++] = value;
          html[_index++] = '</a></li>';
        });
        html[_index++] = '</ul>';  
        $(this).html(html.join(''));
        $(this).addClass('instance');
        $(this).siblings('.res').attr('data-vtype', 'instance');
        $('.options.vcpu a').eq(0).trigger('click');
        $('.options.sys a').eq(0).trigger('click');
        break;
      case 1:
        // HostSnapshot
        var htmlhs = '<div class="sliderArea"></div>';
        $(this).html(htmlhs);
        var s = new Slider($(this).find('.sliderArea'), 10, 1000, 'GB', function(value) {
          c.setHostSnapshot(value);
        });
        $(this).siblings('.res').attr('data-vtype', 'hostSnapshot');
        s.setValue(10);
        break;
      case 2:
      //floatingip
        var htmlfi = '<div class="sliderArea"></div>';
        $(this).html(htmlfi);
        var ss = new Slider($(this).find('.sliderArea'), 1, 30, 'M', function(value) {
          c.setIP(value);
        });
        $(this).siblings('.res').attr('data-vtype', 'ip');
        ss.setValue(1);
        break;
      case 3:
      //router
        $(this).siblings('.res').attr('data-vtype', 'router');
        c.setRouter(1);
        break;
      case 4:
        // Volume
        var htmlv = '<div class="sliderArea"></div><div class="ioArea"><div class="v iops"><div><strong>IOPS</strong> 1500 - 6000 IOPS</div><div class="graph"><div class="on"></div></div><div class="value"><strong></strong> IOPS</div></div><div class="v throughout"><div class="graph"><div class="on"></div></div><div class="value"><strong></strong> MB/s</div><div><strong>吞吐量</strong> 80 - 170 MB/s</div></div>';
        $(this).html(htmlv);
        var _that = $(this);
        var vs = new Slider($(this).find('.sliderArea'), 10, 1000, 'GB', function(value) {
          var iops = 1500;
          var throughout = 80;
          if (value > 100) {
            iops = Math.round(5 * value + 1000);
            throughout = Math.round(0.1 * value + 70);
          }
          var w1 = _that.find('.iops');
          w1.find('.value strong').text(iops);
          // w1.find('.on').width(Math.round(iops * 49 / 450 - 490/ 3));
          w1.find('.on').width((iops - 1500) / (6000 - 1500) * 100 + '%');
          var w2 = _that.find('.throughout');
          w2.find('.value strong').text(throughout);
          // w2.find('.on').width(Math.round((throughout - 80) * 49 / 9));
          w2.find('.on').width((throughout - 80) / (170 - 80) * 100 + '%');  
          c.setVolume(value);
        });
        $(this).siblings('.res').attr('data-vtype', 'volume');
        vs.setValue(10);
        break;
      case 5:
        var htmlvs = '<div class="sliderArea"></div>';
        $(this).html(htmlvs);
        var r = new Slider($(this).find('.sliderArea'), 10, 5000, 'GB', function(value) {
          c.setSataVolume(value);
        });
        $(this).siblings('.res').attr('data-vtype', 'sataVolume');
        r.setValue(10);
        break;
      case 6:
        // Snapshot
        var htmls = '<div class="sliderArea"></div>';
        $(this).html(htmls);
        var sh = new Slider($(this).find('.sliderArea'), 10, 1000, 'GB', function(value) {
          c.setSnapshot(value);
        });
        $(this).siblings('.res').attr('data-vtype', 'snapshot');
        sh.setValue(10);
        break;
      case 7:
        // Alarm
        $(this).siblings('.res').attr('data-vtype', 'alarm');
        c.setAlarm(1);
        break;
      case 8:
        // Listener
        $(this).siblings('.res').attr('data-vtype', 'listener');
        c.setListener(1);
        break;
      case 9:
        // FilleShare
        var htmla = '<div class="sliderArea"></div>';
        $(this).html(htmla);
        var sa = new Slider($(this).find('.sliderArea'), 10, 1000, 'GB', function(value) {
          c.setFileShare(value);
        });
        $(this).siblings('.res').attr('data-vtype', 'fileShare');
        sa.setValue(10);
        break;
    }
  });

  function Cal() {
    this.total = 0;
    this.wrapper = $('.pricelist >ul');
  }

  Cal.prototype = {
    addType: function(type, label, count, unit_price) {
      count = parseInt(count, 10);
      var lis = this.wrapper.find('>li');
      for (var i = 0; i < lis.length; i++) {
        var li = lis.eq(i);
        var title = li.find('h1').text();
        var l = li.find('h2').text();
        if (title == type && label == l) {
          var input = li.find('input');
          var oldCount = parseInt(input.val());
          var newCount = oldCount + count;
          var price = parseFloat(input.data('unit'));
          input.val(newCount);
          li.find('.month strong').text((newCount * price * 24 * 30).toFixed(2));
          li.find('.hour strong').text((newCount * price).toFixed(4));
          this.calTotal();
          return;
        }
      }
      var html = ['<li data-type="' + ((type.substr(-3) == '浜戠‖鐩�') ? '浜戠‖鐩�' : type) + '"><span class="line"><h1>', type, '</h1><h2 class="size">', label, '</h2></span><div class="pricing month"><strong>', (24 * 30 * unit_price * count).toFixed(2), '</strong>元/月</div><div class="pricing hour"><strong>', (unit_price * count).toFixed(4), '</strong>元/小时</div><div class="count"><a href="javascript:;" class="min">-</a><input data-unit="', unit_price, '" type="text" value="', count, '"><a href="javascript:;" class="add">+</a></div><a href="javascript:;" class="close">+</a></li>'].join('');
      this.wrapper.append(html);
      this.calTotal();
    },
    calTotal: function() {
      var total = 0;
      this.wrapper.find('input').each(function() {
        var count = parseInt($(this).val(), 10);
        var price = parseFloat($(this).data('unit'));
        total += price * count;
      });
      $('.pricelist .total.hour strong').text(total.toFixed(4));
      $('.pricelist .total.month strong').text((24 * 30 * total).toFixed(2));
    }
  };
  var cal = new Cal();
  $('.pricelist .nav a').on('click', function() {
    var month = $(this).hasClass('month');
    if (month) {
      $('.pricelist').addClass('month').removeClass('hour');
    } else {
      $('.pricelist').addClass('hour').removeClass('month');
    }
  });
  $('#price').on('click', '.count >a', function() {
    var step = $(this).hasClass('add') ? 1 : -1;
    var input = $(this).siblings('input');
    var v = parseInt(input.val(), 10);
    var newValue = v + step;
    if( newValue < 1 ){
      return false;
    }
    input.val(newValue);
    input.trigger('blur');
  });
  $('#price').on('click', '.adds', function() {
    var input = $(this).siblings('.count').find('input');
    var v = input.val();
    if (isNaN(v) || v < 1) {
      v = 1;
      input.val(v);
    }
    if (v != input.val()) {
      input.val(v);
    }
    var type = input.data('type');
    var f = 'set' + type + 'Number';
    if (c[f]) {
      c[f].apply(c, [v]);
    }
    $(this).parents('li').addClass('check');
  });
  $('#price').on('blur', '.pricelist .count input', function() {
    var v = $(this).val();
    if (isNaN(v) || v < 1) {
      v = 1;
      $(this).val(v);
    }
    if (v != $(this).val()) {
      $(this).val(v);
    }
    var price = parseFloat($(this).data('unit'));
    var p = $(this).parent();
    p.siblings('.month').find('strong').text((price * v * 24 * 30).toFixed(2));
    p.siblings('.hour').find('strong').text((price * v).toFixed(4));
    cal.calTotal();
  });
  $('.pricelist').on('click', '.close', function() {
    var pa = $(this).parent(),
      type = pa.data('type');
    if( pa.siblings('li[data-type="' + type + '"]').length < 1 ){
      $('#price .content>li[data-type="' + type + '"]').removeClass('check');
    }
    $(this).parent().remove();
    cal.calTotal();
  });
  $('#price').on('focus', '.count input', function() {
    $(this).parent().addClass('active');
  });
  $('#price').on('blur', '.count input', function() {
    $(this).parent().removeClass('active');
  });
  $('#price li.disk span.tab').each(function(index){
    $(this).click(function(){
      $(this).addClass('selected').siblings('span.tab').removeClass('selected').parent().siblings('.for-tab').hide(0).eq(index).show(0);
    });
  });
  $('#price .content>li').each(function(index){
    $(this).attr('data-type', $(this).children('h1').text() );
  });
  $('#price .content>li .thumb').each(function(index){
    $(this).css('left',0);
  });
})(document, window);