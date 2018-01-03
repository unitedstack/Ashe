require('./style/index.less');

/*=====================初始化变量和函数=====================*/
var city = document.getElementById('selectCity');
var role = document.getElementById('selectRole');
var type = document.getElementById('selectType');
var show = document.getElementById('selectShow');
var jobList = document.getElementById('jobList');
var selectBefore = document.getElementById('select-before');
var selectAfter = document.getElementById('select-after');

var jobs;//保存从ajax获取的数据
var cityPool = [];//装选中的城市
var rolePool = [];//装选中的职位类型
var typePool = [];//装选中的求职类型
var pool = [];//装上面三种
var field = [];//装city、role、type三个节点


var choosePool = chooseConstruct(pool);//从对应pool中删除选项
var chooseField = chooseConstruct(field);//删除city、role、type对应节点中子节点的属性


//页面加载初始化
addPool(pool, cityPool);
addPool(pool, rolePool);
addPool(pool, typePool);

addPool(field, city);
addPool(field, role);
addPool(field, type);

enrollAddEvent(city);
enrollAddEvent(role);
enrollAddEvent(type);
enrollDeleteEvent(show);

//ajax获取数据
$.ajax({
  method: 'GET',
  url: '/admin/api/job',
  dataType: 'json'
}).done(function (data) {
  jobs = data['jobs'];
  createAllJobs(jobs);

}).fail(function (err) {
  console.log(err);
});



/*=====================city、role、type选项的选择相关函数=====================*/



// 点击city、role、type触发的事件
function enrollAddEvent(node){
  node.addEventListener('click', function(e){
    var selected = isSelected(e.target);
    var firstChild = isfirstChild(node, e.target);
    var child = ischild(e.target, 'LI');
    
    if( child && !selected && !firstChild){
      changeSpecificAllState(node);
      e.target.setAttribute('class', 'select');
      addItem(e.target);
      hideAll();
      isShowIntro();
      filter();
      limitPadding();
    }else if(child && !selected && firstChild){
      changeSelectState(node);
      removeAllItem(getKey(e.target));
      e.target.setAttribute('class', 'select');
      isShowIntro();
      filter();
      limitPadding();
    }
  });
}

// 点击小叉触发的事件
function enrollDeleteEvent(node){
  node.addEventListener('click', function(e){
    var child = ischild(e.target, 'I');
    var parent = e.target.parentNode;
    var key = getKey(parent);
    var value = getValue(parent);
    if(child){
      show.removeChild(parent);
      chooseField(key, removeItem, value);
      choosePool(key, minusPool, value);
      hideAll();
      isShowIntro();
      filter();
      limitPadding();
      if(isNone(key)){
        chooseField(key, selectFirstChild);
      }
    }
  });
}
// 对选择框和结果框进行判断是否显示选择说明
function isShowIntro(){
  isIntroBefore(show, selectBefore);
  showSelect(selectAfter);
}


// 判断是否显示select说明
function isIntroBefore(ob, sel){
  if(ob.children.length === 1){
    showSelect(sel);
  }else{
    hideSelect(sel);
  }
}

// 隐藏select说明
function hideSelect(sel){
  sel.setAttribute('style', 'display: none;');
}

// 显示selct说明
function showSelect(sel){
  sel.setAttribute('style', 'display: block;');
}



