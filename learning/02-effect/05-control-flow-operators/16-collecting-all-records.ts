
import { Effect, Console } from "effect"

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
