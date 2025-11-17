/**
 * @description Effect.promise with asynchronous computation guaranteed to succeed, otherwise "defect"
 * @file Effect.promise constructor
 */

import {Effect} from "effect";

const delay = (message: string) =>
    Effect.promise<string>(
        () =>
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve(message)
                }, 2000)
            })
    )

// Effect<string, never, never>
const program = delay("Async operation completed successfully!")
