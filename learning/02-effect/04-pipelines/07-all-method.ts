/**
 * Method `Effect.all` combines multiple effects into one,
 * returning results based on the input structure.
 *
 * The effects are executed in order,
 * and the result is a new effect containing the results as a tuple.
 * The results in the tuple match the order of the effects passed to Effect.all.
 */

//            ┌─── a tuple of effects
//            ▼
// Effect.all([effect1, effect2, ...])

//
// Example: Combining configuration and database checks
//

import { Effect } from "effect"

// Simulated function to read configuration from a file
const webConfig = Effect.promise(() =>
    Promise.resolve({ dbConnection: "localhost", port: 8080 })
)

// Simulated function to test database connectivity
const checkDatabaseConnectivity = Effect.promise(() =>
    Promise.resolve("Connected to Database")
)

// Combine both effects to perform startup checks
const startupChecks = Effect.all([webConfig, checkDatabaseConnectivity])

Effect.runPromise(startupChecks).then(([config, dbStatus]) => {
    console.log(
        `Configuration: ${JSON.stringify(config)}\nDB Status: ${dbStatus}`
    )
})

// Output:
// ```
// Configuration: {"dbConnection":"localhost","port":8080}
// DB Status: Connected to Database
// ```
