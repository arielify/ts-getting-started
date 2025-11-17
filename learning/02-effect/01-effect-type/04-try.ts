/**
 * Constructor `Effect.try` transforming exceptions to manageable errors.
 * The default error type is UnknownException.
 */

import {Effect} from "effect";

const parse = (input: string) =>
    // This might throw an error if input is not valid JSON
    Effect.try(() => JSON.parse(input))

// Effect<any, UnknownException, never>
const program = parse("")
try {
    console.log(Effect.runSync(program))
} catch (error) {
    console.error("Unexpected error:", error)
}
