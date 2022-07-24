"use strict";
// 结合类的使用方法
class Student {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.fullName = name + ' ' + age;
    }
}
// 类型注解
function greeter({ name, age }) {
    console.log(`Hello ${name}, ${age} years old`);
}
greeter(new Student('zzz2', 123));
