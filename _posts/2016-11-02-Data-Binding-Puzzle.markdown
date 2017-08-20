---
layout: post
title:  "数据绑定之谜"
date:   2016-11-02 13:26:48
categories: JS 浅谈前端 深入浅出
tags: JS 浅谈前端 深入浅出
---
#### 所谓的双向绑定，无非是从界面的操作能实时反映到数据，数据的变更能实时展现到界面。

![data-bindind-1](http://i.imgur.com/5FOiqEC.jpg)

数据绑定换种说法，如果我们有一个 user 对象和一个 name 属性，一旦我们赋了一个新值给 user.name,在 UI 上就会显示新的姓名了。

同样地，如果 UI 包含了一个输入用户姓名的输入框，输入一个新值就应该会使 user 对象的 name 属性做出相应的改变。

很多热门的 JS 框架客户端如 Ember.js，Angular.js 或者 KnockoutJS、Vue.js 等，都在最新特性上刊登了双向数据绑定。


##### 这并不意味着从零实现它很难，也不是说需要这些功能的时候，采用这些框架是唯一的选择。



目前几种主流的 MVC (VM) 框架都实现了双向数据绑定，而我们可以把它简单理解成是在单向绑定的基础上给可输入元素（input、textarea 等）添加了 change ( input ) 事件，来动态修改 Model 和 View，并没有多高深；所以无需太过介怀是实现的单向或双向绑定。( 混乱的前端界，动不动就玩捆绑 )


![bind-img](http://i.imgur.com/sOxsaBF.png)

#### 实现双向数据绑定的做法有大致如下几种：

### 发布者-订阅者模式（Backbone.js）

##### 一般通过 sub, pub 的方式实现数据和视图的绑定监听

### 脏值检查（Angular.js） 

Angular.js 通过脏值检测的方式比对数据是否有变更，来决定是否更新视图，最简单的方式就是通过 setInterval() 定时轮询检测数据变动，当然 Google 不会这么 low，Angular 只有在指定的事件触发时进入脏值检测，大致如下：

- DOM 事件，譬如用户输入文本，点击按钮等。( ng-click )
- XHR 响应事件 ( $http )
- 浏览器 Location 变更事件 ( $location )
- Timer 事件( $timeout , $interval )
- 执行 $digest() 或 $apply()


### 数据劫持（Vue.js）


##### vue.js 则是采用数据劫持结合发布者-订阅者模式的方式，通过 Object.defineProperty() 来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。


#### 下面的想法实际上很基础，可以被认为是 3 步走计划：

1. 我们需要一个 UI 元素和属性相互绑定的方法。

1. 我们需要监视属性和 UI 元素的变化。

1. 我们需要让所有绑定的对象和元素都能感知到变化。

#### 本文只对目前热度几乎三分 Javascript 天下的三个框架进行讨论。

- Vue.js
- Angular.js
- React.js

### Vue.js

我曾经在  [Vue.js 的设计思想](https://chaoxi.me/vue.js/%E6%B5%85%E8%B0%88%E5%89%8D%E7%AB%AF/%E8%AE%BE%E8%AE%A1%E6%80%9D%E6%83%B3/2016/10/24/In-depth-vue-design-ideas.html "Vue.js 的设计思想")  一文中简单剖析过 Vue.js。

##### 基于 getter、setter 的方式


{% highlight ruby %}


    var msg = {
    age:'25',
    name:'Tony',
    
    get age(){
    return "30";
    },
    
    set age(x){
    return this.name ="chaoxi";
    }
    };
    
    msg.age = 1;
    console.log(msg.name); //chaoxi
    console.log(msg.age);  //30

{% endhighlight %}


##### 基于 defineProperty 的方式


{% highlight ruby %}

    var obj = {
    a: 12
    };
    Object.defineProperty(obj, "x", {
    get: function() {
    return this.a + 1
    },
    enumerable: true,
    configurable: true,
    set: function(y) {
    console.log(y);
    },
    });
    console.log(obj.x); //13
    obj.x = 3;  //执行set(3) 3
    console.log(obj.x); //13
    console.log(delete obj.x); //true
    for (key in obj) {
    console.log(obj[key]); //12
    }

{% endhighlight %}

### Angular.js

#### 脏检测基本原理

##### 众所周知，Angular 的双向绑定是采用“脏检测”的方式来更新 DOM ，但是 Angular并不存在定时脏检测（切记）； Angular 对常用的 DOM 事件、XHR 事件进行了封装，触发时会调用 $digest cycle;在 $digest 流程中，Angular 将遍历每个数据变量的 watcher，比较它的新旧值;当新旧值不同时，触发 Listener 函数，执行相关的操作。

Angular主要通过 scopes 实现数据双向绑定，AngularJS 的 scopes 包括以下四个主要部分：

- digest 循环以及 dirty-checking（脏检测），包括 watch,watch,digest,和$apply。
- scope 继承 这项机制使得我们可以创建 scope 继承来分享数据和事件。
- 对集合、数组和对象的有效 dirty-checking。
- 事件系统 on，on，emit，以及 $broadcast。


监听一个变量何时变化，需要调用 $scope.$watch 函数，这个函数接受三个参数：需要检测的值或者表达式（watchExp）、监听函数、值变化时执行（Listener 匿名函数），是否开启值检测，为 true 时会检测对象或者数组的内部变更（即选择以===的方式比较还是 Angular.equals 的方式）。

![good-img](http://i.imgur.com/XwhQdlq.gif)

上道菜，尝尝吧！！！

{% highlight ruby %}

    $scope.name = 'Ryan';
    
    $scope.$watch( function( ) {
    return $scope.name;
    }, function( newValue, oldValue ) {
    console.log('$scope.name was updated!');
    } );

{% endhighlight %}


Angular 会在 $scope 对象上注册你的监听函数 Listener，你可以注意到会有日志输出 “$scope.name was updated!”,因为 $scope.name 由先前的 undefined 更新为 ‘Ryan’。当然， watcher 也可以是一个字符串，效果和上面例子中的匿名函数一样，例如在Angular 源码中：

{% highlight ruby %}


    if(typeof watchExp == 'string' &&get.constant){
    var originalFn = watcher.fn;
      watcher.fn = function(newVal, oldVal, scope) {
    originalFn.call(this, newVal, oldVal, scope);
    arrayRemove(array, watcher);
      };
    }
    
{% endhighlight %}

上面这段代码将 watchExp 设置为一个函数，这个函数会调用带有给定变量名的 Listener 函数。


![let-me-sing](http://i.imgur.com/ojn60wb.gif)


#### 以插值{{post.title}}为例，当angular在compile编译阶段遇到这个语法元素时，内部处理逻辑如下：

{% highlight ruby %}

    walkers.expression = function( ast ){
      var node = document.createTextNode("");
      this.$watch(ast, function(newval){
    dom.text(node, "" + (newval == null? "": "" + newval) );
      })
      return node;
    }

{% endhighlight %}

这段代码很好理解，就是当遇到插值时，会新建一个 textNode，并把值写入到该 nodeContent 中，那么 Angular 怎么判断这个节点值改变或者说新增了一个节点？

这里就不得不提到$digest函数，首先，通过 watch 接口，会产生一个监听队列 $$watchers 。 $scope对象下的的 $$watchers 对象下拥有你定义的所有的 watchers。如果你进入到 $$watchers 内部，会发现它这样的一个数组。


{% highlight ruby %}

    $$watchers = [
    {
    eq: false, // whether or not we are checking for objectEquality  是否需要判断对象级别的相等
    fn: function( newValue, oldValue ) {}, // this is the listener function we've provided  这是我们提供的监听器函数
    last: 'Ryan', // the last known value for the variable$nbsp;$nbsp;变量的最新值
    exp: function(){}, // this is the watchExp function we provided$nbsp;$nbsp;我们提供的watchExp函数
    get: function(){} // Angular's compiled watchExp function   angualr编译过的watchExp函数
    }
    ];
    


{% endhighlight %}


$watch 函数会返回一个 deregisterWatch function,这意味着如果我们使用 scope.$watch 对一个变量进行监视，那么也可以通过调用deregisterWatch 这个函数来停止监听。


### React.js


React 强调的是单向数据流（一直活在满世界双向数据绑定的皮皮虾）。 当然，即便是单向数据流也总要有个数据的来源，如果数据来源于页面自身上的用户输入，那效果也就等同于双向绑定了；其实 React.js 有别于 Vue.js、Angular.js，大部分人以为 React 是一个框架，确切的说，只能说它是一个用于构建用户界面的 JS 库。

![pipixia-img](http://i.imgur.com/6OPoqM2.png)

#### 要做到数据的单向流动，需要做到以下两个方面。


数据状态只保存在一处不用多说了，主要就是数据结构的设计，要避免把一种状态用两种描述放在不同的表里，然后再来同步。这样你再精巧的代码都弥补不了数据结构的缺陷。数据结构比代码重要。

#### 状态的读写操作分开，在状态改变后通知更新 UI。

写操作直接操作数据，不要有中间状态，然后通知数据更新，Realm 是通过 realm.write 来处理所有的写操作。

![react-js-img](http://i.imgur.com/mtRTTtJ.png)

{% highlight ruby %}

    realm.write(() => {
      let myCar = realm.create('Car', { //创建新的记录
    make: 'Honda',
    model: 'Civic',
    miles: 1000,
      });
      myCar.miles += 20; // 更新
      realm.delete(myCar); //删除
    });

{% endhighlight %}


如果你在realm.write() 之外试图写操作，就会抛出错误,在更新后，会有一个 change event。


{% highlight ruby %}

    realm.addListener('change', () => {
      //通知更新界面
    })

{% endhighlight %}


这样读写分开可以降低程序的复杂度，使得逻辑更清晰。至于界面的更新就交给 React 了，配合得正好。

所以其实可以考虑直接使用 Realm 来作为 Flux 架构的 Store，而不用 Redux。

### 实现一个双向数据绑定

还是有很多方法能够实现上面的想法，有一个简单有效的方法就是使用 PubSub 模式。 

![let-me-talk](http://i.imgur.com/IPEauYr.jpg)

##### 这个思路很简单：我们使用数据特性来为 HTML 代码进行绑定，所有被绑定在一起的 JavaScript 对象和 DOM 元素都会订阅一个PubSub对象。只要 JavaScript 对象或者一个HTML输入元素监听到数据的变化时，就会触发绑定到 PubSub 对象上的事件，从而其他绑定的对象和元素都会做出相应的变化。


上菜


{% highlight ruby %}
    
    function DataBinder( object_id ) {
      // Create a simple PubSub object
      var pubSub = {
    callbacks: {},
    
    on: function( msg, callback ) {
      this.callbacks[ msg ] = this.callbacks[ msg ] || [];
      this.callbacks[ msg ].push( callback );
    },
    
    publish: function( msg ) {
      this.callbacks[ msg ] = this.callbacks[ msg ] || []
      for ( var i = 0, len = this.callbacks[ msg ].length; i < len; i++ ) {
    this.callbacks[ msg ][ i ].apply( this, arguments );
      }
    }
      },
    
      data_attr = "data-bind-" + object_id,
      message = object_id + ":change",
    
      changeHandler = function( evt ) {
    var target = evt.target || evt.srcElement, // IE8 compatibility
    prop_name = target.getAttribute( data_attr );
    
    if ( prop_name && prop_name !== "" ) {
      pubSub.publish( message, prop_name, target.value );
    }
      };
    
      // Listen to change events and proxy to PubSub
      if ( document.addEventListener ) {
    document.addEventListener( "change", changeHandler, false );
      } else {
    // IE8 uses attachEvent instead of addEventListener
    document.attachEvent( "onchange", changeHandler );
      }
    
      // PubSub propagates changes to all bound elements
      pubSub.on( message, function( evt, prop_name, new_val ) {
    var elements = document.querySelectorAll("[" + data_attr + "=" + prop_name + "]"),
    tag_name;
    
    for ( var i = 0, len = elements.length; i < len; i++ ) {
      tag_name = elements[ i ].tagName.toLowerCase();
    
      if ( tag_name === "input" || tag_name === "textarea" || tag_name === "select" ) {
    elements[ i ].value = new_val;
      } else {
    elements[ i ].innerHTML = new_val;
      }
    }
      });
    
      return pubSub;
    }
    
{% endhighlight %}


##### 再次说明一下，我们用一般的纯 javascript 的少于100行的维护代码获得了同样的结果。

#### 下期再见！！！

![sleep](http://i.imgur.com/9c4bOyM.jpg)