//删除全部节点的class属性
function changeSelectState(node){
  var child = node.children;
  var len = child.length;
  for(var i = 1; i < len; i++){
    child[i].removeAttribute('class');
  }
}
//删除"全部"选项的class属性
function changeSpecificAllState(node){
  var child = node.children[0];
  if(isClassBeing(child)){
    child.removeAttribute('class');
  }
}
//判断某个选项是否已被选中
function isSelected(cNode){
  return cNode.getAttribute('class') === 'select';
}
//判断某个节点是否有class属性
function isClassBeing(node){
  return node.getAttribute('class');
}
//获取某个节点的key属性值
function getKey(node){
  return node.getAttribute('key');
}
//获取某个节点的value属性值
function getValue(node){
  return node.getAttribute('value');
}
//判断某个节点是否是其父节点中的第一个节点
function isfirstChild(pNode, cNode){
  return pNode.children[0] === cNode;
}
//判断某个节点是否是特定节点
function ischild(node, ele){
  return node && node.nodeName == ele;
}
//判断city、role、type选中的选项中的除“全部”选项外是否为零
function isNone(key){
  switch(key){
    case 'c': return cityPool.length == 0;
    case 'r': return rolePool.length == 0;
    case 't': return typePool.length == 0;
  }
}
//设置"全部"选项为选中项
function selectFirstChild(node){
  node.children[0].setAttribute('class', 'select');
}
//给选中结果区添加一个选项
function addItem(node){
  var content = node.innerText;
  var key = getKey(node);
  var value = getValue(node);
  var item = document.createElement('li');
  item.setAttribute('key', key);
  item.setAttribute('value', value);
  item.innerHTML = content + '<i class="icon-close"></i>';
  show.appendChild(item);
  choosePool(key, addPool, value); //添加选中的city名称、role名称、type名称到对应的pool
}
//choosePool、chooseField两个函数的创建函数
function chooseConstruct(arr){
  return function(key, func, value){
    switch(key){
      case 'c': func(arr[0], value);break;
      case 'r': func(arr[1], value);break;
      case 't': func(arr[2], value);break;
    }
  };
}

//去除某个city选项、role选项、type选项的class属性
function removeItem(node, value){
  var children = node.children;
  Array.prototype.map.call(children, function(ele){
    var typeValue = getValue(ele);
    if(typeValue === value){
      ele.removeAttribute('class');
    }
  });
}
//当点击city行、role行、type行的“全部”选项时，从结果区删除对应行的具体其他选项
function removeAllItem(key){
  var tem = Array.prototype.slice.call(show.children, 0);
  tem.map(function(cNode){
    var typeKey = getKey(cNode);
    var value = getValue(cNode);
    if(typeKey === key){
      show.removeChild(cNode);
      choosePool(key, minusPool, value);
    }
  });
}
// 将元素添加进某个pool
function addPool(pool, ele){
  pool.push(ele);
}
// 从某个pool中删除元素
function minusPool(pool, ele){
  var index = pool.indexOf(ele);
  pool.splice(index, 1);
}

/*================根据ajax获取的数据显示信息的相关函数===================*/

//创建所有工作信息
function createAllJobs(jobs){
  var len = jobs.length;
  for(var i = 0; i < len; i++){
    var job = createJobItem(jobs[i]);
    jobList.appendChild(job);
  }
}



// 创建一条工作信息
function createJobItem(job){
  var list = document.createElement('li');
  var title = createDiv('title');
  title.innerHTML = job['title'];
  var content = createDiv('content');
  var footer = createDiv('footer');
  footer.innerHTML= '<a href="mailto:zhaopin@unitedstack.com" class="btn-join">申请加入同方云</a>';

  var type = createPart('job-type', '职位类型：', job['type'] );
  var city = createPart('job-city', '工作地点：' ,job['location'].join('，'));
  var responsibility = createPart('job-responsibility', '岗位职责：', job['description']);
  var requirement = createPart('job-requirements', '任职要求：', job['requirement']);
  var plus = createPart('plus', '加分项：' , job['preferred']);
  var email = createPart('email', '投递邮箱：', '<a href="mailto:zhaopin@unitedstack.com">zhaopin@unitedstack.com</a>');

  list.appendChild(title);
  content.appendChild(type);
  content.appendChild(city);
  content.appendChild(responsibility);
  content.appendChild(requirement);
  if(job['preferred'] != ''){
    content.appendChild(plus);
  }
  content.appendChild(email);
  list.appendChild(content);
  list.appendChild(footer);
  list['city'] = job['location'];
  list['role'] = job['role'];
  list['type'] = job['type'];
  return list;
}

