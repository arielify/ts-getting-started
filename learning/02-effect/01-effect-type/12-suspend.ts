/**
 * Constructor `Effect.suspend` with lazy evaluation and circular dependencies.
 */

import {Effect} from "effect";

//
// Lazy evaluation
//

let i = 0

const bad = Effect.succeed(i++)

const good = Effect.suspend(() => Effect.succeed(i++))

console.log(Effect.runSync(bad)) // Output: 0
console.log(Effect.runSync(bad)) // Output: 0

console.log(Effect.runSync(good)) // Output: 1
console.log(Effect.runSync(good)) // Output: 2

//
// Circular dependencies: Example with recursive Fibonacci
//

const blowsUp = (n: number): Effect.Effect<number> =>
    n < 2
        ? Effect.succeed(1)
        : Effect.zipWith(blowsUp(n - 1), blowsUp(n - 2), (a, b) => a + b)

// console.log(Effect.runSync(blowsUp(32)))
// crash: JavaScript heap out of memory

const allGood = (n: number): Effect.Effect<number> =>
    n < 2
        ? Effect.succeed(1)
        : Effect.zipWith(
            Effect.suspend(() => allGood(n - 1)),
            Effect.suspend(() => allGood(n - 2)),
            (a, b) => a + b
        )

console.log(Effect.runSync(allGood(32))) // Output: 3524578

//
// Unifying return type
//

// Without suspending, TypeScript may struggle with type inference.
//
// Inferred type:
//   (a: number, b: number) =>
//     Effect<never, Error, never> | Effect<number, never, never>
const withoutSuspend = (a: number, b: number) =>
    b === 0
        ? Effect.fail(new Error("Cannot divide by zero"))
        : Effect.succeed(a / b)

// Using suspend to unify return types.
//
// Inferred type:
//   (a: number, b: number) => Effect<number, Error, never>
const withSuspend = (a: number, b: number) =>
    Effect.suspend(() =>
        b === 0
            ? Effect.fail(new Error("Cannot divide by zero"))
            : Effect.succeed(a / b)
    )
