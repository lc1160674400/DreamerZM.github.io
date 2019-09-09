console.log('Start Base64 learnign');

/*
base64编码原理 用64个有效字符 对二进制数据进行编码 
64位字符分别是  'A' -- 'Z'   26
               'a' -- 'z'   26
               '0' -- '9'   10
               '+'          1
               '/'          1
            = 64
由于 2^6 = 64,所以base64编码对6位二进制数据有着极简单的编码方式，但是一般字符编码都是8bit一个字符，所以一般都需要找6bit和8bit的最小公倍数
*/

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

function toBinary (str){
    let tempResult = [];
    let result = [];
    str.split('').forEach(element => {
        let binaryElement = element.charCodeAt().toString(2)
        binaryElement = binaryElement.length === 8 ? binaryElement : ('0' + binaryElement)  //不足8位的二进制码在前面补0
        tempResult.push(binaryElement);
    });
    let index = 0;
    while(tempResult.length % 3 != 0){
        tempResult.push('00000000')
    }
    return tempResult.join('');
}
// let binary = toBinary();
let binary = utf16ToUtf8('中文');


let KEYCODE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".split(''); 

function toBase64 (binary){
    // console.log(binary);
    let tempResult = [];
    let result = [];
    let index = 0;
    // 每6位切割二进制
    while(index+6 < binary.length){
        tempResult.push(binary.slice(index,index+6))
        index = index + 6 ;
    }
    //不满6位的前面补0
    // console.log(binary.slice(index,index+6))
    tempResult.push(("000000" + binary.slice(index,index+6)).substr( -6 ));
    tempResult.forEach(element => {
        let index = parseInt(element,2);
        result.push(index === 0 ? '=' : KEYCODE[index])
    });
    return result.join('')
}
let a = toBase64(binary);
console.log(a);


var b = Buffer.from('中文');
var s = b.toString('base64');
console.log(s)