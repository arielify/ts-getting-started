/**
 * Method `Effect.map` transforms the value inside an effect by applying a function to it.
 */

import { pipe, Effect } from "effect"

// In short:
// const mappedEffect = pipe(myEffect, Effect.map(transformation))
// // or
// const mappedEffect = Effect.map(myEffect, transformation)
// // or
// const mappedEffect = myEffect.pipe(Effect.map(transformation))

// Function to add a small service charge to a transaction amount
const addServiceCharge = (amount: number) => amount + 1

// Simulated asynchronous task to fetch a transaction amount from database
const fetchTransactionAmount = Effect.promise(() => Promise.resolve(100))

// Apply service charge to the transaction amount
const finalAmount = pipe(
    fetchTransactionAmount,
    Effect.map(addServiceCharge)
)

Effect.runPromise(finalAmount).then(console.log) // Output: 101
