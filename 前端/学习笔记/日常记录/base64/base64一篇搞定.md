@[TOC]( 对于前端工程师来说base64图片编码到底是个什么玩意？)
****
----

### 常见对base64的认知(不完全正确)

> 首先对base64常见的认知，也是须知的必须有以下几点*

* base64是一种图片编码方式，用一长串超长的字符串表示图片
* 在加载的时候会直接以字符串的形式加载出来，减少了图片加载的http请求
* 正常加载服务器静态资源的时候都应该是通过http请求回来，每加载一张图片时需要发起一次http请求 ，http请求建立需要一定的时间，所以对于小图而且出现频次比较高的话，这样的成本消耗其实是特别浪费的
* 所以一般base64编码适用于小图片，出现频次比较高的情况

> 当然base64编码也有一定的缺点

* 会增加图片本上的大小，对于小图来说，转码增加的大小和http请求发起的浪费时间相比还是划算的，但是对于大图和出现次数比较少的情况，这种方法就有待商榷
* 当然上面我现在项目这种问题就很不合适，肯定需要寻求一个好的方式来解决掉这个问题

----

### 多问一个为什么，base64到底是个啥？

* base64是一种编码方式，将二进制编码为64字符串组成的字符码
* 标准的Base64并不适合直接放在URL里传输，因为URL编码器会把标准Base64中的“/”和“+”字符变为形如“%XX”的形式，而这些“%”号在存入数据库时还需要再进行转换，因为ANSI SQL中已将“%”号用作通配符。
* 为解决此问题，可采用一种用于URL的改进Base64编码，它在末尾填充'='号，并将标准Base64中的“+”和“/”分别改成了“-”和“_”，这样就免去了在URL编解码和数据库存储时所要作的转换，避免了编码信息长度在此过程中的增加，并统一了数据库、表单等处对象标识符的格式。
* 另有一种用于正则表达式的改进Base64变种，它将“+”和“/”改成了“!”和“-”，因为“+”,“*”以及前面在IRCu中用到的“[”和“]”在正则表达式中都可能具有特殊含义。
* 此外还有一些变种，它们将“+/”改为“_-”或“._”（用作编程语言中的标识符名称）或“.-”（用于XML中的Nmtoken）甚至“_:”（用于XML中的Name）。
* Base64要求把每三个8Bit的字节转换为四个6Bit的字节（3*8 = 4*6 = 24），然后把6Bit再添两位高位0，组成四个8Bit的字节，也就是说，转换后的字符串理论上将要比原来的长1/3。

**ok，我承认以上都是百度出来了，接下来谈谈我自己的认识，哈哈**

直接掏个例子吧，比如，原生js是自带base64的编码方法的

```javascript
var b = Buffer.from('asdasds'); //buffer 是js里面专门存放二进制的缓存区，暂时理解创建一个二进制变量
var s = b.toString('base64');
console.log(s)
//  YXNkYXNkcw==
```

### 按照我们的思路实现一下
* base64是针对二进制对象进行编码，所以我们要将字符转换为二进制码
* base64 是用64个字符表示二进制，2的6次方 = 64，所以base64的字符其实是每6个二进制位为单位，但是一个字节是8bit，如果不满6的倍数要往 字节转换后的二进制编码后面补0，比如如果是两个个字符
'ac' =》 转换为二进制为：'0110 0001	0110 0010' =》
如果要将这两个字符进行base64编码，但是base64仅支持6位二进制转换为一个字符，
截取之后就是=》 011000   010110  0010  
那最后面的4位二进制不够转码，所以会在后面默认补零
* 补码完成之后开始转码 从000000 到111111分别对应`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`64个字符中的一个
* 转码完成
> 转换字符为二进制数



