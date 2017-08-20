---
layout: post
title:  "React.js 的设计思想"
date:   2017-2-20 10:26:48
categories: React.js 浅谈前端
tags: React.js 浅谈前端
---
#### 是什么让它屹立于前端世界之颠，这一期采访前端框架 React。

![React-idea](http://i.imgur.com/69SqetF.png)


小编： 终于请到国际巨星了，太不容易了，你先自我介绍一下！

React: 大家好！！！我是 React 。

小编： 欢迎，React 来 FSX 做客，您之前又听说过我们吗？

React: 有，我特别喜欢你们写文章的方式，很幽默，而且把比较复杂的技术比喻成身边的事物，浅显的把技术科普给大家，这一点我很赞赏。

小编： 嚯，我们主编是给你塞钱了是怎么着，这么夸我们，主编要知道了，今晚肯定加鸡腿。

![REACT-IDEA-1](http://i.imgur.com/Na3ooO9.png)

React: 当然了，拿人钱财，替人消灾嘛（小声的说）。

小编： 行了行了，越描越黑。

小编： 给大伙儿介绍介绍，您是干嘛的。

React: 我是一个用于构建用户界面的 JAVASCRIPT 库，主要用于构建 UI。

React: 起先我出生于 Facebook 的内部项目，用来架设 Instagram 的网站，并于 2013 年 5 月开源。

小编: 可谓是出生名门啊，但是在近几年兴双向数据绑定的前端世界来说，你可谓是独树一帜。

小编： 截止这期采访前的一个小时，您 Github 上的 Star 总数为 61019，Angular 的总数是 54927，Vue 的是 45231。

小编： 您怎么看待这个？

React:额，我认为好的东西是不需要过渡的去推销的，毕竟程序员不是傻子，而且我们在解决业务方面实现的方式不一样，感谢大伙儿厚爱。

![REACT-IDEA-2](http://i.imgur.com/P2I9rMe.png)

小编： 能具体和大伙说一下，您的出现，给大伙儿带来了什么吗？

React: 其实在任何 UI 的变化都是通过整体刷新来完成的，而 React 将这种开发模式以高性能的方式带到了前端，每做一点界面的更新，你都可以认为刷新了整个页面。

React: 至于如何进行局部更新以保证性能，则是 React 要完成的事情。

React： 我们为此引入了虚拟 DOM（Virtual DOM）的机制，在浏览器端用 Javascript 实现了一套 DOM API。

小编: 听说 React 进行开发时所有的 DOM 构造都是通过虚拟 DOM 进行，每当数据变化时，React 都会重新构建整个 DOM 树，然后 React 将当前整个 DOM 树和上一次的 DOM 树进行对比，得到 DOM 结构的区别，然后仅仅将需要变化的部分进行实际的浏览器 DOM 更新。(终于说完了)

React: 咱这期节目是深入浅出系列嘛？

小编：（冷汗）

React: 你直接说，数据变化时，我们用虚拟 DOM 的方式来对比变化前后的 DOM，然后以最高性能的方式去更新你看到的界面，这不就得了吗！

![REACT-IDEA-3](http://i.imgur.com/TVvhs0u.png)


小编： 您接着说。

React: 大家可以看一下，下面的这张图。

![react-img](http://i.imgur.com/OA4c4K6.png)


小编： 哇!!! 没看懂

React: React能够批处理虚拟 DOM 的刷新，在一个事件循环（Event Loop）内的两次数据变化会被合并。

React: 例如你连续的先将节点内容从 A 变成 B，然后又从 B 变成 A，React 会认为 UI 不发生任何变化，而如果通过手动控制，这种逻辑通常是极其复杂的。

React: 尽管每一次都需要构造完整的虚拟 DOM 树，但是因为虚拟 DOM 是内存数据，性能是极高的，而对实际 DOM 进行操作的仅仅是 Diff 部分，因而能达到提高性能的目的。这样，在保证性能的同时，开发者将不再需要关注某个数据的变化如何更新到一个或多个具体的 DOM 元素，而只需要关心在任意一个数据状态下，整个界面是如何 Render 的。

小编: 具体说说 React 的设计特点。


React: 首先是变换（Transformation），设计 React 的核心前提是认为 UI 只是把数据通过映射关系变换成另一种形式的数据。同样的输入必会有同样的输出。这恰好就是纯函数。


![REACT-IDEA-7](http://i.imgur.com/7Rwzunz.png)



{% highlight ruby %}

    function NameBox(name) {
      return { fontWeight: 'bold', labelContent: name };
    }
    
    
    'FSX' ->
    { fontWeight: 'bold', labelContent: 'stupid' };

{% endhighlight %}


小编: 就我这脑子，看来家里人不让我学编程是对的。


React: 其次是抽象，你不可能仅用一个函数就能实现复杂的 UI。重要的是，你需要把 UI 抽象成多个隐藏内部细节，又可复用的函数。通过在一个函数中调用另一个函数来实现复杂的 UI，这就是抽象。


React: 接着是组合，为了真正达到重用的特性，只重用叶子然后每次都为他们创建一个新的容器是不够的。你还需要可以包含其他抽象的容器再次进行组合。我理解的“组合”就是将两个或者多个不同的抽象合并为一个。


{% highlight ruby %}
    
    function FancyBox(children) {
      return {
    borderStyle: '1px solid blue',
    children: children
      };
    }
    
    function UserBox(user) {
      return FancyBox([
    'Name: ',
    NameBox(user.firstName + ' ' + user.lastName)
      ]);
    }

{% endhighlight %}


小编: 停一下！！！ 我有点晕

![REACT-IDEA-9](http://i.imgur.com/5TkpaKc.png)

React: 那我先喝一口水！

小编： 理念的东西，的确很重要，希望大伙儿不要像我一样。

React: 话不能这么说，React 的学习曲线是相对来说比较平缓的，小编，你好好采访，我知道好多那种网站都是用 React 做的，采访完我告诉你。

![React-IDEA-5](http://i.imgur.com/NMuVEOL.jpg)


小编: (坏笑)，好的咱继续。

React: UI 不单单是对服务器端或业务逻辑状态的复制。实际上还有很多状态是针对具体的渲染目标;所以我们倾向于使用不可变的数据模型。我们把可以改变 state 的函数串联起来作为原点放置在顶层。



React: 为了管理列表中的每一个 item 的 state ，我们可以创造一个 Map 容纳具体 item 的 state。

{% highlight ruby %}

    function UserList(users, likesPerUser, updateUserLikes) {

      return users.map(user => FancyNameBox(
    user,
    likesPerUser.get(user.id),
    () => updateUserLikes(user.id, likesPerUser.get(user.id) + 1)
      ));
    }
    
    var likesPerUser = new Map();
    function updateUserLikes(id, likeCount) {
      likesPerUser.set(id, likeCount);
      rerender();
    }
    
    UserList(data.users, likesPerUser, updateUserLikes);

{% endhighlight %}


React：其次我们可以看看下面这两张图。


![React-IDEA-10](http://i.imgur.com/Uxjcv2A.png)

![React-IDEA-11](http://i.imgur.com/Ye0KkUo.png)

React：上图可以看到，使用 React 大大降低了逻辑复杂性，意味着开发难度降低，可能产生 Bug 的机会也更少。至于 React 如何做到将原来 O(n^3) 复杂度的Diff算法降低到 O（n）。



React： 其次，组件化的思想也是 React 的一大亮点，所谓组件，即封装起来的具有独立功能的UI部件。React推荐以组件的方式去重新思考UI构成，将UI上每一个功能相对独立的模块定义成组件，然后将小的组件通过组合或者嵌套的方式构成大的组件，最终完成整体UI的构建。


小编： 您看可不可以这么理解，就像我们搭积木，一个积木就好比一个功能模块。

React: 对!

![expression-1](http://i.imgur.com/IoBqVrJ.jpg)

小编： 能具体说说，国内有哪些大厂在项目中用到了 REACT 了吗？


React: 阿里， Strikingly、杭州大搜车、美团等等，其实，REACT 不单单应用于实际项目中，如果读过最近两年很火的前端框架源码的都知道，React 的影子无处不在。


小编： I have a Vue, I have a React,Uh,WEEX。

React: 行了，别给我惹事儿了，待会儿，人家的粉丝该上我们家门口骂街了。

![REACT-IDEA-11](http://i.imgur.com/KtIKT74.gif)


小编： 咱们聊了这么多，能给我们个例子吗？具体的是，能跑个 Hello World 吗？虽然这期不是入门教程专栏。

React： 当然可以。

{% highlight ruby %}

    <!DOCTYPE html>
    <html>
      <head>
    <meta charset="UTF-8" />
    <title>Hello React!</title>
    <script src="../build/js/react.min.js"></script>
    <script src="../build/js/react-dom.min.js"></script>
    <script src="../build/js/babel.min.js"></script>
      </head>
      <body>
    <div id="example"></div>
    <script type="text/babel">
      ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('example')
      );
    </script>
      </body>
    </html>

{% endhighlight %}


REACT: 为了支持 FSX，我决定给你们写一套 REACT 入门 Demo，将在近期推出，当然教程和说明会极其的浅显易懂，方便读者学习。

小编： 太感谢了！！！

小编： 好了，这期采访就到这里，再次感谢 React 百忙之中抽空做客 FSX，祝愿 React 越做越好，早日出 1.0 版。



#### 走到了今天，React 已经不再是一个库，而是一个庞大的体系。想要发挥它的威力，整个技术栈都要配合它；你要学习一整套解决方案，从前端到后端，都是全新的做法。
