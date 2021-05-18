/**
 * with延长作用域链
 */
// var o = [1,2,3];

// console.log(o instanceof Array);
// console.log(o instanceof RegExp);

// function fan() {
//     var qs = 'pieach';
//     console.log(url);
//     var x = {name:'pp',age:33}
//     with(x) {
//         var url = qs+x.name;
//     }
    
// }
// fan()

/**
 * 函数提升
 */
// console.log(sum(10));
// function sum(num1, num2) {
//     console.log(arguments[1])
//     console.log(arguments.length)
//     return num1+num2;
// }

/**
 * 
 */
// function Person() {

// };

// var person = new Person();

// person.name = 'hello';
// person.age = 88;
// Person.prototype.height = 10;

// console.log(person);
// console.log(Object.keys(Person.prototype))
// console.log(Object.getOwnPropertyNames(Person.prototype))
// console.log(Object.getOwnPropertyDescriptor(person, "name"))

// console.log(Number(null)); // 只有他是0，parseInt都是NaN

// const a = 20;

// if (true) {
//     const a = 10;
//     console.log(a);
// }
// console.log(a)

// var x = 1,
//     y = z = 0;

// function add (n) {
//   return n = n + 1;
// }

// y = add(x);
// function add (n) {
//   return n = n + 3;
// }

// z = add(x)
// console.log(z)

// function fn(a){
//     console.log(a);
//     var a = 123;
//     console.log(a);
    
//     function a(){};
//     console.log(a);
    
//     var b = function(){};
//     console.log(b);
    
//     function d(){};
//  }
 
//  //调用函数
//  console.log(fn(1));

var arr = [2,0,2,1,1,0]

var Quicksort = function(num) {
    if (num.length <= 1) return num;

    var idx = Math.floor(num.length/2);
    var pivot = num.splice(idx, 1)[0];
    var left = [];
    var right = [];

    for (var i = 0; i < num.length; i++) {
        if (num[i] < pivot) {
            left.push(num[i]);
        } else {
            right.push(num[i]);
        }
    }
    return Quicksort(left).concat([pivot], Quicksort(right));
}

console.log(Quicksort(arr));

// function merge(leftArr, rightArr) {
//     var result = [];

//     while (leftArr.length > 0 && rightArr.length > 0) {
//         if (leftArr[0] < rightArr[0]) {
//             result.push(leftArr.shift());
//         } else {
//             result.push(rightArr.shift());
//         }
//     }
//     return result.concat(leftArr).concat(rightArr);
// }

// function mergeSort(arr) {
//     if (arr.length == 1) return arr;
//     var middle = Math.floor(arr.length/2);
//     var left = arr.slice(0,middle);
//     var right = arr.slice(middle);

//     return merge(mergeSort(left), mergeSort(right));
// }

// console.log(mergeSort(arr));

// console.log(Number(undefined))
// console.log(Number(null))
// console.log(Number(NaN))

// console.log(parseInt(undefined))
// console.log(parseInt(null))
// console.log(parseInt(NaN))

var ip = '219.239.110.138'

// console.log(toIp(ip));
// function ip2int(ip) 
// {
//     var num = 0;
//     ip = ip.split(".");
//     num = Number(ip[0]) * 256 * 256 * 256 + Number(ip[1]) * 256 * 256 + Number(ip[2]) * 256 + Number(ip[3]);
//     num = num >>> 0;
//     return num;
// }
// console.log(ip2int(ip));
// function numberToIp(number) {    
//     var ip = "";
//     if(number <= 0) {
//     	return ip;
//     }
//     var ip3 = (number << 0 ) >>> 24;
//     var ip2 = (number << 8 ) >>> 24;
//     var ip1 = (number << 16) >>> 24;
//     var ip0 = (number << 24) >>> 24
    
//     ip += ip3 + "." + ip2 + "." + ip1 + "." + ip0;
    
//     return ip;   
// }

// 闭包
// var A = (function(){
//     var index = 1;
//     function f(){
//         if(index % 2 == 1){
//         console.log(1);
//         }else{
//         console.log(2);
//         }
//         index++;
//     }
//     return f
// })()

// A();//1
// A();//2
// A();//1

// 节流
// function throttle(fn, delay) {
//     var prev = Date.now();
//     return function() {
//         var context = this;
//         var args = arguments;
//         var now = Date.now();
//         if (now - prev >= delay) {
//             fn.apply(context, args);
//             prev = Date.now();
//         }
//     }
// }

// // 防抖
// function debounce(fn, delay) {
//     var timer = null;
//     return function() {
//         let context = this;
//         let args = arguments;
//         clearTimeout(timer);
//         timer = setTimeout(function() {
//             fn.apply(context, args);
//         },delay);
//     }
// }

