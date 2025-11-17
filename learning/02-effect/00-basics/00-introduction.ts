// noinspection GrazieInspection

/**
 * The concept of Effect compared to traditional TypeScript:
 * https://effect.website/docs/getting-started/why-effect/
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

for (const element of [3, 2, 0]) {
    try {
        let result = divideTraditional(6, element);
        console.log("Result:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}

// Effect’s major unique insight is that we can use the type system
// to track errors and context, not only success values as shown in the divide example above.
import { Effect, Console, Exit, Cause } from "effect";

// With this approach, the function no longer throws exceptions:
//
//          ┌─── Produces a value of type number
//          │       ┌─── Fails with an Error
//          │       │      ┌─── Requires no dependencies
//          ▼       ▼      ▼
// Effect<number, Error, never>
const divideEffect = (
    a: number,
    b: number
): Effect.Effect<number, Error, never> =>
    b === 0
        ? Effect.fail(new Error("Cannot divide by zero"))
        : Effect.succeed(a / b);

for (const element of [3, 2, 0]) {
    let exit = Effect.runSyncExit(divideEffect(6, element));

    Exit.match(exit, {
        onFailure: (cause) => console.log(`Failure: ${Cause.pretty(cause)}`),
        onSuccess: (value) => console.log(`Success: ${value}`)
    });
}

// Hello, World!
const program = Console.log("Hello, World!");
Effect.runSync(program);
