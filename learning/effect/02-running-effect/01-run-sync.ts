/**
 * Execute with the `Effect.runSync`.
 * It does not fail and does not include any async operations.
 */

// The recommended approach is to design your program with the majority of its logic as Effects.
// It’s advisable to use the run* functions closer to the “edge” of your program.
// This approach allows for greater flexibility in executing your program and building sophisticated effects.

import { Effect } from "effect";

const program = Effect.sync(() => {
    console.log("Hello, World!")
    return 1
})

const result = Effect.runSync(program)
// Output: Hello, World!

console.log(result)
// Output: 1

//
// Incorrect usage with failing or async effects
//

try {
    // Attempt to run an effect that fails
    Effect.runSync(Effect.fail("my error"))
} catch (e) {
    console.error(e)
}

// Output:
// ```
// (FiberFailure) Error: my error
// ```

try {
    // Attempt to run an effect that involves async work
    Effect.runSync(Effect.promise(() => Promise.resolve(1)))
} catch (e) {
    console.error(e)
}

// Output:
// ```
// (FiberFailure) AsyncFiberException: Fiber #0 cannot be resolved synchronously. This is caused by using runSync on an effect that performs async work
// ```
