/**
 * Constructor `Effect.fail` example.
 */

import {Data, Effect} from "effect";

class HttpError extends Data.TaggedError("HttpError")<{}> {}

// Effect<never, HttpError, never>
const program = Effect.fail(new HttpError())

try {
    let result = Effect.runSync(program);
    console.log(result);
} catch (error) {
    console.error("Unexpected error:", error);
}
