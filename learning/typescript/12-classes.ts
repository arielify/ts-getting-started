
// Classes:
// - template for creating objects
// - state storage and behavior
class Person {
    // Properties (fields)
    name: string;
    age: number;

    // Constructor
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    // Method
    greet(): string {
        return `Hello, I'm ${this.name} and I'm ${this.age} years old`;
    }
}

// Creating instances
const person1 = new Person("Alice", 30);
const person2 = new Person("Bob", 25);

console.log(person1.greet()); // "Hello, I'm Alice and I'm 30 years old"
console.log(person2.greet()); // "Hello, I'm Bob and I'm 25 years old"

// Access modifiers: public, private, protected
class BankAccount {
    public accountNumber: string;    // Accessible everywhere (default)
    private balance: number;         // Only accessible within this class
    protected bankName: string;      // Accessible in this class and subclasses
    readonly createdDate: Date;      // Cannot be modified after initialization

    constructor(accountNumber: string, initialBalance: number) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
        this.bankName = "MyBank";
        this.createdDate = new Date();
    }

    // Public method
    public getBalance(): number {
        return this.balance;
    }

    // Private method
    private validateAmount(amount: number): boolean {
        return amount > 0;
    }

    // Protected method
    protected logTransaction(type: string, amount: number): void {
        console.log(`${type}: $${amount} at ${new Date()}`);
    }

    public deposit(amount: number): void {
        if (this.validateAmount(amount)) {
            this.balance += amount;
            this.logTransaction("Deposit", amount);
        }
    }
}

const account = new BankAccount("12345", 1000);
console.log(account.accountNumber); // ✅ Accessible
console.log(account.getBalance());  // ✅ Accessible
// console.log(account.balance);    // ❌ Error: Private property

// Shorthand property names
class User {
    constructor(
        public name: string,
        public email: string,
        private readonly id: string = Math.random().toString()
    ) {
        // Properties are automatically created and assigned
    }
}

// Inheritance
class Animal {
    constructor(protected name: string) {}

    move(): string {
        return `${this.name} is moving`;
    }

    makeSound(): string {
        return `${this.name} makes a sound`;
    }
}

class Dog extends Animal {
    constructor(name: string, private breed: string) {
        super(name); // Call parent constructor
    }

    // Override parent method
    makeSound(): string {
        return `${this.name} barks!`;
    }

    // Additional method
    wagTail(): string {
        return `${this.name} wags tail happily`;
    }

    getBreed(): string {
        return this.breed;
    }
}

const dog = new Dog("Buddy", "Golden Retriever");
console.log(dog.move());      // "Buddy is moving"
console.log(dog.makeSound()); // "Buddy barks!" (overridden)
console.log(dog.wagTail());   // "Buddy wags tail happily"

// Abstract classes and methods
abstract class Shape {
    constructor(protected color: string) {}

    // Abstract method (must be implemented by subclasses)
    abstract calculateArea(): number;
    abstract getPerimeter(): number;

    // Concrete method (can be used by subclasses)
    getColor(): string {
        return this.color;
    }

    describe(): string {
        return `A ${this.color} shape with area ${this.calculateArea()}`;
    }
}

class Circle extends Shape {
    constructor(color: string, private radius: number) {
        super(color);
    }

    calculateArea(): number {
        return Math.PI * this.radius ** 2;
    }

    getPerimeter(): number {
        return 2 * Math.PI * this.radius;
    }
}

class Rectangle extends Shape {
    constructor(
        color: string,
        private width: number,
        private height: number
    ) {
        super(color);
    }

    calculateArea(): number {
        return this.width * this.height;
    }

    getPerimeter(): number {
        return 2 * (this.width + this.height);
    }
}

// const shape = new Shape("red"); // ❌ Error: Cannot instantiate abstract class
const circle = new Circle("red", 5);
const rectangle = new Rectangle("blue", 4, 6);

// Static members
class MathUtils {
    static readonly PI = 3.14159;
    static instanceCount = 0;

    constructor() {
        MathUtils.instanceCount++;
    }

    static calculateCircleArea(radius: number): number {
        return MathUtils.PI * radius ** 2;
    }

