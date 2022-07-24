// 描述：
// TypeScript的核心原则之一是对值所具有的结构进行类型检查
// 接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约
// 1. 初探
// js的demo，输出label
var myObj = { size: 10, label: 'This is label' };
function printLabel1(labelObj) {
    console.log(labelObj.label);
}
// 一般ts只检查是否有label，但有些时候却并不会这么宽松
printLabel1(myObj);
function printLabel2(labelObj) {
    console.log(labelObj.label);
}
printLabel2(myObj);
function createSquare(config) {
    var newSquare = { color: 'white', area: 100 };
    config.color && (newSquare.color = config.color);
    config.width && (newSquare.area = config.width * config.width);
    return newSquare;
}
console.log(createSquare({ width: 20 }));
var p1 = { x: 10, y: 10 };
p1.x = 100;
// 数组：ReadonlyArray<T>与Array<T>相似，只是把所有可变方法去掉了
var arr = [1, 2, 3, 4];
var ro = arr;
arr[4] = 100;
console.log(arr);
console.log(ro); // arr变化了，ro也会跟着变化
arr = ro; // 把一个ReadonlyArray赋值给一个普通数组是不行的
arr = ro; // 但可以用断言重写
// readonly与const对比
// 作为一个属性使用：用readonly
// 作为一个变量使用：用const
// 5. 额外的属性检查：对象字面量赋值给变量或者作为参数传递时，如果多了一个不在接口里面的属性test，会提示报错
createSquare({ width: 20, test: 'zzz' });
// 如何绕开这些检查呢？
// 5.1 最简便的是类型断言
createSquare({ width: 20, test: 'zzz' });
// 5.3 将对象字面量先赋值给一个变量，再作为参数传入，变量不会经过额外属性检查
var squareOptions = { width: 20, test: 'zzz' };
createSquare(squareOptions);
// 函数的形参名不需要与接口里定义的名称一样
// 指定参数类型
var mySearch2 = function (str1, keyword) {
    var result = str1.search(keyword);
    return result > -1;
};
// 不想指定类型也可以，ts的类型系统会腿短出参数类型（因为函数直接赋值给了SearchFunc类型变量）
// 返回值类型也可以不指定，类型检查器也能检测到
var mySearch1 = function (str1, keyword) {
    var result = str1.search(keyword);
    return result;
};
var myArray;
myArray = ["Bob", "Fred"];
var myStr = myArray[0];
console.log('myStr', myStr);
