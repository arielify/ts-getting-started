
// Keyword `var`:
// - is function scoped
// - is hoisted to the top of the function
// - can be reassigned
// - can be redeclared
// - can be accessed outside the block
// - creates a global variable if not declared inside a function as `window.x` in the browser
// - not recommended
function exampleVar1() {
    if (true) {
        var x = 1;
    }
    console.log(x); // 1 - accessible outside the block
}

// Function `exampleVar1()` is equivalent to:
function exampleVar2() {
    var x;
    if (true) {
        x = 1;
    }
    console.log(x); // 1 - accessible outside the block
}

// Keywords `let` and `const` are block scoped:
function exampleLet() {
    if (true) {
        let y = 1;
    }
    try {
        console.log(y); // ReferenceError: y is not defined
    } catch (e) {
        console.log(e.message);
    }
}

exampleVar1();
exampleVar2();
exampleLet();

// Keyword `var` shares the same variable across all iterations:
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100); // Prints: 3, 3, 3
}

// Keyword `let` creates a new variable for each iteration:
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100); // Prints: 0, 1, 2
}

const API_URL = "https://api.example.com"; // Won't change
console.log(API_URL);

let userCount = 0; // Will be reassigned
console.log(userCount);

var userId = 1; // Avoid
console.log(userId);
