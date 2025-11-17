
console.log("1. Start");

Promise.resolve().then(() => console.log("4a. Promise callback"));

setTimeout(() => {
    console.log("3. Timeout callback");
}, 0);

Promise.resolve().then(() => console.log("4b. Promise callback"));

console.log("2. End");

// Output:
//
// 1. Start
// 2. End
// 4a. Promise callback
// 4b. Promise callback
// 3. Timeout callback
//
// All runs on the SAME thread using the event loop
