/**
 * Method `Effect.all` combines effects in Tuples:
 *
 * ```
 *            ┌─── a tuple of effects
 *            ▼
 * Effect.all([effect1, effect2, ...])
 * ```
 */

import { Effect, Console } from "effect";

const tupleOfEffects = [
    Effect.succeed(42).pipe(Effect.tap(Console.log)),
    Effect.succeed("Hello").pipe(Effect.tap(Console.log))
] as const;

// Effect<[number, string], never, never>
const resultsAsTuple = Effect.all(tupleOfEffects);

Effect.runPromise(resultsAsTuple).then(console.log);

// Output:
// ```
// 42
// Hello
// [ 42, 'Hello' ]
// ```
