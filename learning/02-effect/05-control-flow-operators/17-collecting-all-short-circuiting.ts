
import { Effect, Console } from "effect"

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
