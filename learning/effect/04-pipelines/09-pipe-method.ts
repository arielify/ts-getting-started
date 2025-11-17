/**
 * Method `Effect.pipe` allows you to chain multiple operations together,
 * making your code more concise and readable.
 */

// In short:
// const result = effect.pipe(func1, func2, ..., funcN)
// or
// const result = pipe(effect, func1, func2, ..., funcN)

import { Effect } from "effect"

const addServiceCharge = (amount: number) => amount + 1

const applyDiscount = (
    total: number,
    discountRate: number
): Effect.Effect<number, Error> =>
    discountRate === 0
        ? Effect.fail(new Error("Discount rate cannot be zero"))
        : Effect.succeed(total - (total * discountRate) / 100)

const fetchTransactionAmount = Effect.promise(() => Promise.resolve(100))

const fetchDiscountRate = Effect.promise(() => Promise.resolve(5))

const program = Effect.all([
    fetchTransactionAmount,
    fetchDiscountRate
]).pipe(
    Effect.andThen(([transactionAmount, discountRate]) =>
        applyDiscount(transactionAmount, discountRate)
    ),
    Effect.andThen(addServiceCharge),
    Effect.andThen(
        (finalAmount) => `Final amount to charge: ${finalAmount}`
    )
)
