// 1 布尔
let isBoolean: boolean = false;

// 2 数字
let num: number = 6;

// 3 字符串
const str: string = 'test';

// 4.1 数组
let list: number[];
list = [1,2,3];
// 4.2 数组：数组泛型的方式
const list2: Array<number> = [1,2];
const list3: Array<string> = ['123', '234'];

// 5 元组：元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
let tuple1: [string, number];
tuple1 = ['123', 234];
// 当访问一个越界元素时，会使用联合类型替代
// 但实际开发不允许越界，会出现不可预估的错误，这里也有提示，tsc编译时也会报错
tuple1[3] = 123;
tuple1[4] = undefined;

// 6 枚举：谁ts对js标准数据类型的补充
// 没有赋值则从0开始，中间有赋值，后面从中间开始计数
// 如果是非数字，则需要每个都定值
enum Color {
    Red,
    Green = 4,
    Blue
}
let c: Color = Color.Red;
console.log(c);

// 7. Any：任意类型
// 有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。
// 这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。这种情况下，
// 我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查
let notSure: any = 4;
notSure = 'test';
notSure = true;

// 8. void：没有任何类型，即函数没有返回值
function warnUser(): void {
    console.log('This is my country');
}
warnUser();
// 声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null

// 9. Null和undefined
// 分别是js中null和undefined的类型，和void相似，用处不是很大
// 默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量。
// 然而，当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自（一般都是开启严格模式的）

// 10. Never：表示永不存在值的类型
// never类型是任何类型的子类型，也可以赋值给任何类型
// 10.1 返回never的函数必须存在无法打到的终点
function error(message: string): never {
    throw new Error(message);
}
// 10.2 推断的返回值类型为never
function fail(): never {
    return error('error');
}
// 10.3 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
        
    }
}

// 11. Object：表示非原始类型（除number、string、boolean、symbol、null或undefined之外的类型）
// declare function create(o: object | null): void;
// create({ prop: 0 }); // OK
// create(42); // Error

// 12. 类型断言：告诉编译器我知道是什么类型
// 12.1 尖括号
let someValue: any = 'test';
let strLen: number = (<string>someValue).length;
// 12.2 as语法（jsx里只支持as语法）
let strLen2: number = (someValue as string).length;
console.log('strLen', strLen, strLen2);
