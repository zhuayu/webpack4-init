# webpack4-init
通过一下例子，体验 webpack ，使用 ES6 import 、Less 、Vue  打包一个小模块。

1. 全局安装 webpack

```bash
npm install webpack webpack-cli -g
```

2. 创建项目文件夹并进入

```bash
cd ~/Desktop && mkdir webpack-init && cd webpack-init
```

3. 初始化 package ，输入命令后一路回车。

```bash
npm init 
```

4. 下载各种依赖包，其中包括

- webpack
- webpack-cli
- webpack-merge
- clean-webpack-plugin
- uglifyjs-webpack-plugin

- ES6
  - babel-loader
  - @babel/core
  - @babel/preset-env

- file
  - url-loader
  - file-loader

- Less
  - style-loader
  - css-loader
  - less-loader
  - less

- Vue
  - vue
  - vue-loader
  - vue-template-compiler

```bash
npm install webpack webpack-cli webpack-merge clean-webpack-plugin uglifyjs-webpack-plugin @babel/core babel-loader @babel/preset-env url-loader file-loader style-loader css-loader less-loader less vue vue-loader vue-template-compiler --save-dev
```

5. 在根目录下创建 **.babelrc** 文件，并编辑

```bash
touch .babelrc
```

```json
{
  "presets": ["@babel/preset-env"]
}
```

6. 在根目录下创建 **webpack.config.js** 文件，并编辑

```js
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: {
    app: './src/js/app.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(['dist']),
  ],
  module: {
    rules: [{
        test: /\.(css|less)$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "less-loader"
        }]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'url-loader'
        ]
      },
      {
        test: /\.(ttf|eot|woff(2))(\?[a-z0-9]+)?$/,
        loader: 'file-loader',
      },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.vue$/, loader: 'vue-loader' }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
};
```

6. 在根目录下创建 **webpack.dev.js** 文件，并编辑

```js
const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  }
});
```

7. 在根目录下创建 **webpack.prod.js** 文件，并编辑

```js
const merge = require('webpack-merge');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
        sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
});
```

8. 创建开发文件目录 src 并对里面结构进行编辑

```
|-webpack-init
|  ├ ...
|  ├ src
|  |  ├ js
|  |  |  ├ app.js
|  |  |  ├ app.vue
|  |  |  ├ print.js
|  |  ├ img
|  |  |  ├ avatar.png
|  |  ├ less
|  |  |  ├ app.less
```

添加图片 **src/img/avatar.png**

**src/less/app.less**

```css
html {
  min-height: 100%;
  background: #f5f5f5;
}
```

**src/js/print.js**

```js
const printMe = () => {
  console.log('I get called from print.js!');
}

export default printMe;
```

**src/js/app.vue**

```js
<template>
  <div>
    <div class="example">{{ msg }}</div>
    <img :src="avatar_url">
  </div>
</template>

<script>
import Avatar from './../img/avatar.png';
export default {
  data () {
    return {
      msg: 'Hello world!',
      avatar_url: Avatar,
    }
  }
}
</script>

<style lang="less">
.example {
  color: red;
}
</style>
```

**src/js/app.js**

```
// Less
import './../less/app.less';

// ES6 
import printMe from './print.js';
printMe();

// Vue
import Vue from 'vue'
import App from './app.vue'
new Vue({
    el: '#app',
    render:h=>h(App)
})
```

9. 在根目录中创建 **index.html**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>webpack-init</title>
</head>
<body>
  <div id="app"></div>
  <script type="text/javascript" src="dist/app.bundle.js"></script>
</body>
</html>
```

10. 配置 package 中 scripts

```bash
{
  ...,
  "scripts": {
    "start": "webpack --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
  },
  ...
}
```

11. 运行

```bash
npm start
```

12. 观察dist目录，并打开 index.html 查看效果

