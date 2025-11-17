
import { Effect, Console } from "effect"

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
