---
layout: post
title:  "React 时尚的开发环境"
date:   2016-9-12 13:16:15
categories: 深入浅出 React.js 开发环境
tags: 深入浅出 React.js 开发环境
---
#### 本期节目将手把手教你去 NPM 市场买最新鲜的食材，只为搭配 React 下厨。


![react-ide-1](http://i.imgur.com/WWIrofU.png)


近几年，前端领域发展快的让人难以想象，层出不穷的思想，模块化、组件化、工程化、跨平台等，冲击着每一个前端开发者的技术视野。

![react-ide-t](http://i.imgur.com/2zr3aGA.jpg)

然而，从近两年来看 React 无疑是最热门、最受热捧的生态体系，当然你学会它，并且能用于实际项目开发，会是技术进阶快，且回报效率最高的。


简而言之，就是会这门生态，市场需求，老板给的钱多。

![react-ide-p](http://i.imgur.com/JPGmZON.jpg)



### Node.js

首先，请先安装 Node.js（NPM）。

如果没安装，请点击 [node.js下载](http://nodejs.cn/ "node.js下载") 下载并安装。（没带钱去什么市场）

##### 在安装好 Node.js 后我们可以在其安装目录下发现它已经集成了 NPM，可以直接使用 NPM 命令。

在安装好 Node.js 后打开控制台，输入以下 JS 代码，测试一下。

{% highlight ruby %}

     node //回车
     console.log('hey,老司机')//回车，hey,老司机

{% endhighlight %}

效果图如下:

![react-ide-2](http://i.imgur.com/LD4UglM.png)



##### 由于 npm 的镜像服务器在国外，我们可以把它改成淘宝的镜像，这样 git 到本地的速度快一些。


{% highlight ruby %}
    
      npm install -g cnpm --registry=https://registry.npm.taobao.org
      
{% endhighlight %}


##### 由于本期主要讲解 React 项目开发的配置流程，虽然没什么技术含量，但是需要你细心和耐心。


![react-ide-4](http://i.imgur.com/CFjuyHd.jpg)


### 初始化项目
    
新建一个项目文件夹，打开命令行，使用 cd 命令到你的项目文件夹下，然后执行以下命令，即可初始化你的项目。

{% highlight ruby %}
      npm init   //生成 package.json文件
{% endhighlight %}

##### 在执行过程中，需要你填写项目的基本信息，你可以一直点击回车键来输入默认的信息。

![react-ide-3](http://i.imgur.com/TJ5RHP8.png)



### 买菜

![react-ide-4](http://i.imgur.com/Amy2sjG.jpg)

- 安装 webpack 和 webpack-dev-server 到项目中。


{% highlight ruby %}
    
    npm install webpack webpack-dev-server --save-dev


{% endhighlight %}




- 安装 css-loader、style-loader、image-loader,可以在 js 下加载 css 样式文件和图片

{% highlight ruby %}
    
    npm install css-loader style-loader image-loader --save


{% endhighlight %}

- 安装 react.js 依赖包（react react-dom）和 babel 依赖包（转换jsx-js 等）


{% highlight ruby %}
    
    npm install --save react react-dom babel-preset-react babel-preset-es2015 babel-loader babel-core


{% endhighlight %}


- 新建 webpack.config.js
  

  打开你的项目夹，在底下新建一个 webpack.config.js （这里以我的为例）
   

- 在里面添加以下内容
   

{% highlight ruby %}

    var webpack = require("webpack")
    var path = require("path")
    
    module.exports = {
    entry: "./app/entry.js",// 项目打包入口文件
    output: {
    path: __dirname,
    filename: "./build/bundle.js"// 项目打包出口文件
    },
    module: {
    loaders: [{
    test: /\.js[x]?$/,
    exclude: /node_modules/,
    loader: 'babel-loader?presets[]=es2015&presets[]=react',
    }, {
    test: /\.css$/,
    loader: 'style-loader!css-loader'
    }, {
    test: /\.(png|jpg)$/,
    loader: 'url-loader?limit=8192'
    }]
    }
    };

{% endhighlight %}


- 在 package.json 下添加脚本（该文件内容为已配置的依赖包）
   
##### 之后无需手动修改，后续依赖包安装完后会自动写入配置（package.json）


{% highlight ruby %}
    
    "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "start": "webpack-dev-server --devtool eval --progress --colors --hot",
    "deploy": "NODE_ENV=production webpack -p",
    "deploy-windows": "SET NODE_ENV=production & webpack -p ",
    "validate": "npm ls"
    }
    

{% endhighlight %}

- 添加 React Router (路由组件)



{% highlight ruby %}
    
    $ npm install -S react-router
    
{% endhighlight %}



##### 使用 react-router 时你可以把它当成一个组件看待。

- 添加 React Redux (状态管理)



{% highlight ruby %}
    
    $ npm install react-redux --save
    
{% endhighlight %}


##### 如果你的应用没那么复杂，就没必要用 Redux,另一方面，Redux 只是 Web 架构的一种解决方案，也可以选择其他方案(Flux);当你用上 Redux 时，搭配 Immutable-js 会更爽。


- 添加 ESLint (代码质量)


##### 在团队协作中，为避免低级 Bug、产出风格统一的代码，会预先制定编码规范。使用 ESLint 工具和代码风格检测工具，则可以辅助编码规范执行，有效控制代码质量。


{% highlight ruby %}
    
    $ npm install eslint --save
    
{% endhighlight %}


- 添加 antd (蚂蚁金服一款简洁的 UI)


{% highlight ruby %}
    
    $ npm install antd --save
    
{% endhighlight %}




##### 推荐使用更简便的按需加载用法


- 首先需要安装 babel-plugin-import 依赖


{% highlight ruby %}
    
    $ npm install babel-plugin-import --save-dev
    
{% endhighlight %}

- 然后在我们的根目录下新建文件 .babelrc，并添加以下脚本

{% highlight ruby %}
    
    {
      "plugins": [["import", {"libraryName": "antd", "style": "css"}]] //import js and css modularly
    }
    
{% endhighlight %}




- 这时我们需要什么 UI 组件，即可如下写法，在 js 文件 (组件)顶部，以导入的方式这么写以达到按需加载 js 和 css


 
{% highlight ruby %}
    
    import { Button } from 'antd'

{% endhighlight %}

### 验证依赖包？

安装了这么多依赖模块，我们怎么验证是否安装成功呢？

打开 package.json 文件，在 dependencies 地下就可以查看你安装了那些模块。


![package-json](http://i.imgur.com/BKyyMrp.png)



买完菜，我们开始做饭吧！


### 开始做饭


##### 项目文件树形结构（除了 node_modoles、package.json 以外，其他的需手动创建）


  ![react-ide-11](http://i.imgur.com/2A0p9Ty.png)   


  
-  在项目文件 /app/component/app.js 下添加以下代码
    


{% highlight ruby %}
    
    /**
     * Created by FSX on 6/12/2016.
     */
    
    import React from 'react';
    import ReactDOM from 'react-dom';
    import {
    	Button
    } from 'antd';
    
    var App = React.createClass({
    
    	render: function() {
    
    		return (
    			<div>
    			<h1>Hey,this is a React and Antd IDE</h1>
    <div className="Antd">
    			<Button type="danger" size="large">成功加载Antd组件</Button>
    </div>
    			</div>
    		)
    	}
    });
    
    ReactDOM.render(
    	<App/>,
    	document.getElementById('app')
    );
    

{% endhighlight %}


 在 index.html 中添加以下脚本。

  {% highlight ruby %}
    
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
    <title>index</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    
    <body>
    <div id="app">
    
    </div>
    <script type="text/javascript" src="build/bundle.js"></script>
    </body>
    
    </html>
    

{% endhighlight %}


-  在项目文件 /app/entry.js 下添加以下代码(调整入口地址)
 
  {% highlight ruby %}
    
    'use strict';
    
    // component
    import './components/App'
    
    // css
    import './styles/main.css'
    
    
{% endhighlight %}

### 上菜，品尝

  {% highlight ruby %}
    
    npm start // 启动本地服务器，并打包文件输出
    
{% endhighlight %}


执行 npm start 后，打开浏览器，输入地址：[http://127.0.0.1:8080/](http://127.0.0.1:8080/ "http://127.0.0.1:8080/") 就可以成功看到了我们的例子了。


![react-ide-9](http://i.imgur.com/lumykkF.png)


这样我们就配置好了 React + Antd 的生产环境 。


当然，不能留图不留种，不然......


项目地址 [React-antd-ide](https://github.com/Haonancx/React-Demo/tree/master/React-antd-ide "React-antd-ide")


![react-ide-14](http://i.imgur.com/G7TRBSI.jpg)


#### 做一件事情，要学会持之以恒，不要畏惧出错和折腾，对待这件事情的态度，就决定了你在这一方面能否有更好的发展，做技术如此，做人亦是。
