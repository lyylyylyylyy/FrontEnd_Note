// function a() {
//     var count = a.prototype.count.count;
//     a.prototype.count.count++;
//     if (count %2 == 0) {
//         return 2;
//     } else {
//         return 1;
//     }
// }

// a.prototype.count = {
//     count : 1
// }

// console.log(a());
// console.log(a());
// console.log(a());
// console.log(a());
// console.log(a());

// console.log('script start');
// setTimeout(function() {
//   console.log('setTimeout');
// }, 0);  
// new Promise(function(resolve) {
//   console.log('promise1');
//   resolve();
//  }).then(function() {
//   console.log('promise2');
// });
// console.log('script end');

// script start
// promise1
// script end
// promise2
// setTimeout(() => {
    
// }, timeout);

// function strisValid(str) {
//     if (str.length == 0) return true;

//     var map = new Map();
//     map.set('(', ')');
//     map.set('{', '}');
//     map.set('[', ']');

//     var stack = [];
//     var stack2 = [];

//     for (var i = 0; i < str.length; i++) {
//         if (map.has(str[i])) {
//             stack.push(str[i]);
//         } else {
//             if (str[i] === map.get(stack[stack.length - 1])) {
//                 stack.pop();
//             } else {
//                 stack2.push(str[i]);
//             }
//         }
//     }
//     // console.log(stack)
//     return stack.length == 0&& stack2.length == 0 ? true : false;
// }


// console.log(strisValid('([])]'));

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var threeSum = function(nums) {
    if (nums.length < 3) {
        return nums;
    }
    
    var result = new Set();
    
    for (var i = 0; i < nums.length; i++) {
        var target = 0 - nums[i];
        var map = new Map();
        
        for (var j = i + 1; j < nums.length; j++) {
            if (!map.has(nums[j])) {
                map.set(target - nums[j], j);
            }
            if (map.has(nums[j]) && map.get(nums[j]) !== j) {
                var arr = new Array();
                arr.push(nums[i]);
                arr.push(nums[map.get(nums[j])]);
                arr.push(nums[j]);
                arr.sort((a,b) => {
                    return a-b;
                });
                
                result.add(arr);
            }
        }
    }
    return result;
};

console.log(threeSum([-1,0,1,2,-1,-4]))