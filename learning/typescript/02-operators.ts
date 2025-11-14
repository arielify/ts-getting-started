
// Strict equality === and !==
console.log(1 === 1);               // true
console.log(1 === '1');             // false (number vs string)
console.log(null === undefined);    // false
console.log(true === 1);            // false

// Loose equality == and !=
console.log(1 == '1');              // true (string '1' is coerced to number 1)
console.log(0 == false);            // true
console.log('' == false);           // true
console.log(null == undefined);     // true
