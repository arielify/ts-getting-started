/**
 * Passing `this` to a generator
 */

import { Effect } from "effect"

class MyClass {
    readonly local = 1
    compute = Effect.gen(this, function* () {
        const n = this.local + 1
        // ^- Potentially invalid reference access to a class field via 'this.' of a nested function
        // But the documentation says it is the correct design:
        // https://effect.website/docs/getting-started/using-generators/#passing-this

        yield* Effect.log(`Computed value: ${n}`)

        return n
    })
}

Effect.runPromise(new MyClass().compute).then(console.log)
// Output:
// ```
// timestamp=... level=INFO fiber=#0 message="Computed value: 2"
// 2
// ```
