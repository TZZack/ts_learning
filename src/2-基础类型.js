"use strict";
// 1 布尔
let isBoolean = false;
// 2 数字
let num = 6;
// 3 字符串
const str = 'test';
// 4.1 数组
let list;
list = [1, 2, 3];
// 4.2 数组：数组泛型的方式
const list2 = [1, 2];
const list3 = ['123', '234'];
// 5 元组：元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
let tuple1;
tuple1 = ['123', 234];
// 当访问一个越界元素时，会使用联合类型替代
// 但实际开发不允许越界，会出现不可预估的错误，这里也有提示，tsc编译时也会报错
tuple1[3] = 123;
tuple1[4] = undefined;
// 6 枚举：谁ts对js标准数据类型的补充
// 没有赋值则从0开始，中间有赋值，后面从中间开始计数
// 如果是非数字，则需要每个都定值
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 4] = "Green";
    Color[Color["Blue"] = 5] = "Blue";
})(Color || (Color = {}));
let c = Color.Red;
console.log(c);
// 7. Any：任意类型
// 有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。
// 这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。这种情况下，
// 我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查
let notSure = 4;
notSure = 'test';
notSure = true;
// 声明一个包含不同类型数据的数组
const list4 = ['1', 2, true];
// 8. void：没有任何类型，即函数没有返回值
function warnUser() {
    console.log('This is my country');
}
warnUser();
// 声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null
// 9. Null和undefined
// 分别是js中null和undefined的类型，和void相似，用处不是很大
// 默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量。
// 然而，当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自（一般都是开启严格模式的）
const testNull = null;
// 10. Never：表示永不存在值的类型
// never类型是任何类型的子类型，也可以赋值给任何类型
// 10.1 返回never的函数必须存在无法打到的终点
function error(message) {
    throw new Error(message);
}
// 10.2 推断的返回值类型为never
function fail() {
    return error('error');
}
// 10.3 返回never的函数必须存在无法达到的终点
function infiniteLoop() {
    while (true) {
    }
}
create({ prop: 0 }); // OK
create(42); // Error
create(null);
// 12. 类型断言：告诉编译器我知道是什么类型（在使用一个不知道类型的变量时，能确定并告诉编译器是啥）
// 没有运行时的影响，只是在编译阶段起作用
// 类型断言有两种方法：
// 12.1 尖括号
let someValue = 'This is a string';
let strLen = someValue.length;
// 12.2 as语法（jsx里只支持as语法）
let strLen2 = someValue.length;
console.log('strLen', strLen, strLen2);
