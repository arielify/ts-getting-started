/**
 * Constructor `Effect.tryPromise` with asynchronous computation that might fail.
 * The default error type is UnknownException.
 */

import {Effect} from "effect";

const getTodo = (id: number) =>
    // Will catch any errors and propagate them as UnknownException
    Effect.tryPromise(() =>
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
    )

// Effect<Response, UnknownException, never>
const program = getTodo(1);
