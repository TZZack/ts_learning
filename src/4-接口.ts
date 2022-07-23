// 1. 初探
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
interface SquareConfig {
    color?: string;
    width: number;
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
// 数组
let arr: number[] = [1,2,3,4];
let ro: ReadonlyArray<number> = arr;
arr[4] = 100;
console.log(arr);
console.log(ro);    // arr变化了，ro也会跟着变化
arr = ro;   // 把一个ReadonlyArray赋值给一个普通数组是不行的
arr = ro as number[]; // 但可以用断言
// readonly与const对比
// 作为一个属性使用：用readonly
// 作为一个变量使用：用const

// 5. 额外的属性检查：对象字面量赋值给变量或者作为参数传递时，如果多了一个不在接口里面的属性test，会提示报错
createSquare({width: 20, test: 'zzz'})
// 如何绕开这些检查呢？
// 5.1 最简便的是类型断言
createSquare({width: 20, test: 'zzz'} as SquareConfig);
// 5.2 最佳的方式是调价一个字符串索引签名，表示SquareConfig可以有任意数量的属性，但只会对color和width做类型检查
// interface SquareConfig {
//     color?: string;
//     width: number;
//     [propName: string]: any
// }
// 5.3 将对象字面量先赋值给一个变量，再作为参数传入，变量不会经过额外属性检查
let squareOptions = {width: 20, test: 'zzz'};
createSquare(squareOptions);
