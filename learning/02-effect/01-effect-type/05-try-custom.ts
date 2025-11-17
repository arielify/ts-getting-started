/**
 * Constructor `Effect.try` transforming exceptions to manageable errors.
 * The default error type is UnknownException, but it can be customized.
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
    console.log(Effect.runSync(program))
} catch (error) {
    console.error("Unexpected error:", error)
}
