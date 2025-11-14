
// Cheatsheet:
//
// API	        Given	                                        Result
// ---          -----                                           ------
// succeed  	A           	                                Effect<A>
// fail     	E                                               Effect<never, E>
// sync     	() => A                                         Effect<A>
// try      	() => A                                         Effect<A, UnknownException>
// try          (overload)	() => A, unknown => E	            Effect<A, E>
// promise      () => Promise<A>	                            Effect<A>
// tryPromise   () => Promise<A>	                            Effect<A, UnknownException>
// tryPromise   (overload)	() => Promise<A>, unknown => E	    Effect<A, E>
// async        (Effect<A, E> => void) => void	                Effect<A, E>
// suspend      () => Effect<A, E, R>	                        Effect<A, E, R>
//
// Full list of constructors:
// https://effect-ts.github.io/effect/effect/Effect.ts.html#constructors
//

//          ┌─── Represents the success type
//          │        ┌─── Represents the error type
//          │        │      ┌─── Represents required dependencies
//          ▼        ▼      ▼
// Effect<Success, Error, Requirements>

import { Effect, Context, Data, Fiber } from "effect"

class SomeContext extends Context.Tag("SomeContext")<SomeContext, {}>() {}

// Assume we have an effect that succeeds with a number,
// fails with an Error, and requires SomeContext
declare const program: Effect.Effect<number, Error, SomeContext>

// Extract the success type, which is number
type A = Effect.Effect.Success<typeof program>

// Extract the error type, which is Error
type E = Effect.Effect.Error<typeof program>

// Extract the context type, which is SomeContext
type R = Effect.Effect.Context<typeof program>

//      ┌─── Effect<number, never, never>
//      ▼
const success = Effect.succeed(42)

//          ┌─── Produces a value of type number
//          │       ┌─── Does not generate any errors
//          │       │      ┌─── Requires no dependencies
//          ▼       ▼      ▼
// Effect<number, never, never>

//      ┌─── Effect<never, Error, never>
//      ▼
const failure = Effect.fail(
    new Error("Operation failed due to network error")
)

//          ┌─── Never produces a value
//          │      ┌─── Fails with an Error
//          │      │      ┌─── Requires no dependencies
//          ▼      ▼      ▼
// Effect<never, Error, never>

class HttpError extends Data.TaggedError("HttpError")<{}> {}

//      ┌─── Effect<never, HttpError, never>
//      ▼
const program2 = Effect.fail(new HttpError())

//
// Example: Simulating a User Retrieval Operation
//

// Define a User type
interface User {
    readonly id: number
    readonly name: string
}

// A mocked function to simulate fetching a user from a database
const getUser = (userId: number): Effect.Effect<User, Error> => {
    // Normally, you would access a database or API here, but we'll mock it
    const userDatabase: Record<number, User> = {
        1: { id: 1, name: "John Doe" },
        2: { id: 2, name: "Jane Smith" }
    }

    // Check if the user exists in our "database" and return appropriately
    const user = userDatabase[userId]
    if (user) {
        return Effect.succeed(user)
    } else {
        return Effect.fail(new Error("User not found"))
    }
}

// When executed, this will successfully return the user with id 1
const exampleUserEffect = getUser(1)

//
// sync - error will be a "defect"
//

const log = (message: string) =>
    Effect.sync(() => {
        console.log(message) // side effect
    })

//      ┌─── Effect<void, never, never>
//      ▼
const program3 = log("Hello, World!")

//
// try - transforms exceptions to manageable errors
//

const parse1 = (input: string) =>
    // This might throw an error if input is not valid JSON
    Effect.try(() => JSON.parse(input))

//      ┌─── Effect<any, UnknownException, never>
//      ▼
const program4 = parse1("")

//
// try - custom error handling
//

const parse2 = (input: string) =>
    Effect.try({
        // JSON.parse may throw for bad input
        try: () => JSON.parse(input),
        // remap the error
        catch: (unknown) => new Error(`something went wrong ${unknown}`)
    })

//      ┌─── Effect<any, Error, never>
//      ▼
const program5 = parse2("")

//
// promise - asynchronous computation guaranteed to succeed, otherwise "defect"
//

const delay = (message: string) =>
    Effect.promise<string>(
        () =>
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve(message)
                }, 2000)
            })
    )

//      ┌─── Effect<string, never, never>
//      ▼
const program6 = delay("Async operation completed successfully!")

//
// tryPromise - asynchronous computation that might fail, a default error type is UnknownException
//

const getTodo1 = (id: number) =>
    // Will catch any errors and propagate them as UnknownException
    Effect.tryPromise(() =>
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
    )

