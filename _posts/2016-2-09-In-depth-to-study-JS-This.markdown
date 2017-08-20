---
layout: post
title:  "Javascript 深入浅出this"
date:   2016-2-09 21:04:28
categories: JS 深入浅出
tags: JS 深入浅出
---
#### 只有正确掌握了 JavaScript 中的 this 关键字，才算迈入了 JavaScript 这门语言的门槛。

![in-depth-This-1](http://i.imgur.com/55GL9MN.png)

### What ’s this？


要学一样东西，首先得了解它的含义，this 关键字的含义是明确且具体的，即指代当前对象；细心的童鞋发现了 当前对象 中"当前" 这两个字；说明这个 this 是在某种相对情况下才成立的。



![in-depth-This-2](http://i.imgur.com/cmTiqaO.jpg)




由于其运行期绑定的特性，JavaScript 中的 this 含义要丰富得多，它可以是全局对象、当前对象或者任意对象，这完全取决于函数的调用方式。JavaScript 中函数的调用有以下几种方式：作为对象方法调用，作为函数调用，作为构造函数调用，和使用 apply 或 call 调用。下面我们将按照调用方式的不同，分别讨论 this 的含义。




##### This 被分为三种情况：全局对象、当前对象或者任意对象;判断处于那种情况，这完全取决于函数的调用方式，JavaScript 中函数的调用有以下几种方式：




- 作为函数调用
- 作为对象方法调用
- 作为构造函数调用
- 使用 apply 或 call 调用



##### 这他娘的太可怕了，我要问的是 This 到底是什么鬼,你好家伙，给我罗列那么多，要晕了！！！



![in-depth-This-3](http://i.imgur.com/4bZF4bJ.jpg)




别急，咱一个萝卜一个坑，带你入坑以后，你就恍然大悟了。



![in-depth-This-4](http://i.imgur.com/XcOt3xU.jpg)




### 作为函数调用


##### 这是我们最常用的方法，这种调用方式属于全局调用，所以呢，这里的 This 就理所应当的成了全局对象。(全局对象？？难道它是一辆 '公交车'？)


废话少说，上个菜！！！


{% highlight ruby %}

    　　function example(){
    
    　　　　this.n = 'hello world !';
    
    　　　　console.log(this.n);
           console.log(this);
    
    　　}

    　　example(); // hello world !   Window

{% endhighlight %}


很显然，调用 example(); 时，输出了 'hello world !' 还有 Window;这时候说它是全局对象好像不具备什么说服力；咱换个姿势。



{% highlight ruby %}

    　　var n = 'hello world !';
    
    　　function example(){
    
    　　　console.log(this.n);
    
    　　}
    
       example(); // hello world !


{% endhighlight %}


你瞧，又是 ' hello world ! ',不急，咱有一千种姿势等你来解锁；再换。


{% highlight ruby %}

    　　var n = 'hello world !';
    
    　　function example(){
    
    　　　　this.n = 0;
    
    　　}
    
    　example();
    
    　console.log(n); // 0 !


{% endhighlight %}




果然是一辆 '公交车' !!!




![in-depth-This-5](http://i.imgur.com/YCZcI1i.jpg)




### 作为对象方法调用


##### 上述例子中，普通函数的调用把 This 作为window对象的方法进行了调用。显然 This 指向了 Window 对象；咱换个口味，看看下面的菜。

{% highlight ruby %}

    var name="Akita";
    var dogs={
        name:"Collie",
        showName:function(){
            console.log(this.name);
        }
    }

    dogs.showName();  //输出  Collie
 
    var otherName=dogs.showName;

    otherName();    //输出  Akita


{% endhighlight %}




1. 快来看，当执行 dogs.showName(); 时，输出 Collie (牧羊犬),说明这个时候的 This 是指向 dogs 这个对象的；


2. 而当我们尝试把 dogs.showName 赋给 otherName 时，我们回头想想这个 showName() 是做什么用的，很显然，输出它函数的执行环境所指向对象的 name，而此时 otherName 变量相当于 Window 对象的一个属性，因此 otherName() 执行的时候相当于 window.otherName(),即 window 对象调用 otherName 这个方法，所以 this 关键字指向 window;所以就会输出 Akita（秋田犬）。




### 作为构造函数调用


##### JavaScript 中的构造函数也很特殊，构造函数，其实就是通过这个函数生成一个新对象（object），这时候的 This 就会指向这个新对象；如果不使用 new 调用，则和普通函数一样。

{% highlight ruby %}

    　　function example(){
    
    　　　　this.n = 'hello world !';
    
    　　}
    
    　　var other = new example();
    
    　　console.log(other.n); //hello world !

{% endhighlight %}


快来看，我们为 example 这个函数 new(构造)了一个新的对象 other,那么 this 就会指向 other 这个对象，所以就会输出 'hello world !'。


### 使用 apply 或 call 调用


##### apply()是函数对象的一个方法，它应用某一对象的一个方法，用另一个对象替换当前对象。

{% highlight ruby %}

       var n = 'hello world!';
    　　function example(){
    　　　　console.log(this.n);
    　　}
    　　var o={};
    　　o.n = 'hey~';
    　　o.m = example;
    　　o.m.apply();//hello world!

{% endhighlight %}


来看看这行代码，当apply()的参数为空时，就是没有对象去替换掉当前的对象，所以默认调用全局对象。因此，这时会输出'hello world!'，证明this指的是全局对象。



那么试试给apply（）指定一个对象。


{% highlight ruby %}

       var n = 'hello world!';
    　　function example(){
    　　　　console.log(this.n);
    　　}
    　　var o={};
    　　o.n = 'hey~';
    　　o.m = example;
    　　o.m.apply(o);//hey~

{% endhighlight %}



此时输出了'hey~',说明对象替换成功，this 指向了 o 这个对象。



![in-depth-This-5](http://i.imgur.com/PKJSpFA.jpg)


#### 本文介绍了 JavaScript 中的 this 关键字在各种情况下的含义，虽然这只是 JavaScript 中一个很小的概念，但借此我们可以深入了解 JavaScript 中函数的执行环境，才能充分发挥 JavaScript 的特点，才会发现 JavaScript 语言特性的强大。



#### 该文章部分知识网络整理
