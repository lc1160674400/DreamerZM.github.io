# 内联元素
----
> 背景
* 盒模型：inline,block,run-in(最不常用且有被淘汰的风险)
* inline和block也是css流体布局的本质所在，块级负责结构，内联负责内容
* css内联样式更为复杂和难以理解，由于css属性非常之多，并且往往会有继承特性，混合在一起会导致css解析规则非常复杂
> 哪些元素是内联元素

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;从定义上来看：指的是外在盒子（负责结构的盒子）的属性为in-line的所有元素，display:inline-block和display:inline-table都是，同样，display:inline肯定也是，img等内联元素自然也是
&nbsp;&nbsp;&nbsp;&nbsp;从表现上来看：可以和文字在一行显示的就是内联元素，例如，图片是内联元素，按钮是内联元素，输入框，下拉框等原生表单控件也是内联元素

&nbsp;&nbsp;&nbsp;&nbsp;那么？浮动元素是不是也是内联元素呢？答案是否，浮动元素是一种脱离了文档流的特殊的块级元素，实际上浮动元素并没有跟元素同级显示。

>内联盒模型
>幽灵空白节点
>>内联元素的所欲解析和渲染表现就如同每个行框盒子的前面都有一个空白的节点一样，但是这个空白的节点永远透明，不占据任何宽度，看不见也无法通过脚本获取，就好像幽灵一样样
>>证明方法：
```html:<style>
    <!-- div的样式为背景色 -->
    div{
        backgrount-color:#cd0000
    }
    <!-- span的display为内联元素 -->
    span{
        display:inline-block;
    }
    </style>
    <body>
        <!-- 讲道理div里面span没有内容div的高度应该为0，但是实际上div的高度为span的幽灵节点的高度 -->
        <div><span></span></div>
        
    </body>
```
#盒尺寸四大家族


