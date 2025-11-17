/**
 * Execute with the `Effect.runPromise`.
 * Executes an effect and returns the result as a Promise.
 * Use Effect.runPromise when you need to execute an effect
 * and work with the result using Promise syntax,
 * typically for compatibility with other promise-based code.
 */

import { Effect } from "effect";

// Example: Running a successful `Effect` as a `Promise`
Effect.runPromise(Effect.succeed(1)).then(console.log)
// Output: 1

// Example: Handling a failing `Effect` as a rejected `Promise`
Effect.runPromise(Effect.fail("my error")).catch(console.error)
// Output: (FiberFailure) Error: my error
