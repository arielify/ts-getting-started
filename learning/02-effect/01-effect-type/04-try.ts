/**
 * Constructor `Effect.try` transforming exceptions to manageable errors
 * where the default error type is UnknownException:
 * https://effect.website/docs/getting-started/creating-effects/#try
 */

import {Effect} from "effect";

const parse = (input: string) =>
    // This might throw an error if input is not valid JSON
    Effect.try(() => JSON.parse(input))

// Effect<any, UnknownException, never>
const program = parse("")
try {
    console.log(Effect.runSync(program)) // runSync doesn't expect errors, so it is a defect
} catch (error) {
    console.error("Unexpected error:", error)
}
