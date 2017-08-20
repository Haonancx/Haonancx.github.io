---
layout: post
title:  "placeholder 兼容问题"
date:   2015-08-03 16:13:02
categories: Jquery 兼容问题
tags: Jquery 兼容问题
---


#### 本篇文章主要介绍了使用 jQuery 解决日常工作中的一些小问题。

###### 你身为一名前端，或者你即将走向前端之路，如果你没有听过大名鼎鼎的 Jquery,那么你将是不合格的一名前端工程师，虽然现在前端领域各式各样的框架引人注目，甚至大部分人对 Jquery 嗤之以鼻，但是，纵观前端领域，优质的前端屈指可数；所以本文针对合适的人解决合理的事情。

### 众所周知，IE 浏览器在 Web 开发过程中，对于前端工程师来说，无疑是噩梦，特别是IE9以下的版本，这个小节，我们将来讨论如何使用使用 jQuery 快速解决 input 中 placeholder 值在 IE 中无法支持的问题。需要的朋友可以过来参考下，希望对大家有所帮助。###


#### 首先先引入 Juery 文件，附上官网 [http://jquery.com](http://jquery.com "Jquery 官网") 然后在针对表单控件写入相应的JS从而解决兼容问题。（注意JS加载的顺序）####


##### 思路：为不支持 placeholder 的浏览器创建其属性或者对其浏览器做判断，然后模拟鼠标获得焦点（onfocus）时 input 控件内的文字为空，#####

![jquery-input-placeholder-2](http://i.imgur.com/u7NVU8M.jpg)

 当鼠标离开时（onblur）为其添加文字。

![jquery-input-placeholder-1](http://i.imgur.com/Pc9heDY.jpg) 

##### 1.解决方法：#####
{% highlight ruby %}
    $(document).ready(function(){var doc=document,inputs=doc.getElementsByTagName('input'),supportPlaceholder='placeholder'in doc.createElement('input'),placeholder=function(input){var text=input.getAttribute('placeholder'),defaultValue=input.defaultValue;if(defaultValue==''){input.value=text}input.onfocus=function(){if(input.value=text){this.value=''}};input.onblur=function(){if(input.value=''){this.value=text}}};if(!supportPlaceholder){for(var i=0,len=inputs.length;i<len;i++){var input=inputs[i],text=input.getAttribute('placeholder');if(input.type==='text'&&text){placeholder(input)}}}});
{% endhighlight %}

##### 2.解决方法：#####
{% highlight ruby %}
    $(function(){
    if(!placeholderSupport()){   // 判断浏览器是否支持 placeholder
    $('[placeholder]').focus(function() {
    var input = $(this);
    if (input.val() == input.attr('placeholder')) {
    input.val('');
    input.removeClass('placeholder');
    }
    }).blur(function() {
    var input = $(this);
    if (input.val() == '' || input.val() == input.attr('placeholder')) {
    input.addClass('placeholder');
    input.val(input.attr('placeholder'));
    }
    }).blur();
    };
    })
    function placeholderSupport() {
    return 'placeholder' in document.createElement('input');
    }
{% endhighlight %}

### 其实，即使浏览器在支持 HTML5 placeholder 属性的情况下还是在 表现上有差异的。 ###

#### 下图为 input placeholder 在 谷歌浏览器(Chrome)下的表现####

![placeholder-1.png](http://i.imgur.com/WV6NrGx.png)


#### 下图为 input placeholder 在 火狐浏览器(FireFox)下的表现####


![placeholder-2](http://i.imgur.com/VKgKGMh.png)


##### 解决方法

{% highlight ruby %}
    <style>
       input:-moz-placeholder { color: #999; }
       ::-webkit-input-placeholder { color:red }
    </style>
{% endhighlight %}


#### 第一篇文章
