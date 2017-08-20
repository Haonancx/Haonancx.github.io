---
layout: post
title:  "Javascript 深入浅出原型"
date:   2015-12-26 20:10:12
categories: JS 深入浅出
tags: JS 深入浅出
---
#### 只要善于运用，基于原型的 JavaScript 继承模型比传统的类继承还要强大。


![prototypal-ex-1](http://i.imgur.com/lwL69gm.png)

### 先聊一聊对象的事情

JavaScript 中，万物皆对象！但对象也是有区别的，主要分为普通对象（Object）和函数对象（Function）。


说好的只聊技术，怎么聊上个人问题了！？



![prototype-1](http://i.imgur.com/D5bFGrL.png)




好了,安慰一下,请你吃下面  这道菜！


{% highlight ruby %}
    function example(){};
    var example2 = function(){};
    var example3 = new Function('str','console.log(str)');

    var other = {};
    var other2 =new Object();
    var other3 = new example();
    
    console.log(typeof other); //object 下面检测一下他们都是些什么类型函数
    console.log(typeof other2); //object
    console.log(typeof other3); //object
    console.log(typeof example); //function
    console.log(typeof example2); //function
    console.log(typeof example3); //function 
{% endhighlight %}
 
怎么区分普通对象和函数对象呢？！其实很简单，凡是通过 new Function() 创建的对象都是函数对象，其他的都是普通对象；所以 other、other2、other3 为普通对象，而 example、example2、example3 为函数对象。



在 JavaScript 中，每当定义一个函数对象时候，对象中都会包含一些预定义的属性（意思就是这个函数对象一旦被定义就必然会有这些属性）。


其中函数对象的一个属性就是原型对象 prototype；这个属性会指向函数的原型对象。


默认情况下每个原型对象又都会获取一个 constructor 属性，这个属性包含一个指向 prototype 属性所在函数的指针。


##### 普通对象没有prototype,但有 __proto_ _属性。


### 让你现出'原型'



来来来,了解完对象,我们该开车上路了（老司机秒懂）


![prototype-4](http://i.imgur.com/QQy5MPI.png)

{% highlight ruby %}
	function Dogs(){
	}
	Dogs.prototype.name = "Collie";
	Dogs.prototype.age = 3;
	Dogs.prototype.DogsName = function(){
	alert(this.name); 
	};
	
	var DogsA = new Dogs();
	DogsA.DogsName();//"Collie"
{% endhighlight %}

![prototype-5](http://i.imgur.com/5WZfa1w.png)


上面的代码中，创建了一个 Dogs 函数，这时候它就会拥有一个 prototype 属性，这个属性指向了 Dogs Prototype 原型对象，而这个原型对象拥有一个 constructor (构造函数) 属性，其指针指向了 Dogs,就是 prototype 属性所在的函数 Dogs；当你创建一个对象实例（ DogsA，就是这条语句：var DogsA = new Dogs(); ）的时候，同样会拥有一个 prototype 属性；这个 prototype 属性会指向其原型对象，而不是直接指向其构造函数 Dogs。

##### 重点：实例对象是通过原型对象与构造函数取得联系的。



### 原型链，老司机，深入一些！

##### JS 在创建对象（不论是普通对象还是函数对象）的时候，都有一个叫做 _ _proto__ 的内置属性，用于指向创建它的函数对象的原型对象 prototype。

![prototype-9](http://i.imgur.com/lHcKK4A.png)


我们可以测试一下，以上面的代码为例：

{% highlight ruby %}

    console.log(DogsA._proto_ === Dogs.prototype) //true

{% endhighlight %}

同样，Dogs.prototype对象也有 __proto_ _ 属性，它指向创建它的函数对象（Object）的 prototype。

{% highlight ruby %}

      console.log(Dogs.prototype._proto_ === Object.prototype) //true

{% endhighlight %}

##### 你瞧，证明了你 DogsA 是我 Dogs 实例化出来的对象出来的。

好了继续，Object.prototype对象也有 __proto_ _属性，但它比较特殊，为 NULL

{% highlight ruby %}

      console.log(Object.prototype._proto_) //null

{% endhighlight %}

我们把这个有 _ _proto__ 串起来，直到 Object.prototype.__proto_ _为 NULL 的链就叫做原型链。

![prototype-7](http://i.imgur.com/g0Ycfrc.png)


### 总结

- 原型和原型链是 JS 实现继承的一种模型。
- 原型链是靠 __proto_ _ 形成的，而不是 prototype。
- 所有的原型对象都有 constructor 属性，该属性对应创建所有指向该原型的实例构造函数。
- 函数对象和原型对象通过 prototype 和 constructor 属性进行相互关联。

#### 该文章部分知识网络整理
