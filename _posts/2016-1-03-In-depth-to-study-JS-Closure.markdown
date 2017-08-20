---
layout: post
title:  "Javascript 深入浅出闭包"
date:   2016-1-03 22:04:28
categories: JS 深入浅出
tags: JS 深入浅出
---
#### 闭包（closure）是Javascript语言的一个重点，也是难点。

![in-depth-1](http://i.imgur.com/ykx6i89.jpg)

### 闭包

闭包是指可以包含自由（未绑定到特定对象）变量的代码块；这些变量不是在这个代码块内或者任何全局上下文中定义的，而是在定义代码块的环境中定义局部变量（百度百科）？？？ 这他娘叫讲个清楚，别怕，让我娓娓道来。

![in-depth-2](http://i.imgur.com/4RHPSf8.jpg)

闭包，简单来说就是可以读取其他函数内部变量的函数。只要满足这一点的函数，都可以叫闭包。


要理解闭包，首先得理解作用域。


##### 作用域主要分为两种：全局变量和局部变量。


### 全局变量？局部变量？

- 局部变量:只能用于定义它函数内部。对于其他的函数或脚本代码是不可用的。


{% highlight ruby %} 

    function myFunction() {
    var n = 5;
    return n * n;
    }
    myFunction();// 25

{% endhighlight %}

换个方式

{% highlight ruby %} 

    function myFunction() {
    var n = 5;
    return n * n;
    }
    console.log(n);//Uncaught ReferenceError: n is not defined

{% endhighlight %}

- 全局变量：函数可以访问由函数内部定义的变量。


{% highlight ruby %} 

    var n = 5;
    function myFunction() {
    return n * n;
    }
    myFunction();// 25

{% endhighlight %}


#### Javascript语言的特殊之处，就在于函数内部可以直接读取全局变量。例如：


{% highlight ruby %} 

    　　var n=1;

    　　function example(){
    　　　　alert(n);
    　　}
    
       f1(); // 1

{% endhighlight %}



#### 另一方面，在函数外部自然无法读取函数内的局部变量。例如：


{% highlight ruby %} 

    　　function example(){
    　　　　var n=1;
    　　}
    
    　　alert(n); // error 报错

{% endhighlight %}

#### 函数内部声明变量的时候，必须使用var命令去声明一个变量。如果不用的话，就会声明了一个全局变量。例如：


{% highlight ruby %} 

    　function example(){
    　　　　n=1;
    　　}
    
    　　example();
    
    　　alert(n); // 1

{% endhighlight %}


### 夹不到菜，怎么让大人帮忙？

就好比小孩在饭桌上吃饭，由于手比较短，只能在自己力所能及的范围内夹菜，也就是夹自己面前的菜（执行环境）；但是我们可以借用闭包（大人帮忙）的方式来夹别的菜。

当我们需要得到函数内的局部变量时，正常情况下，是取不到的，只有通过巧妙的方法去实现。


##### 解决方法：就是在自己的函数内部在定义一个函数E，然后再将函数E的值 return 回去，不就可以被访问了。


废话少说，上菜！！！


{% highlight ruby %} 

    function example(){
    
    　　　　var n=1;
    
    　　　　function example2(){

    　　　　　　alert(n); 
    　　　　}

    　　　　return example2;
    　　}
    
    　　var result=example();
    
    　　result(); // 1

{% endhighlight %}


### 好像有点明白了，但是怎么用呢？


闭包不仅可以读取函数内部的变量，上面也提到了，还能让这些变量的值始终保持在内存中。

我们再来看下面这个例子

{% highlight ruby %} 

    function example1(){
    
    var n=1;
    
    Add = function()
    {
    n+=1
    }
    
    function example2(){
    alert(n);
    }
    
    return example2;
    }
    
    var result=example1();
    
    result(); // 1
    
    Add();
    
    result(); // 2

{% endhighlight %}


##### 上面的代码中第一个" result(); "执行完以后，输出结果 "1",第二的" result(); "执行完以后，输出结果 "2"，这就证明了，函数 example1 中的局部变量n一直保存在内存中，并没有在第一个" result(); "执行完以后被自动清除；才能在执行第二个"result(); "完以后，输出结果 "2"，如果这样就容易造成我们平时所说的全局空间污染。


##### 还需要注意的是，上面的 "Add=function(){n+=1}" 这部分代码，一看这家伙居然没有名字（匿名函数），而且，变量还是没通过 var 去命名的，所以呢，就定义成了一个全局变量，所以外部函数当然可以对它"拳打脚踢"的操作咯；所以就有了"Add();" 执行以后，第二个 "result();"才能实现 n 的累加输出 "2"。


![closure-1](http://i.imgur.com/5R2msr5.png)


### 使用闭包需要注意些什么


- 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE浏览器中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。

##### 回收内存方法

{% highlight ruby %} 

    function example() {  

    var n = 1;  

    return fun(){

    alert(n++)

    };  
    } 
    
    fun();// 1 执行完后 n++，变量n任然存在于内存中
    
    fun = null;// n被回收 

{% endhighlight %}



- 闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。


### 嵌套函数的闭包


{% highlight ruby %} 

    function example() {  

    var n = 1;  

    return fun(){
    alert(n++)
    };  
    
    } 
    
    var fun = example();  
    
    fun();// 1 执行完后 n++，变量n任然存在于内存中
    
    fun();// 2   
    
    fun = null;// n被回收 

{% endhighlight %}


闭包的缺点就是常驻内存，闭包会使变量始终保存在内存中，如果使用不当会增大内存使用量，很容易造成内存泄露。

正常情况下外部函数是不能访问内部函数的变量的，但是可以利用闭包来实现对函数内部变量的访问。



一般函数执行完毕后，局部活动对象就被销毁，内存中仅仅保存全局作用域。但闭包的情况不同！



简而言之，闭包就是内部函数和外部函数连接的一座桥梁，（大人就是小孩与饭桌上所有菜的小助手）。

#### 该文章部分知识网络整理
