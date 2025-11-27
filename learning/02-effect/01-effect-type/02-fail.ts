/**
 * Constructor `Effect.fail` example:
 * https://effect.website/docs/getting-started/creating-effects/#fail
 */

import {Data, Effect} from "effect";

class HttpError extends Data.TaggedError("HttpError")<{}> {}

// Effect<never, HttpError, never>
const program = Effect.fail(new HttpError())
console.log(program) // Effect

try {
    let result = Effect.runSync(program); // FiberFailure "defect"
    console.log(result);
} catch (error) {
    console.error("Unexpected error:", error);
}
