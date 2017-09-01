---
layout: post
title:  "前端性能优化之 DOM 篇"
date:   2017-4-13 13:36:42
categories: 随笔 架构 浅谈前端
tags: 随笔 架构 浅谈前端
---
#### 前端性能优化，不止于前端。

![FE-PO-BG](http://i.imgur.com/IxBx6Ue.jpg)


### 初识 DOM

文档对象模型（Document Object Model，简称 DOM），指页面（或文档）的对象被组织在一个树形结构中，用来表示文档中对象的标准模型就称为 DOM，也就是我们称为的 "DOM 树"；

但是这个概念过于抽象，如果你学过数据结构，DOM 树更像二叉树，你可以把 DOM 树理解成一个个方格，DOM 树的根节点就是一个完整的页面，格子间可以相互嵌套，我们就是在其中的方格编写代码（HTML）的；格子还有一些强约定，比如你在页面上写 *<div>1*，浏览器会根据格子的强约定原则自动补齐成 *<div>1</div>*。


### 高性能 DOM

一个 Web 在客户端所呈现与用户交互的页面时，承载最多的载体一定是 DOM，就好比编写一个输入框、加载脚本、引用一个视频或图片，都是通过 DOM 来承载的。

而在 DOM 性能优化主要涉及这四个方面：

- 网络消耗
- DOM 在浏览器的初始化
- DOM 的结构和动态操作
- JS 业务逻辑

首先，网络消耗是由站点的网络环境来决定的，无法通过人为来控制，DOM 在浏览器的初始化过程是由浏览器内核来构建和解析的，不同的浏览器构建过程会有些差异；

DOM 的结构和动态操作是由我们人为去编写和控制的，这里作为 DOM 主要的优化切入点；而 JS业务逻辑依靠个人或团队的编码风格和能力决定，这里不做详细说明。

### 简化 HTML 结构

HTML 结构优化是对 DOM 结构最直截了当和最高效的方式，可以有效地精简页面中的冗余代码，加快网页显示速度，减少网页占用搜索引擎服务器的存储空间，提高用户体验和搜索引擎友好性，当然也可以更好的突出页面的主题，提高页面的相关性。

下面是主要优化的几个方向：

- 使用 HTML5 语义化标签，且标签使用规范，减少浏览器的判断时间。
- 代码要结构化、语义化。
- HTML(页面结构)、CSS（样式表）、JS(脚本) 文件分离，各司其职。
- 把 script 标签移到 HTML 文件末尾，因为 JS 会阻塞后面的页面的显示。
- 减少不必要的嵌套，尽量扁平化，因为当浏览器编译器遇到一个标签时就开始寻找它的结束标签，直到它匹配上才能显示它的内容，所以当嵌套很多时打开页面就会特别慢。
- 避免使用 br 标签分行，可以使用 block 元素或 CSS 显示属性来代替,使用 CSS 来调整边距。
- 避免使用 hr 标签来添加水平线，可使用 CSS 的 border-bottom 来代替。
- 使用 DIV + CSS 替代 Tables 来布局。
- 可以多使用 Flex Box。
- 除去无用的标签和空标签。


### 浏览器如何工作

首先，我们来看看项目是如何在浏览器端工作的。

![repaint-bg](http://i.imgur.com/Y0xF7Qr.jpg)

1.首先用户在地址栏输入域名，如 fsux.me，DNS（域名解析系统）服务器根据输入的域名查找对应 IP，然后向该 IP 地址发起请求。

2.其次浏览器获得并解析服务器的返回内容 (HTTP response)。

3.浏览器加载 HTML 文件及文件内包含的外部引用文件（CSS、JS）及图片，多媒体等资源。

4.根据请求回来的 HTML 文件开始从上到下解析 HTML 文档生成 DOM 节点树（DOM tree），也叫内容树（content tree），此时解析过程中碰见了外部引用的 CSS 文件，去服务器请求回 CSS 文件，构建 CSSOM (CSS Object Model)树，加载解析样式生成 CSSOM 树。

5.此时继续解析 HTML，又碰见了外部引用的 JS 文件，去服务器请求回 JS 文件，加载并执行 JS 代码（包括内联代码或外联 JS 文件）。

6.此时在解析 HTML 过程中发现一个标签内引用了一张关联图片，去服务器请求回这张图片，浏览器解析器不会等待图片下载完，而是继续渲染后面的代码。

7.此时 HTML 代码和 CSS 代码已经形成 DOM 树和 CSSOM 树,并生成渲染树(render tree)，渲染树按顺序展示在屏幕上的一系列矩形，这些矩形带有字体，颜色和尺寸等视觉属性。

8.布局（layout）：根据渲染树将节点树的每一个节点布局在屏幕上的正确位置。

9.绘制（painting）：遍历渲染树绘制所有节点，为每一个节点适用对应的样式，这一过程是通过 UI 后端模块完成。

**重绘** 当前元素的颜色样式(背景颜色、字体颜色等)发生改变的时候，我们只需要把改变的元素重新的渲染一下即可，重绘主要改变外观风格（改个颜色，换个皮肤），不改变布局，不影响其他的dom，所以重绘对浏览器的性能影响较小，一般不做优化，但是能避免最好。

**回流** 指浏览器为了重新渲染部分或者全部的文档而重新计算文档中元素的位置和几何构造的过程。

因为回流可能导致整个 DOM 树的重新构造，所以是性能的一大杀手，一个元素的回流导致了其所有子元素以及 DOM 中紧随其后的祖先元素的随后的回流。

触发回流的主要有以下操作：

- 调整窗口大小
- 改变字体
- 增加或者移除样式表。
- 内容变化，比如用户在 input、textarea、下拉框中输入或选择文字
- 激活 CSS 伪类，比如 :hover (IE 中为兄弟结点伪类的激活)
- 操作 class 属性
- JS 操作 DOM
- 计算 offsetWidth 和 offsetHeight 属性
- 设置 style 属性的值
- fixed 定位的元素,在拖动滚动条的时候会一直回流

### 避免重绘和回流

通过上述我们知道，只要避免触发重绘和回流，就能达到写出高性能 DOM 的目的，那么我们要如何避免呢？

有以下几种做法：

1.Display 的值会影响布局，从而影响页面元素位置变化，所以会更改渲染树的结构，即使我们知道 display:none 的时候，DOM 树中虽然能看见它，但其实渲染树中已经不存在了。
 
如果动态改变样式，则使用 cssText。

{% highlight ruby %}


    <style type="text/css">

     .red { 
           color:#f00; 
           width:40px;
           height:50px;
          }

     </style>

     <script type="text/javascript">

     $(document).ready(function () {

     var el = $('id');
     el.css('width', '40px');
     el.css('height', '50px');
     el.css('color', '#f00');
     //两次回流 + 一次重绘

     el.addClass('red');

     // 一次回流

     });
     </script>

{% endhighlight %}


2.使用 DocumentFragment 进行缓存操作,引发一次回流和重绘。（兼容 IE9+ 及主流浏览器）

例如创建一个文档碎片，这里相当于一个容器，把动态创建的元素先放到容器中,最后再一起添加到页面中，这样只引发一次回流。



{% highlight ruby %}

    // Create the fragment
    var fragment = document.createDocumentFragment();
    
    //add DOM to fragment 
    
    for(var i = 0; i < 10; i++) {
    var spanNode = document.createElement("span");
    spanNode.innerHTML = "number:" + i;
    fragment.appendChild(spanNode);
    }
    
    //add this DOM to body
    document.body.appendChild(spanNode);

{% endhighlight %}


3.使用 cloneNode (true or false) 和 replaceChild 技术，引发一次回流和重绘。

如果需要对一个元素进行复杂的操作（删减、添加子节点），那么我们应当先将元素从页面中移除，然后再对其进行操作，或者将其复制一个，在内存中进行操作后再替换原来的节点。


{% highlight ruby %}

      //cloneNode 克隆节点

      var Box = document.getElementById("box");
      var Li = document.createElement("li");
          Li.innerHTML = "hello";

     for(var i= 0; i<100; i++){

     var CreateLi = Li.cloneNode(true);
         Box.appendChild(CreateLi);
     }


{% endhighlight %}



4.不要对元素进行 JS 动画流操作，尽量使用 CSS 动画属性，以减少回流的 Render Tree 的规模。



{% highlight ruby %}

    //不提倡一下做法
    $(".divOne").animate({top:100});
    $(".DivTwo").animate({bottom:100});

{% endhighlight %}