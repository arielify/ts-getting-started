import 'reflect-metadata';

// // Enable decorators in tsconfig.json
// {
//   "compilerOptions": {
//     "experimentalDecorators": true,
//     "emitDecoratorMetadata": true
//   }
// }

// Simple class decorator
function Component(target: any) {
    console.log('Component decorator called on:', target.name);
    // Add metadata or modify the class
    target.prototype.isComponent = true;
}

@Component
class MyComponent {
    name = "Example";
}

const instance = new MyComponent();
console.log((instance as any).isComponent); // true

// With parameters
function Entity(tableName: string) {
    return function(target: any) {
        target.prototype.tableName = tableName;
        target.prototype.isEntity = true;

        console.log(`Entity decorator: ${target.name} -> table: ${tableName}`);
    };
}

@Entity('users')
class User {
    constructor(public name: string, public email: string) {}
}

@Entity('products')
class Product {
    constructor(public name: string, public price: number) {}
}

const user = new User('Alice', 'alice@test.com');
console.log((user as any).tableName); // 'users'

// Method decorator
function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
        console.log(`Calling ${propertyKey} with args:`, args);
        const result = originalMethod.apply(this, args);
        console.log(`${propertyKey} returned:`, result);
        return result;
    };
}

function Timing(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
        const start = performance.now();
        const result = originalMethod.apply(this, args);
        const end = performance.now();
        console.log(`${propertyKey} took ${end - start}ms`);
        return result;
    };
}

class Calculator {
    @Log
    @Timing
    add(a: number, b: number): number {
        return a + b;
    }

    @Log
    multiply(a: number, b: number): number {
        return a * b;
    }
}

const calc = new Calculator();
calc.add(5, 3);
// Output:
// Calling add with args: [5, 3]
// add returned: 8
// add took 0.1ms

// Async method decorator
function HandleErrors(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function(...args: any[]) {
        try {
            return await originalMethod.apply(this, args);
        } catch (error) {
            console.error(`Error in ${propertyKey}:`, error.message);
            throw new Error(`${propertyKey} failed: ${error.message}`);
        }
    };
}

function Retry(attempts: number) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function(...args: any[]) {
            let lastError;

            for (let i = 0; i < attempts; i++) {
                try {
                    return await originalMethod.apply(this, args);
                } catch (error) {
                    lastError = error;
                    console.log(`Attempt ${i + 1} failed, retrying...`);
                    await new Promise(resolve => setTimeout(resolve, 1000 * i));
                }
            }

            throw lastError;
        };
    };
}

class ApiService {
    @HandleErrors
    @Retry(3)
    async fetchData(url: string): Promise<any> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return await response.json();
    }
}

// Property decorators
function Required(target: any, propertyKey: string) {
    // Store metadata about required properties
    const requiredProperties = Reflect.getMetadata('required', target) || [];
    requiredProperties.push(propertyKey);
    Reflect.defineMetadata('required', requiredProperties, target);
}

function Min(value: number) {
    return function(target: any, propertyKey: string) {
        const minValues = Reflect.getMetadata('min', target) || {};
        minValues[propertyKey] = value;
        Reflect.defineMetadata('min', minValues, target);
    };
}

function Max(value: number) {
    return function(target: any, propertyKey: string) {
        const maxValues = Reflect.getMetadata('max', target) || {};
        maxValues[propertyKey] = value;
        Reflect.defineMetadata('max', maxValues, target);
    };
}

class Person {
    @Required
    name: string;

    @Required
    @Min(0)
    @Max(120)
    age: number;

    email?: string;

    constructor(name: string, age: number, email?: string) {
        this.name = name;
        this.age = age;
        this.email = email;

        this.validate();
    }

    private validate() {
        const requiredProps = Reflect.getMetadata('required', this) || [];
        const minValues = Reflect.getMetadata('min', this) || {};
        const maxValues = Reflect.getMetadata('max', this) || {};

        // Check required properties
        for (const prop of requiredProps) {
            if (!this[prop as keyof this]) {
                throw new Error(`${prop} is required`);
            }
        }

        // Check min/max values
        for (const [prop, minVal] of Object.entries(minValues)) {
            const value = this[prop as keyof this] as number;
            if (value < minVal) {
                throw new Error(`${prop} must be at least ${minVal}`);
            }
        }

        for (const [prop, maxVal] of Object.entries(maxValues)) {
            const value = this[prop as keyof this] as number;
            if (value > maxVal) {
                throw new Error(`${prop} must be at most ${maxVal}`);
            }
        }
    }
}

// const person = new Person('Alice', 25); // ✅ Valid
// const invalid = new Person('', -5);     // ❌ Throws validation errors

// Parameter decorators
function Validate(target: any, propertyKey: string, parameterIndex: number) {
    const existingValidators = Reflect.getMetadata('validate', target, propertyKey) || [];
    existingValidators[parameterIndex] = true;
    Reflect.defineMetadata('validate', existingValidators, target, propertyKey);
}

function IsString(target: any, propertyKey: string, parameterIndex: number) {
    const existingTypes = Reflect.getMetadata('paramTypes', target, propertyKey) || [];
    existingTypes[parameterIndex] = 'string';
    Reflect.defineMetadata('paramTypes', existingTypes, target, propertyKey);
}

function IsNumber(target: any, propertyKey: string, parameterIndex: number) {
    const existingTypes = Reflect.getMetadata('paramTypes', target, propertyKey) || [];
    existingTypes[parameterIndex] = 'number';
    Reflect.defineMetadata('paramTypes', existingTypes, target, propertyKey);
}

function ValidateParams(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
        const validators = Reflect.getMetadata('validate', target, propertyKey) || [];
        const paramTypes = Reflect.getMetadata('paramTypes', target, propertyKey) || [];

        for (let i = 0; i < args.length; i++) {
            if (validators[i]) {
                const expectedType = paramTypes[i];
                const actualType = typeof args[i];

                if (expectedType && actualType !== expectedType) {
                    throw new Error(`Parameter ${i} should be ${expectedType}, got ${actualType}`);
                }
            }
        }

        return originalMethod.apply(this, args);
    };
}

class UserService {
    @ValidateParams
    createUser(@Validate @IsString name: string, @Validate @IsNumber age: number) {
        return { name, age, id: Math.random() };
    }
}

const service = new UserService();
// service.createUser('Alice', 25);    // ✅ Works
// service.createUser('Alice', '25');  // ❌ Throws error
