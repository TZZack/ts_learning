// 1. 初探
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
// 数组
var arr = [1, 2, 3, 4];
var ro = arr;
arr[4] = 100;
console.log(arr);
console.log(ro);
