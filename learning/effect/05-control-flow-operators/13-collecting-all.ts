
//            ┌─── a tuple of effects
//            ▼
// Effect.all([effect1, effect2, ...])

//
// Example (Combining Effects in Tuples)
//

import { Effect, Console } from "effect"

const tupleOfEffects = [
    Effect.succeed(42).pipe(Effect.tap(Console.log)),
    Effect.succeed("Hello").pipe(Effect.tap(Console.log))
] as const

//      ┌─── Effect<[number, string], never, never>
//      ▼
const resultsAsTuple = Effect.all(tupleOfEffects)

Effect.runPromise(resultsAsTuple).then(console.log)
/*
Output:
42
Hello
[ 42, 'Hello' ]
*/

//
// Example (Combining Effects in Iterables)
//

const iterableOfEffects: Iterable<Effect.Effect<number>> = [1, 2, 3].map(
    (n) => Effect.succeed(n).pipe(Effect.tap(Console.log))
)

//      ┌─── Effect<number[], never, never>
//      ▼
const resultsAsArray = Effect.all(iterableOfEffects)

Effect.runPromise(resultsAsArray).then(console.log)
/*
Output:
1
2
3
[ 1, 2, 3 ]
*/

//
// Example (Combining Effects in Structs)
//

const structOfEffects = {
    a: Effect.succeed(42).pipe(Effect.tap(Console.log)),
    b: Effect.succeed("Hello").pipe(Effect.tap(Console.log))
}

//      ┌─── Effect<{ a: number; b: string; }, never, never>
//      ▼
const resultsAsStruct = Effect.all(structOfEffects)

Effect.runPromise(resultsAsStruct).then(console.log)
/*
Output:
42
Hello
{ a: 42, b: 'Hello' }
*/

//
// Example (Combining Effects in Records)
//

const recordOfEffects: Record<string, Effect.Effect<number>> = {
    key1: Effect.succeed(1).pipe(Effect.tap(Console.log)),
    key2: Effect.succeed(2).pipe(Effect.tap(Console.log))
}

//      ┌─── Effect<{ [x: string]: number; }, never, never>
//      ▼
const resultsAsRecord = Effect.all(recordOfEffects)

Effect.runPromise(resultsAsRecord).then(console.log)
/*
Output:
1
2
{ key1: 1, key2: 2 }
*/

//
// Short-Circuiting Behavior
//

const program = Effect.all([
    Effect.succeed("Task1").pipe(Effect.tap(Console.log)),
    Effect.fail("Task2: Oh no!").pipe(Effect.tap(Console.log)),
    // Won't execute due to earlier failure
    Effect.succeed("Task3").pipe(Effect.tap(Console.log))
])

Effect.runPromiseExit(program).then(console.log)
/*
Output:
Task1
{
  _id: 'Exit',
  _tag: 'Failure',
  cause: { _id: 'Cause', _tag: 'Fail', failure: 'Task2: Oh no!' }
}
*/

//
// The mode option
//

// Example (Collecting Results with mode: "either")
const effects2 = [
    Effect.succeed("Task1").pipe(Effect.tap(Console.log)),
    Effect.fail("Task2: Oh no!").pipe(Effect.tap(Console.log)),
    Effect.succeed("Task3").pipe(Effect.tap(Console.log))
]

const program2 = Effect.all(effects2, { mode: "either" })

Effect.runPromiseExit(program2).then(console.log)
/*
Output:
Task1
Task3
{
  _id: 'Exit',
  _tag: 'Success',
  value: [
    { _id: 'Either', _tag: 'Right', right: 'Task1' },
    { _id: 'Either', _tag: 'Left', left: 'Task2: Oh no!' },
    { _id: 'Either', _tag: 'Right', right: 'Task3' }
  ]
}
*/

// Example (Collecting Results with mode: "validate")
const effects3 = [
    Effect.succeed("Task1").pipe(Effect.tap(Console.log)),
    Effect.fail("Task2: Oh no!").pipe(Effect.tap(Console.log)),
    Effect.succeed("Task3").pipe(Effect.tap(Console.log))
]

const program3 = Effect.all(effects3, { mode: "validate" })

Effect.runPromiseExit(program3).then((result) => console.log("%o", result))
/*
Output:
Task1
Task3
{
  _id: 'Exit',
  _tag: 'Failure',
  cause: {
    _id: 'Cause',
    _tag: 'Fail',
    failure: [
      { _id: 'Option', _tag: 'None' },
      { _id: 'Option', _tag: 'Some', value: 'Task2: Oh no!' },
      { _id: 'Option', _tag: 'None' }
    ]
  }
}
*/