//      ┌─── Effect<Response, UnknownException, never>
//      ▼
const program7 = getTodo1(1)

//
// tryPromise - custom error handling
//

const getTodo2 = (id: number) =>
    Effect.tryPromise({
        try: () => fetch(`https://jsonplaceholder.typicode.com/todos/${id}`),
        // remap the error
        catch: (unknown) => new Error(`something went wrong ${unknown}`)
    })

//      ┌─── Effect<Response, Error, never>
//      ▼
const program8 = getTodo2(1)

//
// async
//

import * as NodeFS from "node:fs"

const readFile = (filename: string) =>
    Effect.async<Buffer, Error>((resume) => {
        NodeFS.readFile(filename, (error, data) => {
            if (error) {
                // Resume with a failed Effect if an error occurs
                resume(Effect.fail(error))
            } else {
                // Resume with a succeeded Effect if successful
                resume(Effect.succeed(data))
            }
        })
    })

//      ┌─── Effect<Buffer, Error, never>
//      ▼
const program9 = readFile("example.txt")

//
// subsequent resume calls
//

const program10 = Effect.async<number>((resume) => {
    resume(Effect.succeed(1))
    resume(Effect.succeed(2)) // This line will be ignored
})

// Run the program
Effect.runPromise(program10).then(console.log) // Output: 1

//
// interrupted async callback, return effect to be executed when interrupted
//

// Simulates a long-running operation to write to a file
const writeFileWithCleanup = (filename: string, data: string) =>
    Effect.async<void, Error>((resume) => {
        const writeStream = NodeFS.createWriteStream(filename)

        // Start writing data to the file
        writeStream.write(data)

        // When the stream is finished, resume with success
        writeStream.on("finish", () => resume(Effect.void))

        // In case of an error during writing, resume with failure
        writeStream.on("error", (err) => resume(Effect.fail(err)))

        // Handle interruption by returning a cleanup effect
        return Effect.sync(() => {
            console.log(`Cleaning up ${filename}`)
            NodeFS.unlinkSync(filename)
        })
    })

// Use a generator function (with `yield`) to create the effect
const program11 = Effect.gen(function* () {
    const fiber = yield* Effect.fork(
        writeFileWithCleanup("example.txt", "Some long data...")
    )
    // Simulate interrupting the fiber after 1 second
    yield* Effect.sleep("1 second")
    yield* Fiber.interrupt(fiber) // This will trigger the cleanup
})

// Run the program
Effect.runPromise(program11)

/*
  Output:
  Cleaning up example.txt
*/

//
// if the operation supports `AbortSignal` interruption
//

// A task that supports interruption using AbortSignal
const interruptibleTask = Effect.async<void, Error>((resume, signal) => {
    // Handle interruption
    signal.addEventListener("abort", () => {
        console.log("Abort signal received")
        clearTimeout(timeoutId)
    })

    // Simulate a long-running task
    const timeoutId = setTimeout(() => {
        console.log("Operation completed")
        resume(Effect.void)
    }, 2000)
})

const program12 = Effect.gen(function* () {
    const fiber = yield* Effect.fork(interruptibleTask)
    // Simulate interrupting the fiber after 1 second
    yield* Effect.sleep("1 second")
    yield* Fiber.interrupt(fiber)
})

// Run the program
Effect.runPromise(program12)

/*
  Output:
  Abort signal received
*/

//
// suspended effects
// ```
// const suspendedEffect = Effect.suspend(() => effect)
// ```
//

//
// lazy evaluation
//

let i = 0

const bad = Effect.succeed(i++)

const good = Effect.suspend(() => Effect.succeed(i++))

console.log(Effect.runSync(bad)) // Output: 0
console.log(Effect.runSync(bad)) // Output: 0

console.log(Effect.runSync(good)) // Output: 1
console.log(Effect.runSync(good)) // Output: 2

//
// circular dependencies
// Example (Recursive Fibonacci)
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
// unifying return type
//

/*
  Without suspending, TypeScript may struggle with type inference.

  Inferred type:
    (a: number, b: number) =>
      Effect<never, Error, never> | Effect<number, never, never>
*/
const withoutSuspend = (a: number, b: number) =>
    b === 0
        ? Effect.fail(new Error("Cannot divide by zero"))
        : Effect.succeed(a / b)

/*
  Using suspend to unify return types.

  Inferred type:
    (a: number, b: number) => Effect<number, Error, never>
*/
const withSuspend = (a: number, b: number) =>
    Effect.suspend(() =>
        b === 0
            ? Effect.fail(new Error("Cannot divide by zero"))
            : Effect.succeed(a / b)
    )
