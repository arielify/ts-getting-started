/**
 * Constructor `Effect.tryPromise` with asynchronous computation that might fail.
 * The default error type is UnknownException, but it can be customized.
 */

import {Effect} from "effect";

const getTodo = (id: number) =>
    Effect.tryPromise({
        try: () => fetch(`https://jsonplaceholder.typicode.com/todos/${id}`),
        // remap the error
        catch: (unknown) => new Error(`something went wrong ${unknown}`)
    })

// Effect<Response, Error, never>
const program = getTodo(1);
