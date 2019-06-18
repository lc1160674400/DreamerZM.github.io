# Typescript 类

----

*传统的JavaScript程序使用函数和基于原型的继承来创建可重用的组件，但对于熟悉使用面向对象方式的程序员来讲就有些棘手，因为他们用的是基于类的继承并且对象是由类构建出来的。 从ECMAScript 2015，也就是ECMAScript 6开始，JavaScript程序员将能够使用基于类的面向对象的方式。 使用TypeScript，我们允许开发者现在就使用这些特性，并且编译后的JavaScript可以在所有主流浏览器和平台上运行，而不需要等到下个JavaScript版本。*

----



> ## 基础用法

```typescript

    
class Greeter {                 //定义一个类
    greeting: string;           //指定实例化参数类型
    constructor(message: string) {      //构造函数
        this.greeting = message;    //实例属性
    }
    greet() {       //原型方法
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");
```

> ## 继承

```typescript
class Animal {          //定义了一个父类（超类）
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}

class Dog extends Animal {          //子类（派生类）
    bark() {            //重写了父类的方法
        console.log('Woof! Woof!');
    }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();



// --------------------更复杂的例子---------------------------------
class Animal {          //父类
    name: string;           //声明了一个实例化参数
    constructor(theName: string) { this.name = theName; }           //构造函数，实例拥有theName属性
    move(distanceInMeters: number = 0) {        //父类方法
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {            //子类1，
    constructor(name: string) { super(name); }          //构造函数是父类的构造函数
    move(distanceInMeters = 5) {        //重写父类的方法
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);
```

> ## 公有，私有，受保护的修饰符

* ### 默认为public（公开）

* ### private 私有的，不能在声明他的类的外部访问,只有在当前类的内部被访问，类内部访问，所有的派生类和其他地方都无法访问

* ### protect 受保护的，跟private很像，但是能在派生类里被使用，外部仍然无法访问，可以在当前类，和当前类的派生类内部被访问

> ## readonly 只读修饰符

> ## get和set方法（存取器）

*想使用get/set方法必须将编译器设置为es5或者更高。如果只有get的没有set的存取器会被自动推断为readonly*

```typescript
let passcode = "secret passcode";

class Employee {
    private _fullName: string;          //设置私有变量

    get fullName(): string {
        return this._fullName;          //只能通过内部get和set方法进行访问和修改
    }

    set fullName(newName: string) {     //并且可以再操作之前进行逻辑处理
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    alert(employee.fullName);
}
```

> ## 静态属性 static（只有类能访问到，实例不能访问）

```typescript
class Grid {
    static origin = {x: 0, y: 0};       //定义了一个静态属性，只有Grid类可以访问到，所有实例对象无法使用
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor (public scale: number) { }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));
```

> ## 抽象类 absract

*抽象类一般不会被实例化，而是一般用来做其他类的基类使用，用来封装和限定一些成员的实现细节*

*抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。 抽象方法的语法与接口方法相似。 两者都是定义方法签名但不包含方法体。 然而，抽象方法必须包含 abstract关键字并且可以包含访问修饰符。*



> ## *构造函数*

```typescript
class Greeter {
    //定义一个类
    static standardGreeting = "Hello, there";
    //静态方法
    greeting: string;
    //声明原型属性
    greet() {
        if (this.greeting) {
            return "Hello, " + this.greeting;
        }
        else {
            return Greeter.standardGreeting;
        }
    }
}

let greeter1: Greeter;
//指明实例对象类型
greeter1 = new Greeter();
//实例化过程
console.log(greeter1.greet());
//能正常调用实例方法

let greeterMaker: typeof Greeter = Greeter;
//这句话可以分解为两步
// let greeterMaker: typeof Greeter
// 指明greeterMaker的类型为 Greeter类的类型也就是构造函数的类型
// greeterMaker = Greeter
// 将Greeter赋值给greeterMaker
greeterMaker.standardGreeting = "Hey there!";
//可以访问构造函数的静态成员

let greeter2: Greeter = new greeterMaker();
//可以调用构造函数
console.log(greeter2.greet());

```

> ## *把接口当作类使用*

```typescript
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    //接口可以继承类，并且拥有类的所有属性，继承属性的接口类型
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```


----

# 类型推论

*在ts里，如果没有指定类型，编译器会根据一些规则自动推断类型*

> ## 规则1：赋值符右侧类型自动推论

例如：`let i =3`

> ## 规则2：最佳通用类型：少数服从多数

例如： `let x= [0,1,null]`

## *如果所有元素数量一样，则是个各种类型组合的`联合类型`*

> ## 规则3：上下文原则

*通常包含函数的参数，赋值表达式的右边，类型断言，对象成员和数组字面量和返回值语句。 上下文类型也会做为最佳通用类型的候选类型。比如：*

