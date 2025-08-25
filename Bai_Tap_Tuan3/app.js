// let message:string = 'Hello World!';
// console.log(message);
// //VD: 
// let names:string = 'John';
// let age:number = 25;
// let active:boolean = true;
// let namess:string[] = ['John', 'Jane', 'Peter']
// let person:{name:string; age:number};
// //Array Typescript
// let nam:string[] = ['John', 'Jane', 'Peter'];
// let series = [1, 2, 3];
// let doubleIt = series.map(e => e * 2);
// console.log(doubleIt);
// console.log(typeof series); // Object
// console.log(series instanceof Array) // True
// let scores : (string | number)[];
// scores = ['Programing', 5, 'Sofeware Design', 4]
// console.log(scores)
// //Enum Typescript
// enum Month {Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec};
// function isItSummer(month:Month){
//     let isSummer:boolean;
//     switch(month){
//         case Month.Feb:
//         case Month.Mar:
//         case Month.Apr:
//         case Month.May:
//         case Month.Jun:
//         case Month.Jul:
//         case Month.Aug:
//         case Month.Sep:
//         case Month.Oct:
//         case Month.Nov:
//         case Month.Dec:
//             isSummer = true;
//             break;
//         default:isSummer = false; break;
//     }
//     return isSummer;
// }
// //Void, Any TypeScript
// //Kieu Void
// function log(message): void {
//     console.log(message);
// }
// //Kieu Any
// const json = `{"latitude": 10.11, "longitude": 12.12}`
// //Parse JSON to find location
// const currentLocation = JSON.parse(json);
// console.log(currentLocation);
// let result:any;
// result = 10.123;
// console.log(result.toFixed());
// function getNetPrice(price: number, discount: number, format: boolean): number | string {
//   let netPrice = price - price * discount;
//   return format ? `$${netPrice.toFixed(2)}` : 'a';
// }
// let netPrice = getNetPrice(100, 0.05, false) as string;
// console.log(netPrice)
// console.log(typeof netPrice)
// console.log(netPrice.toUpperCase())
// let value: any = 123;
// let str = value as string;
// console.log(str.toUpperCase());
// let value: any = 123;
// value = "hello";
// value = true;
// console.log(value.toUpperCase());
//Unknown
// let value: unknown;
// value = 123;
// value = "hello";
// value = {x : 10}
// console.log(value.toUpperCase())
//Phai kiem tra type truoc khi dung cac ham khi su dung unknown 
// let value: unknown = "hello";
// if(typeof value === "string"){
//     console.log(value.toUpperCase()); 
// }
// if(typeof value === "number"){
//     console.log(value.toFixed(2))
// }
//Vi du parse JSON tu API 
// function parseData(json: string): unknown {
//     return JSON.parse(json); // co the tra ve bat cu kieu gi
// }
// let data = parseData('{"name": "Alice"}');
// // console.log(data.name); // Khong the truy cap truc tiep
// //Phai kiem tra truoc 
// if(typeof data === "object" && data !== null && "name" in data){
//     console.log((data as any).name);
// }
/*  - Interface trong TypeScript dung de dinh nghia cau truc
    cua mot object(nos giong nhu "ban hop dong") mp ta object phai co
    nhung thuoc tinh gi, kieu du lieu ra sao
    - Khong sinh ra code that khi bien dich, chi ton tai de Typescript kiem tra kieu
 */
/*
     - Interface = dinh nghia cau truc (object, class, function)
     - Giup code de doc, de bao tri va tranh bug khi lam viec voi nhieu object
*/
//Vi du 
// interface Person {
//     name: string;
//     age: number;
// }
// let user : Person = {
//     name: "Alice",
//     age: 12
// }
// console.log(user.name);
/*
  Thuoc tinh tuy chon
*/
// interface Person {
//     name: string;
//     age?: number; // co the co hoac khong 
// }
// let p1 : Person = {
//     name: "Alice",
//     age: 12
// }
// let p2:Person = {name : "Carol"}
// console.log(p2.name);
//Thuoc tinh chi doc readonly
// interface Car {
//     readonly brand: string;
//     year: number;
// }
// let car: Car = {brand: "Toyota", year: 2024};
// car.year = 2025;
// car.brand = "BMW"; // Error: Cannot assign to 'brand' because it is a read-only
// console.log(car)
//Interface cho ham
// interface Add{
//     (a: number, b: number): number;
// }
// let sum: Add = (x ,y) => x + y;
// console.log(sum(5, 10));
//Interface cho class
// interface Animal {
//   name: string;
//   makeSound(): void;
// }
// class Dog implements Animal {
//   name: string;
//   constructor(name: string) {
//     this.name = name;
//   }
//   makeSound(): void {
//     console.log("Woof!");
//   }
// }
// let dog = new Dog("Buddy");
// dog.makeSound();
// interface A {
//     x : number;
// }
// interface B extends A {
//     y : number;
// }
// let point: B = {x : 10, y : 20};
//Default parameters va Rest trong Typescript
/*
    - Có thể gán giá trị mặc định cho tham số của hàm
    - Nếu khi gọi hàm mà không truyền giá trị -> nó sẽ lấy giá trị mặc định
*/
// function great(name: string = "Guest") : void {
//     console.log(`Hello, ${name}`);
// }
// great();
// great("Alice");
//Rest Parameters cho phep mot ham chap nhat khong hoac nhieu doi so cua kieu duoc chi dinh
/*
  - Dung de gon nhom nhieu tham so vao thanh mot mang
  - Mot ham chi co mot rest parameter
  - Rest parameter xuat hien o cuoi danh sach cua tham so
  - Cu phap ... tenthamSo: kieu[]
*/
//VD: 
// function sum(...numbers: number[]) : number {
//     return numbers.reduce((total, number) => total + number, 0);
// }
// console.log(sum(1, 2, 3));
// console.log(sum(5, 10, 15, 20));
//Function trong TypeScript - Function declaration
// function add(a: number, b: number): number{
//     return a + b;
// }
// console.log(add(5, 3));
// // -- Su dung voi Arrow function(mũi tên(=>) xuất hiện giữa các tham số và kiểu trả về.)
// // let add3 = (x : number, y : number): number => {return x + y;}
// // let add4 = (x : number, y: number) => {return x + y};
// let add6: (a: number, b: number) => number = function (x: number, y: number) {
// return x + y; };
// // 2. Function expression
// let add2: (a: number, b: number) => number = function (x, y) {
//   return x + y;
// };
// // 3. Arrow function
// let add3: (a: number, b: number) => number = (x, y) => x + y;
//Function Overloadings trong TypeScript
/*
    - Dinh nghia nhieu kieu tham so va kiêu tra ve cho cung mot ham
*/
function addNumbers(a, b) { return a + b; }
;
function addStrings(a, b) {
    return a + b;
}
console.log(addStrings("a", "b"));
