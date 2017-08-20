---
layout: post
title:  "Vue 基础的开发环境"
date:   2017-2-13 18:36:22
categories: 深入浅出 Vue.js 开发环境
tags: 深入浅出 Vue.js 开发环境
---
#### 本期节目将手把手教你去 NPM 市场买最新鲜的食材，只为搭配 小鲜肉 Vue 下厨。

![Vue-IDE-1](http://i.imgur.com/jLs0MZd.jpg)


既然它是当红小鲜肉，我想有必要写一篇文章来帮助大家配置好 Vue 的生产环境，我给它的总体评价是“简单却不失优雅，小巧而不乏大匠”，下面将围绕这句话给大家介绍 Vue.js，希望能够激发你对 Vue.js的兴趣。


如果你还不认识这位小鲜肉的话，请回看我们对 Vue 的早期采访 [Vue.js 的设计思想](http://chaoxi.me/vue.js/%E6%B5%85%E8%B0%88%E5%89%8D%E7%AB%AF/%E8%AE%BE%E8%AE%A1%E6%80%9D%E6%83%B3/2016/10/24/In-depth-vue-design-ideas.html "Vue.js 的设计思想")。


![vue-ide-4](http://i.imgur.com/ub3fGEi.jpg)


然而，就当前热门的前端框架（Vue.js、React.js、Angular.js）来看，Vue.js 无疑是学习曲线最为平缓的。 


### Node.js

首先，请先安装 Node.js（NPM）。

如果没安装，请点击 [node.js下载](http://nodejs.cn/ "node.js下载") 下载并安装。（没带钱去什么市场）

##### 在安装好 Node.js 后我们可以在其安装目录下发现它已经集成了 NPM，可以直接使用 NPM 命令。

在安装好 Node.js 后打开控制台，输入以下 JS 代码，测试一下。

{% highlight ruby %}
     node -v //查看 node 版本
     node //启用 node 环境
     console.log('最污的博客')//最污的博客

{% endhighlight %}

效果图如下:

![node](http://i.imgur.com/J2giIY5.png)

##### 由于 npm 的镜像服务器在国外，我们可以把它改成淘宝的镜像，这样 git 到本地的速度快一些。


{% highlight ruby %}
    
      npm install -g cnpm --registry=https://registry.npm.taobao.org
      
{% endhighlight %}




### 初始化项目

##### 我在初始化的过程中遇到了 Npm 版本过低而无法成功安装 Vue 模板的情况，所以当你使用 Vue 模板需要 Npm 版本(3.0.0) 以上。


查看 npm 版本号：

{% highlight ruby %}

      npm -v  // 2.9.5，低于要求就要更新了。

{% endhighlight %}

解决办法:

{% highlight ruby %}

      npm -g install npm@3.0.0   //更新 Npm 版本至3.0.0

{% endhighlight %}


安装 Vue 的脚手架


{% highlight ruby %}

      cnpm install -g vue-cli   

{% endhighlight %}

##### （上述命令为全局）这个命令必须安装在全局中，只需要运行一次就可以了；安装上之后，以后就不需要安装了。


{% highlight ruby %}
      vue init webpack vue-demo  
{% endhighlight %}


##### 上述命令为新建一个 基于 webpack 的 vue-demo 模板，并在该文件夹下初始化了 Vue 模板。

![vue-ide-7](http://i.imgur.com/twae8Im.png)

在安装过程中会让你初始化你项目的时候，输入一些你项目的基本信息和配置项;下面给大家解释一下：



- Project name :(你的项目名称)
- Project description :(你的项目具体描述)
- Author:(作者邮箱)
- Vue build :(单个独立项目)
- Install vue-router:(Vue路由组件)
- Use ESLint to lint you code:(语法检查工具 ESLint)
- Pick an ESLint preset: (选择 ESLint 预设好的配置)
- Setup unit tests with Karma + Mocha:(安装单元测试工具 Karma + Mocha)
- Setup e2e tests with Nightwatch:(安装 Nightwatch 设置 e2e 测试)

##### 建议全都安装，特别是测试模块，正统的开发中，单元测试可以快速定位出应用的某个模块的问题，大大缩减你 Debug (调试)的时间。

现在的程序员，很少有去写测试代码，只要基本逻辑跑通以后，数据能正常加载，就觉得能行了，其实不然，在复杂的业务场景下，模块会随着业务需求而变得复杂，所以就显得单元测试尤为重要，甚至在测试的过程中，编写的代码往往要多于业务代码。

![vue-ide-10](http://i.imgur.com/AJ4VTdj.png)


##### 此时你会发现，初始化好项目以后，控制台会有很人性化的提示，把接下来你要敲击的命令已经给你列举出来了。

### 买菜、做饭

![react-ide-4](http://i.imgur.com/Amy2sjG.jpg)


- 安装依赖

{% highlight ruby %}
    
    cd vue-demo  //cd 到你的项目底下

    cnpm install //安装依赖

{% endhighlight %}

##### 项目开始初始化并安装依赖，由于模板中已经给我们安装好了 Vue-router （路由组件）。

效果图如下:


![vue-ide-8](http://i.imgur.com/I1MRhhe.png)

##### 这个过程可能会相对漫长一些。 


- 添加 Vuex (状态管理组件)


{% highlight ruby %}
    
    $ cnpm install vuex --save
    
{% endhighlight %}


##### 和 Redux,如果你不打算开发大型单页应用，使用 Vuex 可能是繁琐冗余的。确实是如此——如果您的应用够简单，您最好不要使用 Vuex。



- 添加 element (饿了么一款基于 VUE 的 UI)


{% highlight ruby %}
    
    $ cnpm i element-ui -S
    
{% endhighlight %}



##### 推荐使用更简便的按需加载用法


{% highlight ruby %}
    
    import {Button,Select} from 'element-ui'
    
{% endhighlight %}



### 验证依赖包？

安装了这么多依赖模块，我们怎么验证是否安装成功呢？

打开 package.json 文件，在 dependencies 地下就可以查看你安装了那些模块。

![vue-ide-10](http://i.imgur.com/57CnZbz.png)



### 上菜，品尝

  {% highlight ruby %}
    
    cnpm run dev // 启动本地服务器，并打包文件输出
    
{% endhighlight %}

![vue-ide-13](http://i.imgur.com/WWoOron.png)

执行 npm run dev 后，上述命令表示我们已经在本地成功的跑起一个 Vue 项目了，打开浏览器，输入地址：[http://localhost:8080/](http://localhost:8080/ "http://localhost:8080/") 就可以成功看到了我们的例子了。


![vue-ide-3](http://i.imgur.com/duLVHPr.png)


这样我们就配置好了 Vue + element UI 的生产环境 。


![vue-ide-2](http://i.imgur.com/w2EgNJN.gif)


在2016年，不能使用 ES2015/ES2016 进行开发的前端技术栈，会是最先停止增长并且走下坡路的，而今已是 2017 年。

#### Vue.js 从整体逻辑来讲， 它要解决的是 MVVM 的 VM 部分， Vue 使用起来确实比 React 简单方便多了。 代码也清晰；同时借鉴了 angularjs 的 declarative 的特点； 另外文档， 例子做的都做得很好，这些都是很好的优点。