// 闭包
// var name = "The Window";

// 　　var object = {
// 　　　　name : "My Object",

// 　　　　getNameFunc : function(){
// 　　　　　　return function(){
// 　　　　　　　　return this.name;
// 　　　　　　};

// 　　　　}

// 　　};

// console.log(object.getNameFunc()());

// var name = "The Window";

// 　　var object = {
// 　　　　name : "My Object",

// 　　　　getNameFunc : function(){
// 　　　　　　var that = this;
// 　　　　　　return function(){
// 　　　　　　　　return that.name;
// 　　　　　　};

// 　　　　}

// 　　};

// console.log(object.getNameFunc()());


// 手写instanceof
// function myinstanceof(leftValue, rightValue) {
//   var rightproto = rightValue.prototype;
//   leftValue = leftValue.__proto__;
//   while(true) {
//       if (leftValue == null) return false;
//       if (leftValue == rightproto) return true;
//       leftValue = leftValue.__proto__;
//   }
// }

// 闭包
// var a = 0, b = 0
// function A(a) {
//     A = function (b) {
//         console.log(a + b++)
//     }
//     console.log(a++)
// }
// A(1)
// A(2)

// promise2.all = function(arr) {
//   let list = [];
//   let len = 0;
//   let hasErr = false;

//   return new promise2((resolve, reject) => {
//       for(var i=0;i<arr.length;i++) {
//           arr[i].then(data => {
//               list[i] = data;
//               len++;
//               len === arr.length && resolve(list);
//           }, error => {
//               !hasErr && reject(error);
//               hasErr = true
//           })
//       }
//   })
// }

// promise2.race = function(arr) {

//     return new promise2((resolve,reject) => {
//         for (var i=0; i<arr.length;i++) {
//             arr[i].then(data => {
//                 resolve(data);
//             }, error => {
//                 reject(error);
//             })
//         }
//     })
// }

// Function.prototype.a = () => console.log(1); 
// Object.prototype.b = () => console.log(2); 
// function A() {};
// const a = new A(); 
// a.a(); // 报错，因为对象的原型链上没有function
// a.b(); //分别输出什么  2

// console.log(1);
// setTimeout(() => {
//   console.log(2);
// });
// new Promise(resolve => {
//   console.log(3);
//   resolve('resolve');
//   console.log(4);
//   reject('error')
// }).catch((err) => {
//   console.log(err);
// }).then((res) => {
//   console.log(res)
// });
// Promise.resolve().then(() => {
//   console.log(5);
// });
// console.log(6);

// var a = {
// 	b:'b',
// 	c:function(){
// 		console.log(this.b)
// 	}
// }
// a.c()
// var a = {
// 	b:'b',
// 	c:()=>{
// 		console.log(this.b)
// 	}
// }
// a.c()
// var a = {
// 	b:'b',
// 	c:function(){
// 		console.log(this.b)
// 	}
// }
// let d = a.c
// d()

// var count = (function() {
// 	var n = 1;
// 	return function () {
// 	  return n++;
// 	}
// })();
// console.log(count()); // 1
// console.log(count()); //2
// console.log(count()); //3

// var x =  1;
// console.log(JSON.stringify(x))

// function promise(fn) {
//     var state = 'pending';
//     var value = null;
//     var callbacks = [];

//     this.then = function (onFullfilled) {
//         if (state == 'pending') {
//             callbacks.push(onFullfilled);
//             return this;
//         }
//         onFullfilled(value);
//         return this;
//     }

//     function resolve(newValue) {
//         state = 'fullfilled';
//         value = newValue;
//         setTimeout(function() {
//             callbacks.forEach(function (callback) {
//                 callback(newValue);
//             })
//         }, 0);
//     }
//     fn(resolve);
// }

// var xhr = new XMLHttpRequest();
// xhr.open('POST', 'www.baidu.com', true);
// xhr.send();
// xhr.onreadystatechange = function () {
//     if (this.readyState == 4) {
//         if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
//             console.log('success');
//             alert(xhr.responseText);
//         }
//     }
// }

// Function.prototype.bind = function (context, ...args) {
//     let self = this;
//     var fBound = function () {
//         return self.apply(this instanceof fBound ? this : context || window, args);
//     }
//     fBound.prototype = Object.create(this.prototype);
//     return 

// Function.prototype.bind = function(context, ...args) {
//     let self = this;
//     let fbound = function () {
//         self.apply(this instanceof fbound ? this : context || window, args);
//     }
//     fbound.prototype = Object.create(this.prototype);
//     return fbound;
// }