//创建单个div
function createDiv(className){
  var ele = document.createElement('div');
  ele.setAttribute('class', className);
  return ele;
}
//创建单个块
function createPart(className, inner1, inner2){
  var wapper = createDiv(className);
  var label = createDiv('label');
  label.innerHTML = inner1;
  var content = createDiv('content');
  content.innerHTML = inner2;
  wapper.appendChild(label);
  wapper.appendChild(content);
  return wapper;
}

/*===========================筛选函数==========================*/

//隐藏所有职位
function hideAll(){
  var children = Array.prototype.slice.call(jobList.children, 1);
  Array.prototype.map.call(children, function(cNode){
    cNode.setAttribute('style', 'display: none;');
  });
}

//显示所有职位
function displayAll(){
  var children = Array.prototype.slice.call(jobList.children, 1);
  Array.prototype.map.call(children, function(cNode){
    cNode.setAttribute('style', 'display: block;');
  });
}

//显示一个职位
function displayAJob(job){
  job.setAttribute('style', 'display: block;');
}

//筛选条件
function filter(){
  var children = Array.prototype.slice.call(jobList.children, 1);
  var attrCity = 'city';
  var attrRole = 'role';
  var attrType = 'type';
  var cityFlag = 0;
  var roleFlag = 0;
  var typeFlag = 0;

  var cityLen = cityPool.length;
  var roleLen = rolePool.length;
  var typeLen = typePool.length;
  
  Array.prototype.map.call(children, function(job){
    //工作地点是数组，角色和类别都是字符串
    job[attrCity].map(function(ele){
      if(cityLen > 0 && cityPool.indexOf(ele) != -1){
        cityFlag++;
      }
    });
    if(roleLen > 0 && rolePool.indexOf(job[attrRole]) != -1){
      roleFlag++;
    }
    if(typeLen > 0 && typePool.indexOf(job[attrType]) != -1){
      typeFlag++;
    }
    isShow(job, cityFlag, roleFlag, typeFlag);
    cityFlag = 0;
    roleFlag = 0;
    typeFlag = 0;
  });

}

//判断是否显示一个职位
function isShow(job, cityFlag, roleFlag, typeFlag){
  var cLen = cityPool.length;
  var rLen = rolePool.length;
  var tLen = typePool.length;
  if(cLen > 0 && rLen == 0 && tLen == 0){
    if(cityFlag > 0){
      hideSelect(selectAfter);
      displayAJob(job);
    }
  }else if(cLen > 0 && rLen > 0 && tLen == 0){
    if(cityFlag > 0 && roleFlag > 0){
      hideSelect(selectAfter);
      displayAJob(job);
    }
  }else if(cLen > 0 && rLen == 0 && tLen > 0){
    if(cityFlag > 0 && typeFlag > 0){
      hideSelect(selectAfter);
      displayAJob(job);
    }
  }else if(cLen > 0 && rLen > 0 && tLen > 0){
    if(cityFlag > 0 && roleFlag > 0 && typeFlag > 0){
      hideSelect(selectAfter);
      displayAJob(job);
    }
  }else if(cLen == 0 && rLen > 0 && tLen == 0){
    if(roleFlag > 0){
      hideSelect(selectAfter);
      displayAJob(job);
    }
  }else if(cLen == 0 && rLen > 0 && tLen > 0){
    if(roleFlag > 0 && typeFlag > 0){
      hideSelect(selectAfter);
      displayAJob(job);
    }
  }else if(cLen == 0 && rLen == 0 && tLen > 0){
    if(typeFlag > 0){
      hideSelect(selectAfter);
      displayAJob(job);
    }
  }else{
    hideSelect(selectAfter);
    displayAll();
  }
}

/*=============================样式控制相关函数==============================*/

//防止select-show区域添加选项后宽度变宽 
function limitPadding(){
  if(show.length != 0){
    show.setAttribute('style', 'padding-bottom: 6px;');
  }else{
    show.setAttribute('style', 'padding-bottom: 16px;');
  }
}



/*========================================================================*/

