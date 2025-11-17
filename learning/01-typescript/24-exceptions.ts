
// TypeScript doesn’t force you to throw only Error,
// but it’s best practice to throw Error (or subclasses)
// instead of strings, numbers, etc.

// Throw error
function doSomething(): void {
    throw new Error('Failed');
}

try {
    doSomething();
} catch (e) {
    // In TS 4.4+, `e` is `unknown` by default.
    if (e instanceof Error) {
        console.error(e.message);
    }
}

// Custom error class
class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

function doSomething2(): void {
    throw new ValidationError('Invalid email');
}