```javascript
function toBinary (str){
    let tempResult = [];
    let result = [];
    // 分割字符
    str.split('').forEach(element => {
    	//转二进制
        let binaryElement = element.charCodeAt().toString(2)
        //由于js原生方法转二进制如果前面是0可能会不满8位，所以前面补0，转为8位的对应ascii码二进制
        binaryElement = binaryElement.length === 8 ? binaryElement : ('0' + binaryElement)  //不足8位的二进制码在前面补0
        tempResult.push(binaryElement);
    });
    let index = 0;
    // 不满3个字符往后面补满3个字符（3个字符（24个二进制位）是6和8的最小公倍数）
    while(tempResult.length % 3 != 0){
        tempResult.push('00000000')
    }
    console.log(tempResult.length)
    return tempResult.join('');
}
let binary = toBinary('asdasds');
```


**那么就是第一步和第二步实现了**

> 二进制转 base64字符串



``` 
//将字符串存为数组
let KEYCODE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".split(''); 

function toBase64 (binary){
    console.log(binary);
    let tempResult = [];
    let result = [];
    let index = 0;
    // 每6位切割二进制
    while(index+6 < binary.length){
        tempResult.push(binary.slice(index,index+6))
        index = index + 6 ;
    }
    //不满6位的前面补0
    console.log(binary.slice(index,index+6))
    tempResult.push(("000000" + binary.slice(index,index+6)).substr( -6 ));
    tempResult.forEach(element => {
    	//将二进制转为数组下标
        let index = parseInt(element,2);
        //获取对应下标字符串
        result.push(index === 0 ? '=' : KEYCODE[index])
    });
    //字符串拼接
    return result.join('')
}
let a = toBase64(binary);
console.log(a);

//  YXNkYXNkcw==
```

### 到这里基本就实现了，结果跟原生的方法打印的是一样的
但是也存在一些问题和改进

* 对于中文字符和特殊字符的支持
	> javascript中的中文都是默认utf-16编码，但是网页中编码格式基本都是UTF-8,然而即便我们用UTF-8格式保存了HTML文件，但是其中的中文字符依然是以UTF-16的形式保存的。所以我们首先要将中文字符转化为utf-8，然后再转二进制，最后即可用上面的方法进行编码
	代码如下：

	```javascript
	var utf16ToUtf8 = function (utf16Str) {
    var utf8Arr = [];
    var byteSize = 0;
    var tempList = [];
    for (var i = 0; i < utf16Str.length; i++) {
        //获取字符Unicode码值
        var code = utf16Str.charCodeAt(i);

        //如果码值是1个字节的范围，则直接写入
        if (code >= 0x00 && code <= 0x7f) {
            byteSize += 1;
            utf8Arr.push(code);

            //如果码值是2个字节以上的范围，则按规则进行填充补码转换
        } else if (code >= 0x80 && code <= 0x7ff) {
            byteSize += 2;
            utf8Arr.push((192 | (31 & (code >> 6))));
            utf8Arr.push((128 | (63 & code)))
        } else if ((code >= 0x800 && code <= 0xd7ff)
            || (code >= 0xe000 && code <= 0xffff)) {
            byteSize += 3;
            utf8Arr.push((224 | (15 & (code >> 12))));
            utf8Arr.push((128 | (63 & (code >> 6))));
            utf8Arr.push((128 | (63 & code)))
        } else if(code >= 0x10000 && code <= 0x10ffff ){
            byteSize += 4;
            utf8Arr.push((240 | (7 & (code >> 18))));
            utf8Arr.push((128 | (63 & (code >> 12))));
            utf8Arr.push((128 | (63 & (code >> 6))));
            utf8Arr.push((128 | (63 & code)))
        }
    }
    var toBin = (n) => {
    if(n == 0) return '0';
        var res = '';  
        while(n != 0) {
            res = n % 2 + res
            n = parseInt(n / 2)
            }  
        return res;
    }
    utf8Arr.forEach(element => {
       tempList.push(toBin(element)) 
    });
    return tempList.join('')
    }
	```
* 如何对图片base64编码进行实现
	> 图片的话，要用到canvas ，将图片转换为二进制流，然后再掉用上述的编码方法

----
### 下一次
* 可以尝试图片的base64编码
* 可以做解码过程
