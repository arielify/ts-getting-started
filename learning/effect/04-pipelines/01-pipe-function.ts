/**
 * Function `pipe` is a utility that allows us
 * to compose functions in a readable and sequential manner.
 * The result of each function becomes the input for the next function,
 * and the final result is returned.
 */

import { pipe } from "effect"

// In short:
// const result = pipe(input, func1, func2, ..., funcN)

// Define simple arithmetic operations
const increment = (x: number) => x + 1
const double = (x: number) => x * 2
const subtractTen = (x: number) => x - 10

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen)

console.log(result)
// Output: 2
