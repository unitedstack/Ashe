<!DOCTYPE html>
<html>
<head>
  <title>Color palette</title>
  <style>
    html, body {
      margin: 0;
      padding: 0;
    }
    .title {
      width: 500px;
      margin: 20px auto;
      background-color: #f2f2f2;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
    .palette-wrapper {
      padding: 0;
      width: 500px;
      height: auto;
      margin: 40px auto;
      margin-bottom: 40px;
      box-shadow: 0 0 10px #b9b9b9;
    }
    .palette-wrapper > li {
      list-style: none;
      width: 100%;
      height: 40px;
    }
    .palette-wrapper > .center {
      text-align: center;
    }
    .palette-wrapper > li > div {
      padding-left: 10px;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      line-height: 40px;
      font-size: 14px;
      color: #000;
      text-shadow: 0 0 20px #fff;
    }
  </style>
</head>
<body>
  <div class="title">
    Theme @theme_name
  </div>
  <ul id="palette" class="palette-wrapper">

  </ul>
</body>
<script>
  var color = @palette;

  var palette = document.getElementById('palette');

  Object.keys(color).forEach(function(c) {
    var li = document.createElement('li');
    var font = document.createElement('div');
    if(/@color/.test(c)) {
      font.innerHTML = c + '   (' + color[c] + ') ';
      li.appendChild(font);
      li.style.backgroundColor = color[c];
      palette.appendChild(li);
    } else if(!/@/.test(c)) {
      font.innerHTML = color[c];
      li.className = 'center';
      li.appendChild(font);
      palette.appendChild(li);
    }
  });
</script>
</html>