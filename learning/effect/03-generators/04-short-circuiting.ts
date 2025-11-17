/**
 * The role of short-circuiting is to stop the execution of a generator function
 *
 * When working with `Effect.gen`, it is important to understand how it handles errors.
 * This API will stop execution at the first error it encounters and return that error.
 */

import { Effect, Console } from "effect";

//
// Example: Halting execution at the first error
//

const task1 = Console.log("task1...")
const task2 = Console.log("task2...")
const failure = Effect.fail("Something went wrong!")
const task4 = Console.log("task4...")

const program = Effect.gen(function* () {
    yield* task1
    yield* task2
    // The program stops here due to the error
    yield* failure
    // The following lines never run
    yield* task4
    return "some result"
})

Effect.runPromise(program).then(console.log, console.error)
// Output:
// ```
// task1...
// task2...
// (FiberFailure) Error: Something went wrong!
// ```

//
// Example: Type narrowing without an explicit return
//

type User = {
    readonly name: string
}

// Imagine this function checks a database or an external service
declare function getUserById(id: string): Effect.Effect<User | undefined>

function greetUser(id: string) {
    return Effect.gen(function* () {
        const user = yield* getUserById(id)

        if (user === undefined) {
            // Even though we fail here, TypeScript still thinks
            // 'user' might be undefined later
            yield* Effect.fail(`User with id ${id} not found`)
        }

        return `Hello, ${user.name}!`
        // ^- Error ts(18048) ― 'user' is possibly 'undefined'.
    })
}

//
// Example: Type narrowing with explicit return
//

function greetUserExplicit(id: string) {
    return Effect.gen(function* () {
        const user = yield* getUserById(id)

        if (user === undefined) {
            // Explicitly return after failing
            return yield* Effect.fail(`User with id ${id} not found`)
        }

        // Now TypeScript knows that 'user' is not undefined
        return `Hello, ${user.name}!`
    })
}