----
# 类型兼容性

ts在类型检测的时候也不是那么的严格，只要满足该接口或者该类型的定义，父类或者相关类型都可以通过该检测

*如果x要兼容y，那么y至少具有与x相同的属性*

----

# 高级类型

----

> ## 交叉类型（混入）

将多个类的所有属性相加，相同属性默认保留第一个，关键字`&`

```typescript
function extend<T, U>(first: T, second: U): T & U {
    //类似mixin 创建一个混入方法，将参数first和second分别表示为两个泛型T,U
    //返回值是一个T&U的交叉类型
    let result = <T & U>{};
    //创建一个空的交叉类型
    for (let id in first) {
        //将第一个类的所有属性和方法添加到交叉类型
        (<any>result)[id] = (<any>first)[id];
    }
    for (let id in second) {
        //将第二个类所有的方法和属性添加到交叉类型
        if (!result.hasOwnProperty(id)) {
            (<any>result)[id] = (<any>second)[id];
        }
    }
    //返回这个交叉类型，同时拥有了first 和 second两个类型的所有属性
    return result;
}

class Person {
    constructor(public name: string) { }
}
interface Loggable {
    log(): void;
}
class ConsoleLogger implements Loggable {
    log() {
        // ...
    }
}
var jim = extend(new Person("Jim"), new ConsoleLogger());
var n = jim.name;
jim.log();
```

> ## 联合类型（或者类型）

多个类型中，只要满足任意一个类型的一种类型

```typescript
function padLeft(value: string, padding: string | number) {
    // ...
}

let indentedString = padLeft("Hello world", true); // errors during compilation
//所以在调用该方法的时候，padding参数的类型可以是string也可以是nunber
```
## *需要注意一点！联合类型在一次调用之后就会变成多个可选类型中的确定类型，不可改变，也不是同时拥有两种类型*

```typescript
interface Bird {
    fly();
    layEggs();
}

interface Fish {
    swim();
    layEggs();
}

function getSmallPet(): Fish | Bird {
    //返回值是一个联合类型，可以是Fish也可以是Bird
    // ...
}

let pet = getSmallPet();
pet.layEggs(); // okay
//但是当调用过bird的方法之后，就不能调用fish的方法，相当于已经确定了类型了
pet.swim();    // errors
```

> ## 类型保护
*对于联合类型，需要进行具体的类型判断*



```typescript

// 方法一：ts自带的类型保护语法
let pet = getSmallPet();

if ((<Fish>pet).swim) {
    //判断类型是否有fish的方法
    (<Fish>pet).swim();
}
else {
    (<Bird>pet).fly();
}

//方法二：自定义类型保护
function isFish(pet: Fish | Bird): pet is Fish {
    //关键字 xxx is XXXX 在返回值类型定义的时候定义一个类型保护的语句
    return (<Fish>pet).swim !== undefined;
}

//方法三：js的typeof

function padLeft(value: string, padding: string | number) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

//方法四：instanceof

```

> ## null 和 undefined
*默认情况：类型检查器认为null和undefined可以赋值给所有其他任何类型*

*可以通过编译配置，设置null和undefined的不同编译模式*


> ## 类型别名
类型别名会给一个类型起个新名字。 类型别名有时和接口很像，但是可以作用于原始值，联合类型，元组以及其它任何你需要手写的类型。
```typescript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
//将联合类型设置别名
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    }
    else {
        return n();
    }
}
```

> ## 接口和类型的比较

* 接口是开辟了一块新的内存空间用来存储对象的引用，其地址也可以作为其他地方的参数和引用，而别名只是一个新的命名，仍然是其本身

* 别名只是一个别名属性，不能作为继承和implement的模板

> ## 字符串字面量类型
`关键字：   string1 | string2 | string3`

*固定字符串值的集合类型，写死的静态字符串值的集合类型*

```typescript
//定义了一个字符串字面量类型，由三个字符串组成
type Easing = "ease-in" | "ease-out" | "ease-in-out";
class UIElement {
    animate(dx: number, dy: number, easing: Easing) {
        if (easing === "ease-in") {
            // ...
        }
        else if (easing === "ease-out") {
        }
        else if (easing === "ease-in-out") {
        }
        else {
            // error! should not pass null or undefined.
        }
    }
}

let button = new UIElement();
button.animate(0, 0, "ease-in");
button.animate(0, 0, "uneasy"); // error: "uneasy" is not allowed here
```

> ## 数字字面量类型

关键字 `number1 | number2 | number3`

> ## 枚举成员类型

> ## 可联合识别（接口的'或'组合）

```typescript
interface Square {
    kind: "square";
    size: number;
}
interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}
interface Circle {
    kind: "circle";
    radius: number;
}
// 定义一个联合识别
type Shape = Square | Rectangle | Circle;
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
}
```