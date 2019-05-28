# CSS那些事学习笔记

----

## 第一章： 花落知多少-CSS正传

> ### css的基本结构

&#160; &#160; &#160; &#160; ```selector{property:value}```

&#160; &#160; &#160; &#160; 选择器(selector)，声明{}，属性：property，数值：value

> ### css简写

&#160; &#160; &#160; &#160; 颜色的简写

&#160; &#160; &#160; &#160; 1.十六进制写法 (#FFFFFF) 2.RGB数值写法（rgb(0,255,255)） 3.颜色名称 （red）4.用户系统色盘（windowtext）

* ### 单位值的缩写

&#160; &#160; &#160; &#160; 当单位值为0时所有的单位都可以省略

* ### 内外补丁的简写

&#160; &#160; &#160; &#160; ```padding 上右下左```（顺时针罗盘方向）

* ### 边框的简写 

&#160; &#160; &#160; &#160; ```border（width，style，color）```,单独设置这些boder属性时也可以按照上右下左的顺序简写

* ### 背景的简写

&#160; &#160; &#160; &#160; ```background:background-color || background-imgage || background-repeat || background-attachment || background-position```

&#160; &#160; &#160; &#160;没写的属性会自动使用默认值 默认值 color：transparent image：none repeat：repeat attachment:scroll  position:0% 0%

* ### 字体的简写

&#160; &#160; &#160; &#160; ```font: font-style || font-variant || font-weight ||font-size || font-height || font-familly```

* ### 表的简写

&#160; &#160; &#160; &#160; ```list-style: list-style-image || list-style-position || list-style-type```

> ### CSS选择器

* ```*``` 通配选择符  选择所有

* `.` 类选择符 .className 

* `空格` 包含选择符 后代选择器 作用于某个后代的子元素

* ` > ` 子选择符，子对象选择器，定义子元素样式，无法定义子元素以外的样式，只选择父元素下面一层的子元素，多一层嵌套都无效

* ` + ` 相邻选择符，兄弟选择器，选择跟前面元素兄弟节点的元素

* 属性选择器 `E[attr]  //选择所有包含attr属性的E标签元素` 

`E[attr="value"]  //选择所有属性=value的E标签元素` 

`E[attr~="value"]  //选择属性attr的属性值是有空格隔开的字段，其中一段等于value的E标签元素` 

`E[attr|="value"]  //选择具有attr属性并且属性值必须是以value开始及使用-分隔得E元素` 

* Id选择器 `#IdName`

> ### 伪类与伪对象

&#160; &#160; &#160; &#160; ```设置一些伪类状态的样式 Link，visited,hover,active```

&#160; &#160; &#160; &#160; ```:before :after```

> ### 选择符的覆盖 

> ### 选择符的继承

> ### 权重优先级

&#160; &#160; &#160; &#160; important关键字 > 行间样式 > 内联样式 > 外联样式 > 默认样式

&#160; &#160; &#160; &#160; 标签间的优先级 ： style（行间样式）  > ID选择器 > 类选择器 > 标签选择器伪类及伪对象 > 其他选择器

> ### CSS的引入

&#160; &#160; &#160; &#160; 1.直接写在html标签上，行间样式

&#160; &#160; &#160; &#160; 2.style标签内，内联样式

&#160; &#160; &#160; &#160; 3.<link/> 外链引入，外链样式

&#160; &#160; &#160; &#160; 4.@import url() 导入样式


----

## 第三章 简单的页面布局

> ### 盒模型的介绍

* > `3.1.1`认识盒模型 

    标准的盒模型：content，padding，border，margin，宽度=content

    ie的盒模型：content，padding，border，margin，宽度 = content+padding+border

* > `3.1.2`DOCTYPE

    DOCUMENT TYPE的简写，称为DTD声明，

*  > `3.1.3`DOCTYPE类型

    过渡的(Transitional)：要求非常宽松的DTD，它允许你继续使用HTML4.01的标识(但是要符合xhtml的写法)，完整代码如下：
```<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">```

    严格的(Strict)：要求严格的DTD，你不能使用任何表现层的标识和属性，例如<br>，完整代码如下：
```<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">```

    框架的(Frameset)：专门针对框架页面设计使用的DTD，如果你的页面中包含有框架，需要采用这种DTD，完整代码如下：
```<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">```

* > `3.1.4`IE浏览器的盒模型

* > `3.1.5`对盒模型的总结

    文本类型的声明对于盒模型的宽高计算方式可能有所改变

> ### 网页布局的设计原则

* *样式的重用性 ： 利用class选择符重复将某个属性在页面中重复使用*

* *浮动与清楚浮动：浮动很多时候会制造兼容性问题，但是同时又可以巧妙的解决兼容性问题*

* *定位方式和页面布局：一般指的是对绝对定位的处理方式，绝对定位能够做到j精准的页面布局，但是绝对定位的盒模型的宽高都是固定的无法自适应*

* *过度使用ID选择器：由于同一个ID在页面中只能够出现一次，所以违背了重用性的设计模式*

* *命名方式尽量不适用数字命名，对某个类做功能性阐述*

* *合理的使用css布局，切勿盲目使用*

### 最简单的页面

* > 3.3.1最简单的页面

## 提纲挈领--两列页面布局

> ### 宽度一个固定，一个自适应的实现方式

* 父元素绝对定位，需要固定宽度的元素固定宽度并且绝对定位靠右，自适应的width:auto,并且margin：负宽度那么多

* flex布局：父元素display：flex,固定宽度元素写固定宽度，自适应元素flex：1

> ### 两列等高实现

* 基础方法：通过padding(原理：padding颜色默认和content是一样的)，padding一个极大值，然后通过margin负值将下面的元素往上移，父元素设置overflow:hidden

* 通过背景图片，repeat-y实现,将父元素的背景设置为跟较短元素的背景颜色一样的图片，并且填充方式为repeat

## 三列布局

> ### 两边宽度固定中间自适应的实现

* 左右两侧宽度固定，中间元素设置左右margin，宽度auto，实现自适应

> ### 




