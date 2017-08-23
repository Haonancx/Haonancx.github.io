---
layout: post
title:  "编码风格与规范"
date:   2016-7-28 2:21:05
categories: 随笔 规范 架构
tags: 随笔 规范 架构
---
#### 不以规矩,不能成方圆。


![style-1](http://i.imgur.com/6XfDOq8.jpg)

每一种事物都有它被发明时，都会有其用处和目的，每一个事物都是自己擅长和适合的领域；


我们要在对的地方使用它，让它做自己擅长的事。

### 规范目的

我们知道，当一个团队开始指定并实行编码规范的话，错误就会变得更加显而易见。


如果一段特定的代码不符合规范的话，它有可能只是代码风格错误，而也有可能会是 bug。

早期指定规范就使得代码审核得以更好的开展，并且可以更精确的地定位到错误。

只要开发者们能够保证源代码源文件都严格遵循规范，那接下去所使用的混淆、压缩和编译工具则可投其所好不尽相同。

为了提高工作效率，便于后台人员添加功能及前端后期优化维护，输出高质量的文档。

在网站建设中，使结构更加清晰，代码简明有序，有一个更好的前端架构。

### 基本准则

符合 web 标准，使用具有语义的标签，使结构、表现、行为分离，兼容性优良。

页面性能优化，代码简洁、明了、有序，尽可能的减少服务器的负载，保证最快的解析速度。

### 文件规范

#### 目录结构

#### HTML文件

#### CSS文件

主要的 master.css　　

模块 module.css　　

基本共用 base.css　　

布局、版面 layout.css　　

主题 themes.css　　

专栏 columns.css　　

文字 font.css　　

表单 forms.css　　

补丁 mend.css　　

打印 print.css

#### JS文件

### 命名规范

#### HTML 与 CSS 命名　

头：header　　

内容：content/container　　

尾：footer　　

导航：nav　　

侧栏：sidebar　　

栏目：column　　

页面外围控制整体布局宽度：wrapper　　

左右中：left right center　　

登录条：loginbar　　

标志：logo　　

广告：banner　　

页面主体：main　　

热点：hot　　

新闻：news　　

下载：download　　

子导航：subnav　　

菜单：menu　　

子菜单：submenu

搜索：search　　

友情链接：friendlink　　

页脚：footer　　

版权：copyright　　

滚动：scroll　　

内容：content　　

标签：tags　　

文章列表：list　　

提示信息：msg　　

小技巧：tips　　

栏目标题：title　　

加入：joinus　　

指南：guide　　

服务：service　　

注册：regsiter　　

状态：status　　

投票：vote　　

合作伙伴：partner

**CSS 书写顺序　**　

- 位置属性(position, top, right, z-index,display, float 等)　　
- 大小(width, height, padding, margin)　　
- 文字系列(font, line-height, letter-spacing,colortext-align 等)　　
- 背景(background, border 等)　　
- 其他(animation, transition 等)


**注释的写法　**

/* Header */

内容区　

/* End Header */

#### JS命名

### 帮助文档

编写中...

#### 对于团队而言，统一很重要，代码是写给人看的，然后顺便跑在机器上而已。