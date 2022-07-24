// 描述：
// TypeScript的核心原则之一是对值所具有的结构进行类型检查
// 接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约

// 1. 初探
// js的demo，输出label
const myObj = {size: 10, label: 'This is label'};
function printLabel1(labelObj: {label: string}) {
    console.log(labelObj.label);
}
// 一般ts只检查是否有label，但有些时候却并不会这么宽松
printLabel1(myObj);

// 2. 用接口重写
interface LabelValue {
    label: string;
}
function printLabel2(labelObj: LabelValue) {
    console.log(labelObj.label);
}
printLabel2(myObj);

// 3. 可选属性: 不一定会有这个属性
// 好处：预定义、捕获引用了不存在的属性时的错误
// option bags模式的例子如下：
interface SquareConfig {
    color?: string;
    width?: number;
}
function createSquare(config: SquareConfig): {color: string, area: number} {
    let newSquare = {color: 'white', area: 100};
    config.color && (newSquare.color = config.color);
    config.width && (newSquare.area = config.width * config.width);
    return newSquare;
}
console.log(createSquare({width: 20}));

// 4. 只读属性：一些属性只能在对象初始化的时候修改值
interface Point {
    readonly x: number;
    readonly y: number;
}
let p1: Point = {x: 10, y: 10};
p1.x = 100;
// 数组：ReadonlyArray<T>与Array<T>相似，只是把所有可变方法去掉了
let arr: number[] = [1,2,3,4];
let ro: ReadonlyArray<number> = arr;
arr[4] = 100;
console.log(arr);
console.log(ro);    // arr变化了，ro也会跟着变化
arr = ro;   // 把一个ReadonlyArray赋值给一个普通数组是不行的
arr = ro as number[]; // 但可以用断言重写
// readonly与const对比
// 作为一个属性使用：用readonly
// 作为一个变量使用：用const

// 5. 额外的属性检查：对象字面量赋值给变量或者作为参数传递时，如果多了一个不在接口里面的属性test，会提示报错
createSquare({width: 20, test: 'zzz'})
// 如何绕开这些检查呢？
// 5.1 最简便的是类型断言
createSquare({width: 20, test: 'zzz'} as SquareConfig);
// 5.2 最佳的方式是添加一个字符串索引签名，表示SquareConfig可以有任意数量的属性，但只会对color和width做类型检查
interface SquareConfig1 {
    color?: string;
    width: number;
    [propName: string]: any
}
// 5.3 将对象字面量先赋值给一个变量，再作为参数传入，变量不会经过额外属性检查
let squareOptions = {width: 20, test: 'zzz'};
createSquare(squareOptions);

// 6. 函数类型
// 描述：接口能够描述JavaScript中对象拥有的各种各样的外形。 除了描述带有属性的普通对象外，接口也可以描述函数类型
interface SearchFunc {
    (str: string, keyword: string): boolean; // 函数的调用签名
}
// 函数的形参名不需要与接口里定义的名称一样
// 指定参数类型
let mySearch2: SearchFunc = function (str1: string, keyword: string): boolean {
    let result = str1.search(keyword);
    return result > -1;
}
// 不想指定类型也可以，ts的类型系统会腿短出参数类型（因为函数直接赋值给了SearchFunc类型变量）
// 返回值类型也可以不指定，类型检查器也能检测到
let mySearch1: SearchFunc = function (str1, keyword) {
    let result = str1.search(keyword);
    return result;
}

// 7. 可索引的类型
// ts支持两种索引签名：字符串和数字，
// 7.1 普通的demo，这个接口具有索引签名
interface StringArray {
    [index: number]: string;
}
let myArray: StringArray;
myArray = ['zzz', 'ack'];
let myStr: string = myArray[0];
console.log('myStr', myStr);
// 7.2 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型(因为js会把数字转为字符串去索引)，索引两者需要保持一致
interface Animal {
    name: string;
}
interface Dog extends Animal {
    breed: string;
}
// Error
interface NotOkay {
    [key: number]: Animal;
    [key: string]: Dog;
}
// OK
interface Okay {
    [key: number]: Dog;
    [key: string]: Animal;
}
// 7.3 字符串索引签名能够很好描述dictionary模式，并且它们也会确保所有属性与其返回值类型相匹配
interface NumberDictionary {
    [index: string]: number;
    length: number;    // 可以，length是number类型
    name: string       // 错误，name的返回值类型与索引类型返回值的类型不匹配
}
// 7.4 将索引签名设置为只读，防止给索引赋值
interface ReadonlyStringArray {
    readonly [index: number]: string
}
let myArr74: ReadonlyStringArray = ['a,', 'b'];
myArr74[1] = '123';

// 6. 类类型
