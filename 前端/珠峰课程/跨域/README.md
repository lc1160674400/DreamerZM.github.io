> ## 跨域问题

协议  域名  端口 = 同域

三个只要有一个跟别人不一样，则是跨域

> ## 为什么浏览器不支持跨域

cookie LocalStorage DOM元素也不允许跨域

> ## 实现跨域

- jsonp     
```javascript
//将跨域请求封装到一个script标签内容中
```
- cors      
```javascript
//在后端中间件中配置允许跨域的头部，可以设置白名单设置头部，等等
```

- postMessage

```javascript
//为了解决iframe跨域的问题
    //在主窗口中
    function load(){
        //获取iframe
        let frame = document.getElementById('frame');
        //在iframe 窗体下传递信息
        frame.contentWindow.postMessage('我爱你','http://localhost:4000');

        window.onmessage = function(e){
            console.log(e.dataa)
        }
    }
    //在iframe里面

    //ifame里面接受信息
    window.onmessage = function(e){
        console.log(e.data)


        //iframe发送信息
        e.source.postMessage('我不爱你')
    }

```

- document.domain 子域和父域的
```javascript
    //解决子域名跨域，使用在域名跨域的情况下
    //在两个页面中设置相同的domain
    //要求：必须两个页面为父子域名关系
```


- window.name
```javascript
    //a和b是同域的两个html
    //c是独立的另一个域的html
    //现在想要在a获取c的数据


    //a先引用c，c把值放到window.name,把a引用的地址改到b
    //在a和b同源的前提下，获取window的name属性即可实现iframe的通信
```

- location.hash

```javascript
    //路径后面的hash值可以用来通信
    //a和b是同域的两个html
    //c是独立的另一个域的html
    //target:现在想要在a获取c的数据



```

- http-proxy  代理

- nginx 后台配置允许跨域头，或者是使用nginx转发（代理）
```javascript
    //1.安装本地nginx

    //2.修改配置文件

    //3.在跨域请求的配置行配置：
    add_header "Access-Control-Allow-Origin" "*";
    // 跟cors一样，配置各种头部
```



- websocket 页面之间的通信

```javascript
    //通过websocket 进行通信,原生自带的websocket对象，缺点，兼容性不好
    var socket = new WebSocket('ws://localhost:3000')
    socket.onopen = function(){
        socket.send('我爱你')
    }

    socket.onmessage = function(e){
        console.log(e.data)
    }
```

