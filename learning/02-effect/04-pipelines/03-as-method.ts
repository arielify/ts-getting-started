/**
 * Method `Effect.as` allows you to ignore the original value inside
 * an effect and replace it with a new constant value.
 */

import { pipe, Effect } from "effect"

// Replace value 5 with the constant "new value"
const program = pipe(Effect.succeed(5), Effect.as("new value"))

Effect.runPromise(program).then(console.log) // Output: "new value"
