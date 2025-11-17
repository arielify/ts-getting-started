
import { Effect, Console } from "effect"

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
