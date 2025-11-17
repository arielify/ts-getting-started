
type User = { name: string, age: number };

// async function always returns a Promise
async function fetchUserData(id: number): Promise<User> {
    try {
        const response = await fetch(`/api/users/${id}`);
        const data = await response.json();
        return data as User; // Automatically wrapped in Promise.resolve()
    } catch (error) {
        console.error('Error:', error);
        throw error; // Automatically wrapped in Promise.reject()
    }
}

// Using async/await
async function main() {
    try {
        const user = await fetchUserData(1);
        console.log(user);
    } catch (error) {
        console.error('Failed to fetch user:', error);
    }
}

// Different ways

// Function declaration
async function getData2(): Promise<string> {
    return "data";
}

// Function expression
const getData3 = async (): Promise<string> => {
    return "data";
}

// Arrow function
const getData4 = async () => {
    return "data";
}

// Method in class
class DataService {
    async getData(): Promise<string> {
        return "data";
    }
}

// Method in object
const service = {
    async getData(): Promise<string> {
        return "data";
    }
};

// How it works

async function somePromise() { return "some data"; }

// This async function...
async function example1() {
    const result = await somePromise();
    console.log(result);
    return "done";
}

// ...is equivalent to this Promise chain:
function example2() {
    return somePromise()
        .then(result => {
            console.log(result);
            return "done";
        });
}

// Errors
async function handleErrors() {
    try {
        const data = await riskyOperation();
        const processed = await processData(data);
        return processed;
    } catch (error) {
        if (error instanceof NetworkError) {
            console.error('Network error:', error.message);
            return getDefaultData();
        } else if (error instanceof ValidationError) {
            console.error('Validation error:', error.message);
            throw new Error('Invalid data provided');
        } else {
            console.error('Unexpected error:', error);
            throw error;
        }
    }
}

// Multiple errors
async function robustOperation(): Promise<string> {
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
        try {
            const result = await unreliableOperation();
            return result;
        } catch (error) {
            attempts++;
            console.log(`Attempt ${attempts} failed:`, error.message);

            if (attempts >= maxAttempts) {
                throw new Error(`Operation failed after ${maxAttempts} attempts`);
            }

            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
        }
    }

    throw new Error('This should never be reached');
}

// ## **Key Points to Remember**
// 1. **functions always return a Promise`async`**
// 2. **`await` can only be used inside functions`async`**
// 3. **`await` pauses function execution until Promise resolves**
// 4. **Use `try-catch` for error handling**
// 5. **Consider parallel execution with `Promise.all()`**
// 6. **Don't forget to handle rejected Promises**
// 7. **Async/await is just syntactic sugar over Promises**
//
// Async/await makes asynchronous code much more readable and easier to debug compared to callback hell or complex Promise chains!
