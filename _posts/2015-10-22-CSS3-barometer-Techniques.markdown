---
layout: post
title:  "CSS3 心情由晴雨表决定"
date:   2015-10-22 13:23:32
categories: CSS
tags: CSS
---
#### 虽然在国内广泛使用 CSS3 的距离还是有些远,今天我们使用 CSS3 的新特性制作7个很酷的晴雨表动画。

GITHUB地址：[css3-weather-barometer](https://github.com/Haonancx/css3-weather-barometer/tree/master)

### 废话少说，先上效果图


![barometer](http://i.imgur.com/1FXq2aO.gif)



### CSS3 主要技术栈


- 线性渐变：-webkit-linear-gradient
- 动画属性：animation 

（这篇文章需要一些掌握 CSS3 动效基础的童鞋学习）
#####  科普

- animation-name	规定需要绑定到选择器的 keyframe 名称。。
- animation-duration	规定完成动画所花费的时间，以秒或毫秒计。
- animation-timing-function	规定动画的速度曲线。
- animation-delay	规定在动画开始之前的延迟。
- animation-iteration-count	规定动画应该播放的次数。
- animation-direction	规定是否应该轮流反向播放动画。


### 线性渐变背景

一共7个动画，就把它们都放在一块儿，并成一排吧。

##### HTML
{% highlight ruby %}
    <div class="container">
    	<div class="sunny"></div> 
    	<div class="cloudy"></div>
    	<div class="rainy"></div>
    	<div class="snowy"></div>
    	<div class="rainbow"></div>
    	<div class="starry"></div>
    	<div class="stormy"></div>
    </div>
{% endhighlight %}

首先，先让container这个垂直和水平居中，其次，7个晴雨表宽度为了保持一致，先计算100%/7 =14.285714...;约得于14.3%；然后使用线性渐变从左到右绘画出相应的颜色。

##### CSS
{% highlight ruby %}
    .container{
    width: 1200px;
    position: absolute;
    height: 210px;
    left: 50%;
    top: 50%;
    margin: -65px -600px;
    -webkit-transform: scale(.9);
    -ms-transform: scale(.9);
    transform: scale(0.9);
    background: -webkit-linear-gradient(left, #00BBFF, #00BBFF 14.3%, #2EB5E5 14.3%, #2EB5E5 28.6%, #E6E6E6 28.6%, #E6E6E6 42.9%, #F3D166 42.9%, #F3D166 57.2%, #222233 57.2%, #222233 71.5%, #444444 71.5%, #444444 85.8%, #85DB8C 85.8%);
    background: linear-gradient(left, #00BBFF, #00BBFF 14.3%, #2EB5E5 14.3%, #2EB5E5 28.6%, #E6E6E6 28.6%, #E6E6E6 42.9%, #F3D166 42.9%, #F3D166 57.2%, #222233 57.2%, #222233 71.5%, #444444 71.5%, #444444 85.8%, #85DB8C 85.8%);}
{% endhighlight %}

##### 效果

![barometer-1](http://i.imgur.com/jGNW8P2.png)



###晴天



先分解这个动效，一个外发光的圆，旋转的两条矩形的光影（绝对定位布局）；这里用到 animation 、旋转属性 transform: rotate()、伪元素 ：before、:after；我这里使用 sunny 和 sunny：before 做旋转的矩形光影，sunny：after 做 外发光的圆；再用 animation 这个属性 定义一个旋转的函数；



##### CSS
{% highlight ruby %}
    .sunny { 
    	-webkit-animation: sunny 15s linear infinite; 
    	animation: sunny 15s linear infinite;
    	background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%);
    	background: linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%); 
    	height: 140px;
    	width: 20px; 
    	margin-left: -15px;
    	position: absolute;
    	left: 90px;  
    	top: 20px;
    }
    .sunny:before {
    	background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%);
    	background: linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%);
    	content: ''; 
    	height: 140px; 
    	width: 20px;
    	opacity: 1; 
    	position: absolute;
    	bottom: 0px;
    	left: 0px; 
    	-webkit-transform: rotate(90deg); 
    	-ms-transform: rotate(90deg); 
    	transform: rotate(90deg);
    }
    .sunny:after {
    	background: #FFEE44; 
    	border-radius: 50%; 
    	box-shadow: rgba(255,255,0,0.2) 0 0 0 15px;
    	content: '';  
    	height: 80px;
    	width: 80px;  
    	position: absolute; 
    	left: -30px; 
    	top: 30px;
    }
    @-webkit-keyframes sunny { 
    	0% { -webkit-transform: rotate(0deg); transform: rotate(0deg); }
    	100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); }
    }
    @keyframes sunny { 
    	0% { -webkit-transform: rotate(0deg); transform: rotate(0deg); }
    	100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); }
    }

