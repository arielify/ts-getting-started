
import { Effect, Console } from "effect"

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
