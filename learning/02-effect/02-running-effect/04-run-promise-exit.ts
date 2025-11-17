/**
 * Execute with the `Effect.runPromiseExit`.
 * Runs an effect and returns a `Promise` that resolves to an `Exit`,
 * which represents the outcome (success or failure) of the effect.
 */

import { Effect } from "effect";

Effect.runPromiseExit(Effect.succeed(1)).then(console.log)

// Output:
// ```
// {
//   _id: "Exit",
//   _tag: "Success",
//   value: 1
// }
// ```

Effect.runPromiseExit(Effect.fail("my error")).then(console.log)

// Output:
// ```
// {
//   _id: "Exit",
//   _tag: "Failure",
//   cause: {
//     _id: "Cause",
//     _tag: "Fail",
//     failure: "my error"
//   }
// }
// ```
