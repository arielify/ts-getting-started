
// Boolean
let isDone: boolean = false;
console.log(`Is it done? ${isDone}`);

// Number is a 64-bit floating-point number
let age: number = 37.3;
console.log(`Age is ${age}`);

// String
let movieTitle: string = 'The Matrix';
console.log(`The movie title is "${movieTitle}"`);

// Null
let nulled: null = null;
console.log(`The value of nulled is: ${nulled}`);

// Nullable
let myFavoriteNumber: number | null = 7;
myFavoriteNumber = null;
console.log(`My favorite number is: ${myFavoriteNumber}`);

// Undefined
let unusable: undefined = undefined;
console.log(`The value of unusable is: ${unusable}`);

// Any
let notSure: any = 4;
notSure = 'Maybe a string instead';
console.log(notSure);

// Union
let someValue: string | number = 'This is a string';
someValue = 100;
console.log(`The value is: ${someValue}`);

// Type control
if (typeof someValue === 'string') {
    console.log(`someValue is a string`);
} else if (typeof someValue === 'number') {
    console.log(`someValue is a number`);
} else {
    console.log(`someValue is of `, typeof someValue);
}

// Void
function itReturnsNothing(): void {
    console.log('This is my warning message');
}

// Never
function itNeverReturns(): never
{
    throw new Error('This function will never exit');
}

// Type aliases (it doesn't change the type, it just creates a new name for it)
type ID = number | string;
let myId: ID = 123;
console.log(`My ID is: ${myId}`);

// Converting types
let someNumber: number = 123;
let convertedString: string = someNumber as any as string;
console.log(`Converted string: ${convertedString}`);
