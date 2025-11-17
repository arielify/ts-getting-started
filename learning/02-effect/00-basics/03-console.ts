/**
 * The idea behind `Console` as an effect is that it allows us to log messages
 * between different steps of our program.
 */

import { Effect, Console } from "effect";

// Create an Effect that logs a message
const program = Console.log("Hello, World!");

// Nothing happens yet - the Effect is just a description
console.log("No output yet.");

// Execute the Effect to actually log
Effect.runSync(program); // Outputs: Hello, World!

// Compose with other Effects (more about Effect.gen later)
const complexProgram = Effect.gen(function* () {
    yield* Console.log("Starting...");
    const result = yield* Effect.succeed(42);
    yield* Console.log("Result:", result);
    return result;
});

Effect.runSync(complexProgram);
