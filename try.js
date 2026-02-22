// const array = [12, 5, 3, 10, 7, 8]
// console.log(array.splice(-1, 1))
// console.log(array);
// console.log(array.forEach(element => element * 2))
// for (var i = 0; i < array.length; i++) {
//     for (var j = i; j < array.length; j++) {
//         if (array[i] > array[j]) {
//             var temp = array[i]
//             array[i] = array[j]
//             array[j] = temp
//         }
//     }
// }
// console.log(array);



// var name = "me is thenayt helloyo my name is teumay";
// const splitName = name.split(" ");
// var firstLargest = "";
// var secondLargest = "";
// for (var str of splitName) {
//     if (str.length > firstLargest.length) {
//         secondLargest = firstLargest
//         firstLargest = str
//     } else if (str !== firstLargest && str.length > secondLargest.length) {
//         secondLargest = str;
//     }
// }
// console.log(firstLargest.length, secondLargest.length);


// var arr = [10, 13, 17, 24, 5, 23];
// console.log(arr.map(item => item > 23));
// const returnIndex = (arr, target) => {
//     for (var i = 0; i < arr.length; i++) {
//         for (var j = i + 1; j < arr.length; j++) {
//             if (arr[i] + arr[j] === target) {
//                 return {
//                     i: i,
//                     j: j,
//                 };
//             }
//         }
//     }
//     return 0;
// };

// const res = returnIndex(arr, 30);
// console.log(res);


// console.log(isNaN('teumay'));