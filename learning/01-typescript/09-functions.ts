
// No type annotations, it can be prevented by TypeScript with --noImplicitAny compiler option
function dullFunction(param1, param2) {
    // Don't do this!
}

// Type annotations
function funFunction(score:  number, message: string): string {
    return `${message}: ${score}`;
}

// Optional parameters (undefined if not provided)
function createCustomer(name: string, age?: number) {
    console.log(name, age);
}

createCustomer('John');             // John undefined
createCustomer('John', 47);    // John 47

// Default parameters
function createCustomer2(name: string, age = 18) {

}

// Default parameters with dynamic values
function createCustomer3(name: string, age = Math.floor(Math.random() * 100)) {

}

// Rest parameters
function createCustomer4(name: string, ...bookIDs: number[]) {

}

// Arrow functions
let squareIt = (x: number) => x * x;
console.log(squareIt(3));

let greetings = () => `Hello!`;
console.log(greetings());

let scores: number[] = [10, 20, 30];

let highestScores: number[];
highestScores = scores.filter((score, index, array) => {
    return score > 15;
});

let highestScores2: number[] = scores.filter(score => score > 15);

// Overloading functions (not available in javascript)

// ...declarations
function getTitles(author: string): string[];
function getTitles(available: boolean): string[];

// ...implementation
function getTitles(authorOrAvailable: string | boolean): string[] {
    if (typeof authorOrAvailable === 'string') {
        return ['The Great Gatsby', 'To Kill a Mockingbird'];
    } else {
        return ['The Great Gatsby', 'To Kill a Mockingbird', '1984'];
    }
}

// Declaring functions types
function releaseMessage(year: number): string {
    return `Release date: ${year}`;
}

let releaseDate: (year: number) => string = releaseMessage;

// Primitive types vs. reference types (objects, arrays)
let value = 12;
function changePrimitiveValue(value: number) {
    value = 13;
}

changePrimitiveValue(value);
console.log(value); // 12

const obj = { value: 12 };
function changeObjValue(obj: { value: number }) {
    obj.value = 13;
}

changeObjValue(obj);
console.log(obj.value); // 13
