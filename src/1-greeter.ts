// 结合类的使用方法
class Student {
    fullName: string;
    constructor (public name:string, public age:number) {
        this.fullName = name + ' ' + age;
    }
}

// 接口
interface Person {
    name: string;
    age: number;
}

// 类型注解
function greeter ({name, age}: Person) {
    console.log(`Hello ${name}, ${age} years old`);
}

greeter(new Student('zzz2', 123));