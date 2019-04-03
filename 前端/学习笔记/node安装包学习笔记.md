# Node.js安装第三方包与前端开发第三方组件使用

-----

> * ### Node.js和Npm
> * ### Npm install

----

> ## Node.js和Npm
    
>>1.什么是Node.js
    web端传统的Javascript主要由三部分概念组成：ECMAScript DOM BOM
    
        ECMAScript：是js的标准，js是它的具体体现和拓展，它描述的语法和基本对象，比如基本语法，运算发，语句，继承机制，数据结构，以及一些内置对象
    
        DOM（Document Object Module）文档对象模型，描述处理网页内容的方法和接口，将整个文档document解析成dom树供用户使用js对其进行操作，这种对象模型不只是在js里面存在，在flash等中也存在这种文档对象模型
    
        BOM（Brower Object Module）浏览器对象模型，描述可以和浏览器窗口交互的方法和接口对象，比如：常用的 window对象，history对象，location navigator等
    
        而web端的JS是运行在浏览器环境的，Node.js是一个基于Chrome Javasript运行时建立的运行在服务器端的环境，相当于python的解释器，其地位是和浏览器概念类似，等同于一个js的全新运行环境，js可以运行在浏览器，也可以运行在node.js里。
    
        在浏览器中，js是单线程运行，每个window一个js线程，既然是单线程的，在某个特定的时候只有特定的代码能够被执行，并阻塞其他带啊，而浏览器是事件驱动的，浏览器中的很多行为是异步的，会创建事件并且放入到执行队列中，javascript引擎是单线程处理它的队列任务，可以理解为就是普通函数和回调函数构成的队列。
    
        同样，在js在nodejs中运行，用户写的代码是单线程的，但node.js内部并不是单线程的，js不是用多个线程为每个请求执行工作，相反而是把所有的工作添加到一个队列中，然后又一个单独的线程，来循环提取队列中的事件，事件循环线程抓取事件队列中最上面的条目，执行他，然后抓取下一个条目，当执行长期运行或有阻塞I/O的代码时，它不会被阻塞，而是会提取下一个事件。
>>2.Npm
    
    Npm（Node Package manager）,node包管理工具，是随同nodeJs一起安装的包管理工具能解决NodeJs代码部署上的很多问题，可以用来日常下载和安装一些javascript依赖和第三方包

----
> ## Npm install 安装包[install命令](https://www.npmjs.com.cn/cli/install/)

>> 根据官方的npm文档描述：此命令将安装程序包及其依赖的任何程序包。如果程序包具有package-lock或shrinkwrap文件，则依赖项的安装将由此驱动，npm-shrinkwrap.json如果两个文件都存在则优先。请参阅package-lock.json和npm- shrinkwrap。

----
> ## Package是什么？


> 这个地方pagcage是什么？安装的package是什么？

>> a）包含由package.json文件描述的程序的文件夹

>> b）包含（a）的压缩的tarball

>>c）解析为（b）的网址

>>d）<name>@<version>在登记册上公布的（见npm-registry）与（c）

>>e）a <name>@<tag>（见npm-dist-tag）指向（d）

>>f）<name>具有满足（e）的“最新”标签的a

>>g）<git remote url>解析为（a）

----
> ## 关于npm install的 相关命令


`npm install`

在本地node_modules文件夹中安装依赖项。

在全局模式下（即，使用-g或--global附加到命令），它将当前包上下文（即，当前工作目录）安装为全局包。

默认情况下，npm install将安装列为依赖项的所有模块package.json。

使用--production标志（或NODE_ENV环境变量设置为production）时，npm将不会安装列出的模块 devDependencies。

注意：--production向项目添加依赖项时，该标志没有特别含义。

`npm install <folder>`

将包作为当前项目中的符号链接安装在目录中。它的依赖项将在链接之前安装。如果<folder>位于项目的根目录内，其依赖关系可能会node_modules像其他类型的依赖关系一样被提升到顶层。

----
> ## NPM install到底是做了什么？为什么有时候会报错？package.json？

> npm install ？必须存在一个配置文件，不然怎么去安装，安装到哪？


>不知你接触过git没，我举一个git的例子，看能不能对你有所帮助：


>当你在本地新建一个文件夹时，想把这个文件夹的东西放到github或者gitlab等上存起来怎么办？


> * 直接使用git add、git push之类的指令肯定不行，需要先初始化git， 也就是执行git init


> * 之后会在目录下生成一个隐藏的文件夹.git，里面就放置了一些这个项目的git配置信息，包括仓库地址、用户名、上传方式等等，当然这些配置信息可以修改


> *  npm也是同样的道理，没有初始化，它就不知道干嘛，程序的执行也就没有参照点，而这个参照点就是初始化之后出现的配置文件或者文件夹，或许这个文件夹或者文件是隐藏的，你看不见，但是不同的系统有不同的方式是可以看见的。

----
> ## NPM install安装的到底是什么东西？

上面已经讲到，install的是package，package有以下几种类型：包含package.json的包文件夹，包含包文件夹的tar包，解析为tar包的网址等常用package

----
> ## NPM install安装的包到底怎么用？

>* 如果是在`nodeJs`中，可以直接使用require进行引用该包[参考链接](https://www.jb51.net/article/158911.htm)
>* 如果是在