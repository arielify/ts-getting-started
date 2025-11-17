// noinspection GrazieInspection
//
// Cheatsheet:
//
// API              Given           Result
// ---              -----           ------
// runSync          Effect<A, E>    A
// runSyncExit      Effect<A, E>    Exit<A, E>
// runPromise       Effect<A, E>    Promise<A>
// runPromiseExit   Effect<A, E>    Promise<Exit<A, E>>
// runFork          Effect<A, E>    RuntimeFiber<A, E>
//
// All functions:
// https://effect-ts.github.io/effect/effect/Effect.ts.html#running-effects
//
