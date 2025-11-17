/**
 * Execute with the `Effect.runFork`.
 *
 * The foundational function for running effects,
 * returning a “fiber” that can be observed or interrupted.
 *
 * `Effect.runFork` is used to run an effect in the background by creating a fiber.
 * It is the base function for all other run functions.
 * It starts a fiber that can be observed or interrupted.
 *
 * > Unless you specifically need a `Promise` or synchronous operation,
 * > `Effect.runFork` is a good default choice.
 */

import { Effect, Console, Schedule, Fiber } from "effect"

// Effect<number, never, never>
const program = Effect.repeat(
    Console.log("running..."),
    Schedule.spaced("200 millis")
)

// RuntimeFiber<number, never>
const fiber = Effect.runFork(program)

setTimeout(() => {
    Effect.runFork(Fiber.interrupt(fiber))
}, 500)
