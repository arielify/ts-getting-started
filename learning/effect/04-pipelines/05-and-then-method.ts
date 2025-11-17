/**
 * Method `Effect.andThen` chains two actions,
 * where the second action can depend on the result of the first.
 *
 * The second action can be:
 * - A value (similar to `Effect.as`)
 * - A function returning a value (similar to `Effect.map`)
 * - A `Promise`
 * - A function returning a `Promise`
 * - An `Effect`
 * - A function returning an `Effect` (similar to `Effect.flatMap`)
 */

import { pipe, Effect, Option, Either } from "effect";

// In short:
// const transformedEffect = pipe(myEffect, Effect.andThen(anotherEffect))
// // or
// const transformedEffect = Effect.andThen(myEffect, anotherEffect)
// // or
// const transformedEffect = myEffect.pipe(Effect.andThen(anotherEffect))

// Function to apply a discount safely to a transaction amount
const applyDiscount = (
    total: number,
    discountRate: number
): Effect.Effect<number, Error> =>
    discountRate === 0
        ? Effect.fail(new Error("Discount rate cannot be zero"))
        : Effect.succeed(total - (total * discountRate) / 100)

// Simulated asynchronous task to fetch a transaction amount from database
const fetchTransactionAmount = Effect.promise(() => Promise.resolve(100))

// Using Effect.map and Effect.flatMap
const result1 = pipe(
    fetchTransactionAmount,
    Effect.map((amount) => amount * 2),
    Effect.flatMap((amount) => applyDiscount(amount, 5))
)

Effect.runPromise(result1).then(console.log) // Output: 190

// Using Effect.andThen
const result2 = pipe(
    fetchTransactionAmount,
    Effect.andThen((amount) => amount * 2),
    Effect.andThen((amount) => applyDiscount(amount, 5))
)

Effect.runPromise(result2).then(console.log) // Output: 190

//
// Option and either with `andThen`
//
// Both Option and Either are commonly used for handling optional or missing
// values or simple error cases. These types integrate well with Effect.andThen.
// When used with Effect.andThen, the operations are categorized as scenarios 5 and 6
// (as discussed earlier) because both Option and Either are treated as effects in this context.

//
// Example with Option
//

// Simulated asynchronous task fetching a number from a database
const fetchNumberValue = Effect.tryPromise(() => Promise.resolve(42))

// Effect<number, UnknownException | NoSuchElementException, never>
const programOption = pipe(
    fetchNumberValue,
    Effect.andThen((x) => (x > 0 ? Option.some(x) : Option.none()))
)

//
// > A value of type Option<A> is interpreted as an effect of type Effect<A, NoSuchElementException>
//

//
// Example with Either
//

// Function to parse an integer from a string that can fail
const parseInteger = (input: string): Either.Either<number, string> =>
    isNaN(parseInt(input))
        ? Either.left("Invalid integer")
        : Either.right(parseInt(input))

// Simulated asynchronous task fetching a string from database
const fetchStringValue = Effect.tryPromise(() => Promise.resolve("42"))

// Effect<number, string | UnknownException, never>
const programEither = pipe(
    fetchStringValue,
    Effect.andThen((str) => parseInteger(str))
)

// Although one might expect the type of program to be Effect<Either<number, string>, UnknownException, never>,
// it is actually Effect<number, string | UnknownException, never>.
//
// This is because Either<A, E> is treated as an effect of type Effect<A, E>,
// meaning the errors are combined into a union type.

//
// > A value of type Either<A, E> is interpreted as an effect of type Effect<A, E>.
//
