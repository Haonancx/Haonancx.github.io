---
layout: post
title:  "Javascript 异步编程魔法"
date:   2016-3-24 11:16:48
categories: JS 深入浅出
tags: JS 深入浅出
---
#### 在单线程执行的 Javascript 中，异步最著名的是 Ajax,但是你仅仅知道这些吗？

![asynchronous-1](http://i.imgur.com/lwL69gm.png)


### 单线程执行


Two: 嘿，哥们儿，快点，我特么快憋不住了。

One: 我要三分钟，你先等着，完了叫你~

Two: 好的，记得叫我啊~ 你（Three）也等着吧，完了叫你~

Three: 等不了了，我回家换裤子吧！

...


所谓"单线程"，就是内存会为任务形成一个任务队列，让任务排队并挨个执行，例如，队列里有 One、Two、Three 3个任务，执行顺序为： One -> Two -> Three；这种执行的方式很清晰明了，特点是必须得 One 执行完才能执行 Two，很像我们生活中的银行排队办理业务，更像我们排队上老司机的车！！！


![asynchronous-2](http://i.imgur.com/AHIwT6A.jpg)



可是，这种方式的缺点也很明显，前面的任务没执行完，后面的任务都必须等着，会拖延整个程序的执行。常见的浏览器无响应（假死），往往就是因为某一段 Javascript 代码长时间运行（比如死循环），导致整个页面卡在这个地方，其他任务无法执行。


上述执行方式中，程序的执行顺序与任务的排列顺序是一致且同步的。



### 如何异步


所谓的异步，就是每一个任务有一个或多个回调函数（callback），One 任务结束后，不是执行 Two 任务，而是执行回调函数，Two 任务不需要等 One 任务结束就执行，所以程序的执行顺序与任务的排列顺序是异步的。


![asynchronous-3](http://i.imgur.com/3EaC7ms.gif)

"异步模式"非常重要，特别是在如今以性能和用户体验为主导的时代；耗时很长的操作都应该异步执行，避免用户等待时间过长，在这方面最好的方法就是采用 Ajax。在服务器端，"异步模式"甚至是唯一的模式，因为执行环境是单线程的，我们都知道，短时间内服务器被 http请求是有瓶颈的，一旦允许同步执行所有 http 请求，服务器性能会急剧下降，很快就会失去响应，进而翻车！！！


下面将科普四种 Javascript 异步编程的几种方法，如果你能上手它们，将帮助你在日常应用场景中写出结构更合理、性能更出色、维护更方便的 Javascript 代码。


- 回调函数
- 事件监听
- 高阶函数
- 发布/订阅
- promise 对象
- 类库的封装
- ES6 的 Generator


### 回调函数


假设有两个顾客在银行柜台排队办业务，Collie() 和 Akita()；
但是 Collie() 没取多少钱却特别墨迹 ( 执行耗时较长 )，Akita() 有点等不了，心里有点想打人的冲动。

{% highlight ruby %}

    Collie();
    Akita();

{% endhighlight %}



![asynchronous-4](http://i.imgur.com/0XcEgHa.jpg)


此时，我们可以这么处理，把同步操作变成了异步操作，Collie() 不会堵塞程序运行，相当于先执行程序的主要逻辑，将耗时的操作推迟执行。

{% highlight ruby %}

    function Collie(callback){
    
    　　　　setTimeout(function () {

    　　　　　　// Collie要办理的业务（执行方法）

    　　　　　　callback();

    　　　　}, 2000);
    }

    Collie(Akita);

{% endhighlight %}

回调函数的优点是简单，轻量级；但是这么一写代码的话，容易形成各部分高耦合，而且每个任务只能回调一个函数，当此类任务过多时容易产生意大利面条式的代码，不利于程序的可读性和维护性。


### 事件监听

顾名思义，这种方法的优点是比较容易理解，可以绑定多个事件，每个事件可以指定多个回调函数，JS 和 浏览器提供的原生方法基本都是基于事件触发机制的，耦合度很低，不过事件不能得到流程控制。


{% highlight ruby %}

    Collie.on("evt", Akita);

    function dogs(){

    setTimeout(function(){
    
    Collie.trigger("evt");
    
    })
    }

{% endhighlight %}



### 高阶函数(泛函数)

高阶听上去就像是一种先进的编程技术的一个深奥术语，一开始我看到的时候我也这样认为的，然而，然而细研究之后，发现高阶函数只是将函数作为参数或返回值的函数（后续我会专门写一篇深入浅出系列谈谈高阶函数）。

![asynchronous-5](http://i.imgur.com/IoBqVrJ.jpg)

下面我请你尝尝我的手艺，你就知道这是一道什么菜了。



{% highlight ruby %}

    var Collie = function(str1){
    
    this.add = function (str2){
    return str1 + ' ' + str2;
    };
    
    return add;
    
    };
    
    console.log(Collie('Hello')('World'));// Hello World

{% endhighlight %}



##### 这种方法解耦程度很低，但是当参数过多时程序可读性非常不友好。


不信？下面我就用意大利面条式的代码吓唬吓唬你！！！

{% highlight ruby %}

    step1(function(res1){
    step2(function(res2){
        step3(function(res3){
             step4(function(res4){
             step5(function(res5){
            //...
        });
        });
        });
    });
    });

{% endhighlight %}



### 发布/订阅

##### 把事件全部交给 Collie 这个控制器管理，可以完全掌握事件被订阅的次数，以及订阅者的信息，管理起来特别方便；这种方法的性质与“事件监听”类似，但是明显优于后者。因为我们可以通过查看“消息中心”，了解存在多少信号、每个信号有多少订阅者，从而监控程序的运行。

{% highlight ruby %}

    Collie.subscribe("evt", g);

    function Akita(){

    setTimeout(function () {

    　　// Akita的任务代码

    　　Collie.publish("evt");

    }, 1000);
    }


{% endhighlight %}




### Promises 对象

##### 来了个对象，得好好撩一撩它；其实就是每一个异步任务返回一个 Promise 对象，该对象有一个 then 方法，允许指定回调函数。


比如，Collie 的回调函数 Akita，可以写成：

{% highlight ruby %}

    Collie().then（Akita);

{% endhighlight %}

采用Jquery 的方法对 Collie 函数进行改写：

{% highlight ruby %}

    function Collie(){

    　　　　var thisDef = $.Deferred();
    
    　　　　setTimeout(function () {
    
    　　　　　　// f1的任务代码
    
    　　　　　　thisDef.resolve();
    
    　　　　}, 500);
    　　　　return thisDef.promise;
    　　}

{% endhighlight %}

而且，它还有一个前面三种方法都没有的好处：如果一个任务已经完成，再添加回调函数，该回调函数会立即执行。


![asynchronous-6](http://i.imgur.com/7nFXeqI.jpg)



所以，你不用担心是否错过了某个事件或信号；这种方法的缺点就是编写和理解，上手成本很高。


### 类库的封装

##### jquery 的 Deferred 对象

##### 简单说，Deferred 对象就是 jquery 的回调函数解决方案；在英语中，defer的意思是"延迟"，所以 Deferred对象的含义就是"延迟"到未来某个点再执行。

来我们先上道菜，尝一尝。

##### jquery 的 ajax 操作的传统写法：

{% highlight ruby %}

    $.ajax({ 
    url: "AddJson", 
    success: function(){ 
    console.log("yes,请求成功！"); 
    }, 
    error:function(){ 
    console.log("运气真差，请求失败！"); 
    } 
    });  

{% endhighlight %}


##### 有了 Deferred 对象以后，我们可以这么吃：

{% highlight ruby %}

    $.ajax("AddJson") 
    　.done(function(){console.log("yes,请求成功！"); }) 
    　.fail(function(){ console.log("运气真差，请求失败！"); });  

{% endhighlight %}


可以看到，done()相当于 success 方法，fail() 相当于 error 方法；采用链式写法以后，代码的可读性大大提高。


##### When.js

这里解释的比较详细 - [When.js 异步编程](https://imququ.com/post/promises-when-js.html "When.js 异步编程")

### ES6 的 Generator 函数

很多人都说 ES5 是什么我都没整明白呢，ES6就来了、如今 ES7又来了，瞬间感觉学前端好懵逼， 其实不用慌张，我们可以把 Generator 理解成一个状态机（类似 React 中有很多 state），封装了多个内部状态；执行 Generator 返回的是一个遍历器对象，可以遍历 Generator 产生的每一个状态。

##### ES6 引入的 Generator 可以理解为可在运行中转移控制权给其他代码，并在需要的时候返回继续执行的函数；利用 Generator 可以实现协程的功能。

##### 所谓的协程，意思是多个线程互相协作，完成异步任务。

具体的执行步骤如下：

1. 协程 A 开始执行。

1. 协程 A 执行到一半，进入暂停，执行权转移到协程 B。

1. （一段时间后）协程 B 交还执行权。

1. 协程 A 恢复执行。

##### 来看看，ES6 的 Generator 这次为我们带来了哪些新品。

{% highlight ruby %}

    function* hiGenerator(){  
      
    yield 'hi';  
      
    yield 'ES6';  
      
    return '!';  
      
    }  
      
    var hi = hiGenerator();  
      
    console.log(hi); //hiGenerator {[[GeneratorStatus]]: "suspended", [[GeneratorReceiver]]: Window}  
      
    console.log(hi.next()); //Object {value: "hi", done: false}  
      
    console.log(hi.next()); //Object {value: "ES6", done: false}  
      
    console.log(hi.next()); //Object {value: "!", done: true}  
    
    console.log(hi.next()); //Object {value: undefined, done: true}


{% endhighlight %}



这看上去很像一个函数，这被称为 Generator 函数，它与我们常见的函数有很多共同点，但还可以看到下面的差异：

1. 通常的函数以 function 开始，但 Generator 函数以 function* 开始。

1. 在 Generator 函数内部，yield 是一个关键字，和 return 有点像；不同点在于，所有函数（包括 Generator 函数）都只能返回一次，而在 Generator 函数中可以 yield 任意次；yield 表达式暂停了 Generator 函数的执行，然后可以从暂停的地方恢复执行。

1. 常见的函数不能暂停执行，而 Generator 函数可以，这就是这两者最大的区别。

1. 由于 Generator 函数返回的遍历器对象，只有调用 next() 方法才会遍历到下一个状态，所以其实提供了一种可以暂停的执行函数。每次执行 next()，遇到 yield 语句就暂停执行，且将 yield 后的表达式的值作为返回的对象的 value 值；如果没有遇到 yield，则返回 return 语句作为返回对象的value值；如果没有 return，则返回对象的 value 值为 undefined。

1. next() 方法可以带一个参数，该参数会被当做上一条 yield 语句的返回值。

![asynchronous-7](http://i.imgur.com/DUSU3If.jpg)



#### 年前最后一更！提前祝大家春节快乐，新的一年，少和产品打架、少加班、工资翻倍、万事如意！！！