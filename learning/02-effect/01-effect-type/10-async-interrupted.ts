/**
 * Constructor `Effect.async` example with the interrupted async callback.
 * It returns an additional `Effect` to be executed when interrupted.
 */

import {Effect, Fiber} from "effect";
import * as NodeFS from "node:fs";

// Simulates a long-running operation to write to a file
const writeFileWithCleanup = (filename: string, data: string) =>
    Effect.async<void, Error>((resume) => {
        const writeStream = NodeFS.createWriteStream(filename)

        // Start writing data to the file
        writeStream.write(data)

        // When the stream is finished, resume with success
        writeStream.on("finish", () => resume(Effect.void))

        // In case of an error during writing, resume with failure
        writeStream.on("error", (err: any) => resume(Effect.fail(err)))

        // Handle interruption by returning a cleanup effect
        return Effect.sync(() => {
            console.log(`Cleaning up ${filename}`)
            NodeFS.unlinkSync(filename)
        })
    })

// Use a generator function (with `yield`) to create the effect
const program = Effect.gen(function* () {
    const fiber = yield* Effect.fork(
        writeFileWithCleanup("example.txt", "Some long data...")
    )

    // Simulate interrupting the fiber after 1 second
    yield* Effect.sleep("1 second")
    yield* Fiber.interrupt(fiber) // This will trigger the cleanup
})

// Run the program
Effect.runPromise(program)

// Output:
// ```
// Cleaning up example.txt
// ```