{% endhighlight %}


##### 效果

![barometer-3](http://i.imgur.com/2N9ZBub.gif)



###多云

这个"多云" 主要由云朵和由小到大变化的阴影组成（绝对定位布局），这里我用 cloudy 这个 DIV 本身去画一个圆，再用 box-shadow去画那个云的不规则形状；用 cloudy:after 去画阴影。这里有透明度上的渐变。


##### CSS
{% highlight ruby %}
    .cloudy {
    	-webkit-animation: cloudy 5s ease-in-out infinite;
    	animation: cloudy 5s ease-in-out infinite;
    	background: #FFFFFF;
    	border-radius: 50%;
    	box-shadow: 
    		#FFFFFF 65px -15px 0 -5px, 
    		#FFFFFF 25px -25px, 
    		#FFFFFF 30px 10px, 
    		#FFFFFF 60px 15px 0 -10px, 
    		#FFFFFF 85px 5px 0 -5px;
    	height: 50px;
    	width: 50px; 
    	margin-left: -60px;
    	position: absolute;
    	left: 255px;
    	top: 70px; 
    }
    .cloudy:after {
    	-webkit-animation: cloudy_shadow 5s ease-in-out infinite;
    	animation: cloudy_shadow 5s ease-in-out infinite;
    	background: #000000;
    	border-radius: 50%;
    	content: '';
    	height: 15px;
    	width: 120px;
    	opacity: 0.2;
    	position: absolute;
    	left: 5px; 
    	bottom: -60px;
      -webkit-transform: scale(.7);
      -ms-transform: scale(.7);
      transform: scale(.7);
    }
    @-webkit-keyframes cloudy {
    	50% { -webkit-transform: translateY(-20px); transform: translateY(-20px); }
    }
    @keyframes cloudy {
    	50% { -webkit-transform: translateY(-20px); transform: translateY(-20px); }
    }
    @-webkit-keyframes cloudy_shadow {
    	50% { -webkit-transform: translateY(20px) scale(1); transform: translateY(20px) scale(1); opacity:.05; }
    }
    @keyframes cloudy_shadow {
    	50% { -webkit-transform: translateY(20px) scale(1); transform: translateY(20px) scale(1); opacity:.05; }
    }
{% endhighlight %}
##### 效果


![barometer-5](http://i.imgur.com/taZUuvJ.gif)

###有雨

有雨的效果除了颜色上和多云不一样之外（绝对定位布局），新增了一个下雨的效果，这里可以用 cloudy:before 去画这个效果。

##### 	CSS
{% highlight ruby %}
    .rainy{-webkit-animation:rainy 5s ease-in-out infinite 1s;animation:rainy 5s ease-in-out infinite 1s;background:#ccc;border-radius:50%;box-shadow:#ccc 65px -15px 0 -5px,#ccc 25px -25px,#ccc 30px 10px,#ccc 60px 15px 0 -10px,#ccc 85px 5px 0 -5px;display:block;height:50px;width:50px;margin-left:-60px;position:absolute;left:427px;top:70px}.rainy:after{-webkit-animation:rainy_shadow 5s ease-in-out infinite 1s;animation:rainy_shadow 5s ease-in-out infinite 1s;background:#000;border-radius:50%;content:'';height:15px;width:120px;opacity:.2;position:absolute;left:5px;bottom:-60px;-webkit-transform:scale(.7);-ms-transform:scale(.7);transform:scale(.7)}.rainy:before{-webkit-animation:rainy_rain .7s infinite linear;animation:rainy_rain .7s infinite linear;content:'';background:#ccc;border-radius:50%;display:block;height:6px;width:3px;opacity:.3;-webkit-transform:scale(.9);-ms-transform:scale(.9);transform:scale(.9)}@-webkit-keyframes rainy{50%{-webkit-transform:translateY(-20px);transform:translateY(-20px)}}@keyframes rainy{50%{-webkit-transform:translateY(-20px);transform:translateY(-20px)}}@-webkit-keyframes rainy_shadow{50%{-webkit-transform:translateY(20px) scale(1);transform:translateY(20px) scale(1);opacity:.05}}@keyframes rainy_shadow{50%{-webkit-transform:translateY(20px) scale(1);transform:translateY(20px) scale(1);opacity:.05}}@-webkit-keyframes rainy_rain{0%{box-shadow:rgba(0,0,0,0) 30px 30px,rgba(0,0,0,0) 40px 40px,#000 50px 75px,#000 55px 50px,#000 70px 100px,#000 80px 95px,#000 110px 45px,#000 90px 35px}25%{box-shadow:#000 30px 45px,#000 40px 60px,#000 50px 90px,#000 55px 65px,rgba(0,0,0,0) 70px 120px,rgba(0,0,0,0) 80px 120px,#000 110px 70px,#000 90px 60px}26%{box-shadow:#000 30px 45px,#000 40px 60px,#000 50px 90px,#000 55px 65px,rgba(0,0,0,0) 70px 40px,rgba(0,0,0,0) 80px 20px,#000 110px 70px,#000 90px 60px}50%{box-shadow:#000 30px 70px,#000 40px 80px,rgba(0,0,0,0) 50px 100px,#000 55px 80px,#000 70px 60px,#000 80px 45px,#000 110px 95px,#000 90px 85px}51%{box-shadow:#000 30px 70px,#000 40px 80px,rgba(0,0,0,0) 50px 45px,#000 55px 80px,#000 70px 60px,#000 80px 45px,#000 110px 95px,#000 90px 85px}75%{box-shadow:#000 30px 95px,#000 40px 100px,#000 50px 60px,rgba(0,0,0,0) 55px 95px,#000 70px 80px,#000 80px 70px,rgba(0,0,0,0) 110px 120px,rgba(0,0,0,0) 90px 110px}76%{box-shadow:#000 30px 95px,#000 40px 100px,#000 50px 60px,rgba(0,0,0,0) 55px 35px,#000 70px 80px,#000 80px 70px,rgba(0,0,0,0) 110px 25px,rgba(0,0,0,0) 90px 15px}100%{box-shadow:rgba(0,0,0,0) 30px 120px,rgba(0,0,0,0) 40px 120px,#000 50px 75px,#000 55px 50px,#000 70px 100px,#000 80px 95px,#000 110px 45px,#000 90px 35px}}@keyframes rainy_rain{0%{box-shadow:rgba(0,0,0,0) 30px 30px,rgba(0,0,0,0) 40px 40px,#000 50px 75px,#000 55px 50px,#000 70px 100px,#000 80px 95px,#000 110px 45px,#000 90px 35px}25%{box-shadow:#000 30px 45px,#000 40px 60px,#000 50px 90px,#000 55px 65px,rgba(0,0,0,0) 70px 120px,rgba(0,0,0,0) 80px 120px,#000 110px 70px,#000 90px 60px}26%{box-shadow:#000 30px 45px,#000 40px 60px,#000 50px 90px,#000 55px 65px,rgba(0,0,0,0) 70px 40px,rgba(0,0,0,0) 80px 20px,#000 110px 70px,#000 90px 60px}50%{box-shadow:#000 30px 70px,#000 40px 80px,rgba(0,0,0,0) 50px 100px,#000 55px 80px,#000 70px 60px,#000 80px 45px,#000 110px 95px,#000 90px 85px}51%{box-shadow:#000 30px 70px,#000 40px 80px,rgba(0,0,0,0) 50px 45px,#000 55px 80px,#000 70px 60px,#000 80px 45px,#000 110px 95px,#000 90px 85px}75%{box-shadow:#000 30px 95px,#000 40px 100px,#000 50px 60px,rgba(0,0,0,0) 55px 95px,#000 70px 80px,#000 80px 70px,rgba(0,0,0,0) 110px 120px,rgba(0,0,0,0) 90px 110px}76%{box-shadow:#000 30px 95px,#000 40px 100px,#000 50px 60px,rgba(0,0,0,0) 55px 35px,#000 70px 80px,#000 80px 70px,rgba(0,0,0,0) 110px 25px,rgba(0,0,0,0) 90px 15px}100%{box-shadow:rgba(0,0,0,0) 30px 120px,rgba(0,0,0,0) 40px 120px,#000 50px 75px,#000 55px 50px,#000 70px 100px,#000 80px 95px,#000 110px 45px,#000 90px 35px}}

    .rainbow{-webkit-animation:rainbow 5s ease-in-out infinite;animation:rainbow 5s ease-in-out infinite;border-radius:170px 0 0 0;box-shadow:#fb323c -2px -2px 0 1px,#f99716 -4px -4px 0 3px,#fee124 -6px -6px 0 5px,#afdf2e -8px -8px 0 7px,#6ad7f8 -10px -10px 0 9px,#60b1f5 -12px -12px 0 11px,#a3459b -14px -14px 0 13px;height:70px;width:70px;margin-left:-40px;position:absolute;left:610px;top:71px;-webkit-transform:rotate(40deg);-ms-transform:rotate(40deg);transform:rotate(40deg)}.rainbow:after{-webkit-animation:rainbow_shadow 5s ease-in-out infinite;animation:rainbow_shadow 5s ease-in-out infinite;background:#000;border-radius:50%;content:'';opacity:.2;height:15px;width:120px;position:absolute;bottom:-23px;left:17px;-webkit-transform:rotate(-40deg);-ms-transform:rotate(-40deg);transform:rotate(-40deg);-webkit-transform-origin:50% 50%;-ms-transform-origin:50% 50%;transform-origin:50% 50%}@-webkit-keyframes rainbow{50%{-webkit-transform:rotate(50deg);transform:rotate(50deg)}}@keyframes rainbow{50%{-webkit-transform:rotate(50deg);transform:rotate(50deg)}}@-webkit-keyframes rainbow_shadow{50%{-webkit-transform:rotate(-50deg) translate(10px) scale(.7);transform:rotate(-50deg) translate(10px) scale(.7);opacity:.05}}@keyframes rainbow_shadow{50%{-webkit-transform:rotate(-50deg) translate(10px) scale(.7);transform:rotate(-50deg) translate(10px) scale(.7);opacity:.05}}

{% endhighlight %}
##### 效果

![barometer-6](http://i.imgur.com/tOSValr.gif)

###彩虹

利用border-radius，box-shadow这两个属性来绘制彩虹（绝对定位布局）。

##### CSS
{% highlight ruby %}
    .rainbow{-webkit-animation:rainbow 5s ease-in-out infinite;animation:rainbow 5s ease-in-out infinite;border-radius:170px 0 0 0;box-shadow:#fb323c -2px -2px 0 1px,#f99716 -4px -4px 0 3px,#fee124 -6px -6px 0 5px,#afdf2e -8px -8px 0 7px,#6ad7f8 -10px -10px 0 9px,#60b1f5 -12px -12px 0 11px,#a3459b -14px -14px 0 13px;height:70px;width:70px;margin-left:-40px;position:absolute;left:610px;top:71px;-webkit-transform:rotate(40deg);-ms-transform:rotate(40deg);transform:rotate(40deg)}.rainbow:after{-webkit-animation:rainbow_shadow 5s ease-in-out infinite;animation:rainbow_shadow 5s ease-in-out infinite;background:#000;border-radius:50%;content:'';opacity:.2;height:15px;width:120px;position:absolute;bottom:-23px;left:17px;-webkit-transform:rotate(-40deg);-ms-transform:rotate(-40deg);transform:rotate(-40deg);-webkit-transform-origin:50% 50%;-ms-transform-origin:50% 50%;transform-origin:50% 50%}@-webkit-keyframes rainbow{50%{-webkit-transform:rotate(50deg);transform:rotate(50deg)}}@keyframes rainbow{50%{-webkit-transform:rotate(50deg);transform:rotate(50deg)}}@-webkit-keyframes rainbow_shadow{50%{-webkit-transform:rotate(-50deg) translate(10px) scale(.7);transform:rotate(-50deg) translate(10px) scale(.7);opacity:.05}}@keyframes rainbow_shadow{50%{-webkit-transform:rotate(-50deg) translate(10px) scale(.7);transform:rotate(-50deg) translate(10px) scale(.7);opacity:.05}}

{% endhighlight %}

##### 效果图

![barometer-7](http://i.imgur.com/ACATUyP.gif)

###夜晚

利用绝对定位 starry 这个 DIV 负责画星星背景，starry：after 负责画出月亮（先画出矩形长条，再用 border-radius 画出 月牙）（绝对定位布局）

##### CSS
{% highlight ruby %}

    .starry{-webkit-animation:starry_star 5s ease-in-out infinite;animation:starry_star 5s ease-in-out infinite;background:#fff;border-radius:50%;box-shadow:#fff 26px 7px 0 -1px,rgba(255,255,255,0.1) -36px -19px 0 -1px,rgba(255,255,255,0.1) -51px -34px 0 -1px,#fff -52px -62px 0 -1px,#fff 14px -37px,rgba(255,255,255,0.1) 41px -19px,#fff 34px -50px,rgba(255,255,255,0.1) 14px -71px 0 -1px,#fff 64px -21px 0 -1px,rgba(255,255,255,0.1) 32px -85px 0 -1px,#fff 64px -90px,rgba(255,255,255,0.1) 60px -67px 0 -1px,#fff 34px -127px,rgba(255,255,255,0.1) -26px -103px 0 -1px;height:4px;width:4px;margin-left:-10px;opacity:1;position:absolute;left:777px;top:150px}.starry:after{-webkit-animation:starry 5s ease-in-out infinite;animation:starry 5s ease-in-out infinite;border-radius:50%;box-shadow:#fff -25px 0;content:'';height:100px;width:100px;position:absolute;top:-106px;-webkit-transform:rotate(-5deg);-ms-transform:rotate(-5deg);transform:rotate(-5deg);-webkit-transform-origin:0 50%;-ms-transform-origin:0 50%;transform-origin:0 50%}@-webkit-keyframes starry{50%{-webkit-transform:rotate(10deg);transform:rotate(10deg)}}@keyframes starry{50%{-webkit-transform:rotate(10deg);transform:rotate(10deg)}}@-webkit-keyframes starry_star{50%{box-shadow:rgba(255,255,255,0.1) 26px 7px 0 -1px,#fff -36px -19px 0 -1px,#fff -51px -34px 0 -1px,rgba(255,255,255,0.1) -52px -62px 0 -1px,rgba(255,255,255,0.1) 14px -37px,#fff 41px -19px,rgba(255,255,255,0.1) 34px -50px,#fff 14px -71px 0 -1px,rgba(255,255,255,0.1) 64px -21px 0 -1px,#fff 32px -85px 0 -1px,rgba(255,255,255,0.1) 64px -90px,#fff 60px -67px 0 -1px,rgba(255,255,255,0.1) 34px -127px,#fff -26px -103px 0 -1px}}@keyframes starry_star{50%{box-shadow:rgba(255,255,255,0.1) 26px 7px 0 -1px,#fff -36px -19px 0 -1px,#fff -51px -34px 0 -1px,rgba(255,255,255,0.1) -52px -62px 0 -1px,rgba(255,255,255,0.1) 14px -37px,#fff 41px -19px,rgba(255,255,255,0.1) 34px -50px,#fff 14px -71px 0 -1px,rgba(255,255,255,0.1) 64px -21px 0 -1px,#fff 32px -85px 0 -1px,rgba(255,255,255,0.1) 64px -90px,#fff 60px -67px 0 -1px,rgba(255,255,255,0.1) 34px -127px,#fff -26px -103px 0 -1px}}

{% endhighlight %}
##### 效果图

![barometer-8](http://i.imgur.com/ZmjRGnG.gif)

###雷电

雷电的效果同理（绝对定位布局），新增了一个雷电的效果，这里可以用 stormy:before 和 animation 去绘出这个效果。

##### CSS

{% highlight ruby %}
    .stormy{-webkit-animation:stormy 5s ease-in-out infinite;animation:stormy 5s ease-in-out infinite;background:#222;border-radius:50%;box-shadow:#222 65px -15px 0 -5px,#222 25px -25px,#222 30px 10px,#222 60px 15px 0 -10px,#222 85px 5px 0 -5px;height:50px;width:50px;margin-left:-60px;position:absolute;left:947px;top:70px}.stormy:after{-webkit-animation:stormy_shadow 5s ease-in-out infinite;animation:stormy_shadow 5s ease-in-out infinite;background:#000;border-radius:50%;content:'';height:15px;width:120px;opacity:.2;position:absolute;left:5px;bottom:-60px;-webkit-transform:scale(.7);-ms-transform:scale(.7);transform:scale(.7)}.stormy:before{-webkit-animation:stormy_thunder 2s steps(1,end) infinite;animation:stormy_thunder 2s steps(1,end) infinite;border-left:0 solid transparent;border-right:7px solid transparent;border-top:43px solid yellow;box-shadow:yellow -7px -32px;content:'';display:block;height:0;width:0;position:absolute;left:57px;top:70px;-webkit-transform:rotate(14deg);-ms-transform:rotate(14deg);transform:rotate(14deg);-webkit-transform-origin:50% -60px;-ms-transform-origin:50% -60px;transform-origin:50% -60px}@-webkit-keyframes stormy{50%{-webkit-transform:translateY(-20px);transform:translateY(-20px)}}@keyframes stormy{50%{-webkit-transform:translateY(-20px);transform:translateY(-20px)}}@-webkit-keyframes stormy_shadow{50%{-webkit-transform:translateY(20px) scale(1);transform:translateY(20px) scale(1);opacity:.05}}@keyframes stormy_shadow{50%{-webkit-transform:translateY(20px) scale(1);transform:translateY(20px) scale(1);opacity:.05}}@-webkit-keyframes stormy_thunder{0%{-webkit-transform:rotate(20deg);transform:rotate(20deg);opacity:1}5%{-webkit-transform:rotate(-34deg);transform:rotate(-34deg);opacity:1}10%{-webkit-transform:rotate(0deg);transform:rotate(0deg);opacity:1}15%{-webkit-transform:rotate(-34deg);transform:rotate(-34deg);opacity:0}}@keyframes stormy_thunder{0%{-webkit-transform:rotate(20deg);transform:rotate(20deg);opacity:1}5%{-webkit-transform:rotate(-34deg);transform:rotate(-34deg);opacity:1}10%{-webkit-transform:rotate(0deg);transform:rotate(0deg);opacity:1}15%{-webkit-transform:rotate(-34deg);transform:rotate(-34deg);opacity:0}}
{% endhighlight %}

##### 效果图

![barometer-9](http://i.imgur.com/tdxDXhT.gif)

###下雪


下雪的效果和下雨的效果除了颜色上不一样之外（绝对定位布局），只不过是把雨点的形状变成了圆形。



##### CSS
{% highlight ruby %}
    .snowy{-webkit-animation:snowy 5s ease-in-out infinite 1s;animation:snowy 5s ease-in-out infinite 1s;background:#fff;border-radius:50%;box-shadow:#fff 65px -15px 0 -5px,#fff 25px -25px,#fff 30px 10px,#fff 60px 15px 0 -10px,#fff 85px 5px 0 -5px;display:block;height:50px;width:50px;margin-left:-60px;position:absolute;left:1112px;top:70px}.snowy:after{-webkit-animation:snowy_shadow 5s ease-in-out infinite 1s;animation:snowy_shadow 5s ease-in-out infinite 1s;background:#000;border-radius:50%;content:'';height:15px;width:120px;opacity:.2;position:absolute;left:8px;bottom:-60px;-webkit-transform:scale(.7);-ms-transform:scale(.7);transform:scale(.7)}.snowy:before{-webkit-animation:snowy_snow 2s infinite linear;animation:snowy_snow 2s infinite linear;content:'';border-radius:50%;display:block;height:7px;width:7px;opacity:.8;-webkit-transform:scale(.9);-ms-transform:scale(.9);transform:scale(.9)}@-webkit-keyframes snowy{50%{-webkit-transform:translateY(-20px);transform:translateY(-20px)}}@keyframes snowy{50%{-webkit-transform:translateY(-20px);transform:translateY(-20px)}}@-webkit-keyframes snowy_shadow{50%{-webkit-transform:translateY(20px) scale(1);transform:translateY(20px) scale(1);opacity:.05}}@keyframes snowy_shadow{50%{-webkit-transform:translateY(20px) scale(1);transform:translateY(20px) scale(1);opacity:.05}}@-webkit-keyframes snowy_snow{0%{box-shadow:rgba(238,238,238,0) 30px 30px,rgba(238,238,238,0) 40px 40px,#eee 50px 75px,#eee 55px 50px,#eee 70px 100px,#eee 80px 95px,#eee 110px 45px,#eee 90px 35px}25%{box-shadow:#eee 30px 45px,#eee 40px 60px,#eee 50px 90px,#eee 55px 65px,rgba(238,238,238,0) 70px 120px,rgba(238,238,238,0) 80px 120px,#eee 110px 70px,#eee 90px 60px}26%{box-shadow:#eee 30px 45px,#eee 40px 60px,#eee 50px 90px,#eee 55px 65px,rgba(238,238,238,0) 70px 40px,rgba(238,238,238,0) 80px 20px,#eee 110px 70px,#eee 90px 60px}50%{box-shadow:#eee 30px 70px,#eee 40px 80px,rgba(238,238,238,0) 50px 100px,#eee 55px 80px,#eee 70px 60px,#eee 80px 45px,#eee 110px 95px,#eee 90px 85px}51%{box-shadow:#eee 30px 70px,#eee 40px 80px,rgba(238,238,238,0) 50px 45px,#eee 55px 80px,#eee 70px 60px,#eee 80px 45px,#eee 110px 95px,#eee 90px 85px}75%{box-shadow:#eee 30px 95px,#eee 40px 100px,#eee 50px 60px,rgba(238,238,238,0) 55px 95px,#eee 70px 80px,#eee 80px 70px,rgba(238,238,238,0) 110px 120px,rgba(238,238,238,0) 90px 110px}76%{box-shadow:#eee 30px 95px,#eee 40px 100px,#eee 50px 60px,rgba(238,238,238,0) 55px 35px,#eee 70px 80px,#eee 80px 70px,rgba(238,238,238,0) 110px 25px,rgba(238,238,238,0) 90px 15px}100%{box-shadow:rgba(238,238,238,0) 30px 120px,rgba(238,238,238,0) 40px 120px,#eee 50px 75px,#eee 55px 50px,#eee 70px 100px,#eee 80px 95px,#eee 110px 45px,#eee 90px 35px}}@keyframes snowy_snow{0%{box-shadow:rgba(238,238,238,0) 30px 30px,rgba(238,238,238,0) 40px 40px,#eee 50px 75px,#eee 55px 50px,#eee 70px 100px,#eee 80px 95px,#eee 110px 45px,#eee 90px 35px}25%{box-shadow:#eee 30px 45px,#eee 40px 60px,#eee 50px 90px,#eee 55px 65px,rgba(238,238,238,0) 70px 120px,rgba(238,238,238,0) 80px 120px,#eee 110px 70px,#eee 90px 60px}26%{box-shadow:#eee 30px 45px,#eee 40px 60px,#eee 50px 90px,#eee 55px 65px,rgba(238,238,238,0) 70px 40px,rgba(238,238,238,0) 80px 20px,#eee 110px 70px,#eee 90px 60px}50%{box-shadow:#eee 30px 70px,#eee 40px 80px,rgba(238,238,238,0) 50px 100px,#eee 55px 80px,#eee 70px 60px,#eee 80px 45px,#eee 110px 95px,#eee 90px 85px}51%{box-shadow:#eee 30px 70px,#eee 40px 80px,rgba(238,238,238,0) 50px 45px,#eee 55px 80px,#eee 70px 60px,#eee 80px 45px,#eee 110px 95px,#eee 90px 85px}75%{box-shadow:#eee 30px 95px,#eee 40px 100px,#eee 50px 60px,rgba(238,238,238,0) 55px 95px,#eee 70px 80px,#eee 80px 70px,rgba(238,238,238,0) 110px 120px,rgba(238,238,238,0) 90px 110px}76%{box-shadow:#eee 30px 95px,#eee 40px 100px,#eee 50px 60px,rgba(238,238,238,0) 55px 35px,#eee 70px 80px,#eee 80px 70px,rgba(238,238,238,0) 110px 25px,rgba(238,238,238,0) 90px 15px}100%{box-shadow:rgba(238,238,238,0) 30px 120px,rgba(238,238,238,0) 40px 120px,#eee 50px 75px,#eee 55px 50px,#eee 70px 100px,#eee 80px 95px,#eee 110px 45px,#eee 90px 35px}}
{% endhighlight %}

##### 效果图

![barometer-10](http://i.imgur.com/O8InQzl.gif)

#### 是不是感觉很酷？？？ 好了今天就到这儿，下篇文章见。
