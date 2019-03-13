// 按词法作用域分


// var   /   let,const


// var 会定义变量提升到最近的函数执行上下文或者全局上下文window


// let 定义变量的时候会直接在最近的块级上下文

// var l1 = [2,4,3]
// var l2 = [5,6,4]
// var addTwoNumbers = function(l1, l2) {
//     var num = [];
//     var desc = 0;
//     for(var index=0;index<ls1.length;index++){
//         var temp = l1[index]+l2[index];
//         var base = desc==0?temp%10:temp%10+desc;
//         num[index]=base
//         desc = temp/10 == 1?1:0;
//     }
//     return num
    
// };
// console.log(addTwoNumbers(l1,l2))

// var a = 'aA'
// var b = 'aAAbbbb'
// var numJewelsInStones = function(J, S) {
//     var result = 0
//     Object.keys(J).forEach((index)=>{
//         console.log(S.split(J[index]))
//         result += S.split(J[index]).length
//     })
//     return result
// };
// console.log(numJewelsInStones(a,b))



// function Foo() {
//     getName = function () { console.log (1); };
//     return this;
// }
// // Foo.getName = function () { console.log (2);};
Naa.prototype.getName = function () { console.log (3);};
// // var getName = function () { console.log (4);};
// // function getName() { console.log (5);}

// // //请写出以下输出结果：
// // Foo.getName();
// // getName();
// // Foo().getName();
// // getName();
// // new Foo.getName();
// // new Foo().getName();

// function getName(){
//     console.log(2)
// }

// new Foo.getName()


// new Test()

// Test = Foo.getName()

// function Naa(){
//     console.log(2)
//     return {}
// }

// console.log(new Naa().getName())

// new  Foo=> 构造函数 =》把函数当作构造函数 =》 先创建空对象{} =》this指向空对象=》this.test = 2 =》返回这个对象

// Foo => 跳进函数上下文









               