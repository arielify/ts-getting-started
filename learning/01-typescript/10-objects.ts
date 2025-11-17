
// Anonymous objects
function greet1(person: { name: string; age: number }) {
    return "Hello " + person.name;
}

// Named objects
interface Person2 {
    name: string;
    age: number;
}

function greet2(person: Person2) {
    return "Hello " + person.name;
}

// Type alias
type Person3 = {
    name: string;
    age: number;
};

function greet3(person: Person3) {
    return "Hello " + person.name;
}

// Optional properties
interface PaintOptions {
    shape: Shape;
    xPos?: number;
    yPos?: number;
}

function paintShape(opts: PaintOptions) {
    // ...
}

const shape = getShape();
paintShape({ shape });
paintShape({ shape, xPos: 100 });
paintShape({ shape, yPos: 100 });
paintShape({ shape, xPos: 100, yPos: 100 });

// Default values
function paintShape2({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
    console.log("x coordinate at", xPos);
    console.log("y coordinate at", yPos);
}

// Readonly properties
interface SomeType {
    readonly prop: string;
}

interface Home {
    readonly resident: { name: string; age: number };
}

function visitForBirthday(home: Home) {
    // We can read and update properties from 'home.resident'.
    console.log(`Happy birthday ${home.resident.name}!`);
    home.resident.age++;
}

function evict(home: Home) {
    // But we can't write to the 'resident' property itself on a 'Home'.
    try {
        home.resident = {
            name: "Victor the Evictor",
            age: 42,
        };
    } catch (e) {
        console.error(e);
    }
}
