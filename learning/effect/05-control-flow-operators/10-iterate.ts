
// Effect.iterate(initial, {
//   while: (result) => boolean,
//   body: (result) => Effect
// })

// ```
// let result = initial
//
// while (options.while(result)) {
//   result = options.body(result)
// }
//
// return result
// ```

import { Effect } from "effect"

const result = Effect.iterate(
    // Initial result
    1,
    {
        // Condition to continue iterating
        while: (result) => result <= 5,
        // Operation to change the result
        body: (result) => Effect.succeed(result + 1)
    }
)

Effect.runPromise(result).then(console.log)
// Output: 6
