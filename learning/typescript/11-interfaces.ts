
// Duck Typing
interface Duck {
    walk: () => void;
    swim: () => void;
    quack: () => void;
}

let probablyADuck: Duck = {
    walk: () => {},
    swim: () => {},
    quack: () => {}
};

function flyOverWater(duck: Duck) {

}

flyOverWater(probablyADuck);

// Defining interfaces
interface Book {
    id: number;
    title: string;
    author: string;
    pages?: number;
    markDamaged: (reason: string) => void;
}

// Interface for the function type
interface StringGenerator {
    (chars: string, nums: number): string; // here is the colon instead of arrow
}

let generateString: StringGenerator;
generateString = (chars: string, nums: number) => chars.repeat(nums);

// Extending interfaces
interface Person extends Duck {
    age: number;
}

// Combining interfaces
interface LibraryResource {
    catalogNumber: number;
}

interface Book {
    title: string;
}

interface EncyclopediaEntry extends Book, LibraryResource {
    volume: number;
}

// Class types
interface Librarian {
    doWork: () => void;
}

class ElementarySchoolLibrarian implements Librarian {
    doWork() {
        console.log("I'm a librarian!");
    }
}

let kidsLibrarian = new ElementarySchoolLibrarian();
kidsLibrarian.doWork();
