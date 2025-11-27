/**
 * Constructor `Effect.try` transforming exceptions to manageable errors
 * where the default error type is UnknownException, but it can be customized:
 * https://effect.website/docs/getting-started/creating-effects/#customizing-error-handling
 */

import {Effect} from "effect";

const parse = (input: string) =>
    Effect.try({
        // JSON.parse may throw for bad input
        try: () => JSON.parse(input),
        // remap the error
        catch: (unknown) => new Error(`something went wrong ${unknown}`)
    })

// Effect<any, Error, never>
const program = parse("")
try {
    console.log(Effect.runSync(program)) // runSync doesn't expect errors, so it is a defect
} catch (error) {
    console.error("Unexpected error:", error)
}