    static getInstanceCount(): number {
        return MathUtils.instanceCount;
    }
}

// Access static members without creating instance
console.log(MathUtils.PI);                           // 3.14159
console.log(MathUtils.calculateCircleArea(5)); // 78.53975
console.log(MathUtils.getInstanceCount());           // 0

const math1 = new MathUtils();
const math2 = new MathUtils();
console.log(MathUtils.getInstanceCount());     // 2

// Getters and setters
class Temperature {
    private _celsius: number = 0;

    // Getter
    get celsius(): number {
        return this._celsius;
    }

    // Setter
    set celsius(value: number) {
        if (value < -273.15) {
            throw new Error("Temperature cannot be below absolute zero");
        }
        this._celsius = value;
    }

    // Computed property
    get fahrenheit(): number {
        return (this._celsius * 9/5) + 32;
    }

    set fahrenheit(value: number) {
        this.celsius = (value - 32) * 5/9;
    }
}

const temp = new Temperature();
temp.celsius = 25;
console.log(temp.fahrenheit); // 77

temp.fahrenheit = 100;
console.log(temp.celsius);    // 37.77777777777778

// Generic classes
class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
console.log(numberStack.pop()); // 2

const stringStack = new Stack<string>();
stringStack.push("hello");
stringStack.push("world");
console.log(stringStack.pop()); // "world"

// Interfaces
interface Flyable {
    fly(): string;
}

interface Swimmable {
    swim(): string;
}

class Duck implements Flyable, Swimmable {
    constructor(private name: string) {}

    fly(): string {
        return `${this.name} flies through the air`;
    }

    swim(): string {
        return `${this.name} swims in the water`;
    }

    quack(): string {
        return `${this.name} says quack!`;
    }
}

const duck = new Duck("Donald");
console.log(duck.fly());   // "Donald flies through the air"
console.log(duck.swim()); // "Donald swims in the water"
console.log(duck.quack()); // "Donald says quack!"

// Class as type
class User2 {
    constructor(public name: string, public email: string) {}
}

// Class can be used as a type
function processUser(user: User2): string {
    return `Processing ${user.name}`;
}

const user1 = new User2("Alice", "alice@example.com");
const user2 = { name: "Bob", email: "bob@example.com" }; // Structural typing

console.log(processUser(user1)); // Works
console.log(processUser(user2)); // Also works (duck typing)

// Override with super
class Animal2 {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    makeSound(): string {
        return `${this.name} makes a generic animal sound`;
    }

    move(): string {
        return `${this.name} moves around`;
    }
}

class Dog2 extends Animal2 {
    constructor(name: string, private breed: string) {
        super(name); // Call parent constructor
    }

    // Override with additional behavior
    makeSound(): string {
        const parentSound = super.makeSound(); // Call parent method
        return `${parentSound}, but specifically barks!`;
    }

    // Completely override
    move(): string {
        return `${this.name} runs and jumps around`;
    }

    // Call parent method and extend it
    describe(): string {
        const basicMove = super.move(); // Call parent's move method
        return `${basicMove} and wags tail`;
    }
}

const dog2 = new Dog2("Buddy", "Golden Retriever");
console.log(dog2.makeSound());
// "Buddy makes a generic animal sound, but specifically barks!"

console.log(dog2.move());
// "Buddy runs and jumps around"

// Class expressions
const Person = class {
    constructor(public name: string, public age: number) {}

    greet(): string {
        return `Hello, I'm ${this.name}`;
    }
};

const person = new Person("Alice", 30);
console.log(person.greet()); // "Hello, I'm Alice"

// Named class expressions
const Employee = class EmployeeClass {
    constructor(public name: string, public position: string) {}

    introduce(): string {
        return `I'm ${this.name}, a ${this.position}`;
    }

    // The class name is accessible within the class
    getClassName(): string {
        return EmployeeClass.name; // "EmployeeClass"
    }
};

const emp = new Employee("Bob", "Developer");
console.log(emp.introduce()); // "I'm Bob, a Developer"
console.log(emp.getClassName()); // "EmployeeClass"
// console.log(EmployeeClass); // ❌ Error: EmployeeClass is not accessible outside
