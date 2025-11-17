
import { Effect, Random } from "effect"

const randomIntOption = Random.nextInt.pipe(
    Effect.whenEffect(Random.nextBoolean)
)

console.log(Effect.runSync(randomIntOption))
/*
Example Output:
{ _id: 'Option', _tag: 'Some', value: 8609104974198840 }
*/
