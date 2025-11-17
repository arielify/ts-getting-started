
import { Effect, Random, Console } from "effect"

const flipTheCoin = Effect.if(Random.nextBoolean, {
    onTrue: () => Console.log("Head"), // Runs if the predicate is true
    onFalse: () => Console.log("Tail") // Runs if the predicate is false
})

Effect.runFork(flipTheCoin)
