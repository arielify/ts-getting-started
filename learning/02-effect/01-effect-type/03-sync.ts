/**
 * Constructor `Effect.sync` example where the error will be a "defect":
 * https://effect.website/docs/getting-started/creating-effects/#sync
 */

import {Effect} from "effect";

const log = (message: string) =>
    Effect.sync(() => {
        if (message === '') {
            throw new Error('Empty message');
        }
        console.log(message) // side effect
    })

// Effect<void, never, never>
const program = log("Hello, World!");
Effect.runSync(program);

// Defect
const programWithDefect = log('');
try {
    Effect.runSync(programWithDefect);
} catch (error) {
    console.error("Unexpected error:", error);
}
