
// Effect.loop(initial, {
//     while: (state) => boolean,
//     step: (state) => state,
//     body: (state) => Effect
// })

// ```
// let state = initial
// const result = []
//
// while (options.while(state)) {
//   result.push(options.body(state)) // Perform the effectful operation
//   state = options.step(state) // Update the state
// }
//
// return result
// ```

import { Effect } from "effect"

// A loop that runs 5 times, collecting each iteration's result
const result = Effect.loop(
    // Initial state
    1,
    {
        // Condition to continue looping
        while: (state) => state <= 5,
        // State update function
        step: (state) => state + 1,
        // Effect to be performed on each iteration
        body: (state) => Effect.succeed(state)
    }
)

Effect.runPromise(result).then(console.log)
// Output: [1, 2, 3, 4, 5]
