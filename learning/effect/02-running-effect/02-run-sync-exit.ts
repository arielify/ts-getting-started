/**
 * Execute with the `Effect.runSync`.
 * Runs an effect synchronously and returns the result as an `Exit` type,
 * which represents the outcome (success or failure) of the effect.
 */

import { Effect } from "effect";

console.log(Effect.runSyncExit(Effect.succeed(1)));

// Output:
// ```
// { _id: 'Exit', _tag: 'Success', value: 1 }
// ```

console.log(Effect.runSyncExit(Effect.fail("my error")));

// Output:
// ```
// {
//   _id: 'Exit',
//   _tag: 'Failure',
//   cause: { _id: 'Cause', _tag: 'Fail', failure: 'my error' }
// }
// ```

// Asynchronous operation resulting in `Die`
console.log(Effect.runSyncExit(Effect.promise(() => Promise.resolve(1))));

// Output:
// ```
// {
//   _id: 'Exit',
//   _tag: 'Failure',
//   cause: {
//     _id: 'Cause',
//     _tag: 'Die',
//     defect: [Fiber #0 cannot be resolved synchronously. This is caused by using runSync on an effect that performs async work] {
//       fiber: [FiberRuntime],
//       _tag: 'AsyncFiberException',
//       name: 'AsyncFiberException'
//     }
//   }
// }
// ```
