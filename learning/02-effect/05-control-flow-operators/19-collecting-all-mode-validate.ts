
import { Effect, Console } from "effect"

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
