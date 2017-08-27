---
layout: post
title:  "Javascript 模块化演进"
date:   2017-1-30 22:17:03
categories: 浅谈前端 设计模式 JS
tags: 浅谈前端 设计模式 JS
---
#### 从刀耕火种，模块化编程，再到如今的组件化架构，Javascript 是如何演变的。

![JM-BG](http://i.imgur.com/MT1f9WF.jpg)

细细整理了过去接触过的那些前端技术，发现前端演进是段特别有意思的历史。

人们总是在过去就做出未来需要的框架，而现在流行的是过去的过去发明过的。

随着基础设置的不断完善以及代码封装层级的不断提高，使得前端一个人能够完成的事越来越多，这是技术积累的必然结果。

![JM-BG](http://i.imgur.com/buNnEEg.jpg)


前端负责其余工作，后端只需做数据提供商，这种分工模式一定是更清晰也更高效的，所以今天要成为 所谓的 "Web 全栈工程师"，门槛也只会越来越低。

而模块化编程其实就是如今组件化架构的一个早期的缩影，其本质是分治，模块化编程如今作为一种流行的 Javascript 编程模式。它的目的可以使得代码更易于理解和维护，使其模块间相互调用更加的灵活，但是还有许多优秀的实践还没有广为人知。

##### 模块化是指解决一个复杂问题时自顶向下逐层把系统划分成若干模块的过程，有多种属性，分别反映其内部特性。【百度百科】

模块化的运行方式分为两种：

#### 独立的工作运行模式

各个模块可独立工作，即便单组模块出现故障也不影响整个系统工作。
 
#### 分级启动功能

当每组模块达到满负荷时系统会自动启动另一组模块，从而保证系统的输出始终与实际需求匹配，确保每个模块高效运行，又能节约资源，提高效率。

### 刀耕火种

举个例子，早期当我们拿到一个列表的 CRUD 的需求时，我们是如何在前端写代码的。

{% highlight ruby %}

    function add(){
    //...
    }
    
    function delete(){
    //...
    }
    
    function (){
    //...
    }
      ...

{% endhighlight %}


缺点：Global 被污染，很容易命名冲突。


基于这个缺点，进行简单的封装，采用命名空间模式。

{% highlight ruby %}

    var CRUD = {

    add: function(){},
    delete: function(){},
    update: function(){}

    }
    
    CRUD.add();

{% endhighlight %}

这样就行了嘛？


![JM-1](http://i.imgur.com/LzZqPDW.jpg)

虽然减少 Global 上的变量数目，本质是基于对象进行内部函数的封装，安全性较低。

### 小试牛刀

这时候，程序猿们想到了使用闭包


{% highlight ruby %}

    var CRUD = (function(){
    var _private = "add success!";
    var add = function(){
    console.log(_private)
    };
    return {
    add: add
    }
    })()
    
    CRUD.add(); //add success!
    CRUD._private; // undefined

{% endhighlight %}

此时函数就成了整个 JS 中的局部作用域，但其实你使用闭包，就会带来一大堆内存回收和性能的问题，还需要你手动编码去释放掉闭包暂用的内存空间。详细了解 [深入浅出闭包](http://fsux.me/js/深入浅出/2016/01/03/In-depth-to-study-JS-Closure.html "Javascript 深入浅出闭包")。

好，我们在此时正是 Jquery 如日中天的时代，引入它优化一下。

{% highlight ruby %}

    var CRUD = (function($){
    var _$body = $("body");
    var add = function(){
    console.log(_$body)
    };
    return {
    add: add
    }
    })(jQuery)
    
    CRUD.add(); //add success!

{% endhighlight %}

此时，就颇有模块化的意味了。

### 初见锋芒

我们解决了封装函数的问题，当我们面对于一个大型的复杂系统时，就会有成千上万个函数，那么每当我们对一个页面进行操作时，把所有的 JS 文件中的函数功能都加载进来，无疑对性能和用户体验要来说都是致命的，所以只有封装是远远不够的，我们还需要解决加载上的难题。

一般小项目的 JS 外链就要面临下面这样的问题：

{% highlight ruby %}

    <script type="text/javascript" src="js/jquery/jquery.min-1.11.1.js"></script>
    <script type="text/javascript" src="js/easyui/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="js/easyui/easyui-lang-zh_CN.js"></script>
    <script type="text/javascript" src="js/moment.min.js"></script>
    <script type="text/javascript" src="js/path.js"></script>
    <script type="text/javascript" src="js/base.js"></script>
    <script type="text/javascript" src="js/jquery/jquery.blockUI.js"></script>
    <script type="text/javascript" src="js/base64.js"></script>
    <script type="text/javascript" src="js/My97DatePicker/WdatePicker.js"></script>
    <script type="text/javascript" src="js/path.js"></script>
    <script type="text/javascript" src="js/base.js"></script>
    <script type="text/javascript" src="js/echarts.min.js"></script>
    ...

{% endhighlight %}

特点：DOM 编码顺序就是浏览器执行 JS 的顺序，

缺点：

- 难以维护，如果是一个多人协作的大型项目，功能和任务的划分无疑成为痛点。
- 依赖模糊，很可能上述某个文件中的某个函数依赖于其他文件中的文件，如果改变顺序，就会无法运行，可维护性大大降低。
- 请求过多，首次启动前，等待时间相对过长（依赖于网络环境）。



### 单枪匹马

### 短兵相接

### 各守城池

### 枪林弹雨

### 并肩作战

编写中...
