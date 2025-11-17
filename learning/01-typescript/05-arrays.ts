
let strArray1: string[] = ['a', 'b', 'c'];
console.log(`The array contains ${strArray1.length} elements`);

let strArray2: Array<string> = ['a', 'b', 'c'];
console.log(`The array contains ${strArray2.length} elements`);

let anyArray: any[] = [1, true, 'hello'];
console.log(`The array contains ${anyArray.length} elements`);

// Iterate over array elements
for (const element of strArray1) {
    console.log(element);
}

// Iterate over array indices
for (let i = 0; i < strArray1.length; i++) {
    console.log(`Element at index ${i}: ${strArray1[i]}`);
}

// Iterate over array indices and elements simultaneously
for (const [index, element] of strArray1.entries()) {
    console.log(`Element at index ${index}: ${element}`);
}

// Index signature
interface StringArray {
    [index: number]: string;
}

const myArray: StringArray = getStringArray();
const secondItem = myArray[1];

// Index signature for dictionaries
interface NumberDictionary {
    [index: string]: number;
    length: number; // ok
    // name: string; // invalid
    // Property 'name' of type 'string' is not assignable to 'string' index type 'number'.
}

interface NumberOrStringDictionary {
    [index: string]: number | string;
    length: number; // ok, length is a number
    name: string; // ok, name is a string
}

// Readonly index signature
interface ReadonlyStringArray {
    readonly [index: number]: string;
}

let myArray2: ReadonlyStringArray = getReadOnlyStringArray();
// myArray2[2] = "Mallory"; // Index signature in type 'ReadonlyStringArray' only permits reading.
