// noinspection GrazieInspection

/**
 * @description The concept of Effect compared to traditional TypeScript
 * @file The Effect philosophy
 */

// In "typical" TypeScript, without Effect, we write code that assumes
// that a function is either successful or throws an exception. Based on the types,
// we have no idea that this function can throw an exception. We can only find out
// by reading the code.
const divideTraditional = (a: number, b: number): number => {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
}

// Effect’s major unique insight is that we can use the type system
// to track errors and context, not only success values as shown in the divide example above.
import { Effect, Console } from "effect";

const divideEffect = (
    a: number,
    b: number
): Effect.Effect<number, Error, never> =>
    b === 0
        ? Effect.fail(new Error("Cannot divide by zero"))
        : Effect.succeed(a / b);

// With this approach, the function no longer throws exceptions:
//
//          ┌─── Produces a value of type number
//          │       ┌─── Fails with an Error
//          │       │      ┌─── Requires no dependencies
//          ▼       ▼      ▼
// Effect<number, Error, never>

// Hello, World!
const program = Console.log("Hello, World!");
Effect.runSync(program);
