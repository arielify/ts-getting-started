/**
 * @description Effect type syntax and usage
 * @file Effect type overview
 */

//
//          ┌─── Represents the success type
//          │        ┌─── Represents the error type
//          │        │      ┌─── Represents required dependencies
//          ▼        ▼      ▼
// Effect<Success, Error, Requirements>
//
// Cheatsheet:
//
// API                  Given	                                      Result
// ---                  -----                                         ------
// Effect.succeed       A           	                              Effect<A>
// Effect.fail     	    E                                             Effect<never, E>
// Effect.sync          () => A                                       Effect<A>
// Effect.try           () => A                                       Effect<A, UnknownException>
// Effect.try           (overload)	() => A, unknown => E	          Effect<A, E>
// Effect.promise       () => Promise<A>	                          Effect<A>
// Effect.tryPromise    () => Promise<A>	                          Effect<A, UnknownException>
// Effect.tryPromise    (overload)	() => Promise<A>, unknown => E    Effect<A, E>
// Effect.async         (Effect<A, E> => void) => void	              Effect<A, E>
// Effect.suspend       () => Effect<A, E, R>	                      Effect<A, E, R>
//
// Full list of constructors:
// https://effect-ts.github.io/effect/effect/Effect.ts.html#constructors
//

import { Effect, Context, Fiber } from "effect"

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

//          ┌─── Produces a value of type number
//          │       ┌─── Does not generate any errors
//          │       │      ┌─── Requires no dependencies
//          ▼       ▼      ▼
// Effect<number, never, never>
const success = Effect.succeed(42)

//          ┌─── Never produces a value
//          │      ┌─── Fails with an Error
//          │      │      ┌─── Requires no dependencies
//          ▼      ▼      ▼
// Effect<never, Error, never>
const failure = Effect.fail(new Error("Operation failed due to network error"))
