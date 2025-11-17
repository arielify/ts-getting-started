/**
 * Record is a built-in TypeScript utility type that creates an object
 * type with a set of properties. It's defined as:
 *
 * ```
 * Record<Keys, Type>
 * ```
 */

// Simple record with string keys and number values
type Scores = Record<string, number>

const gameScores: Scores = {
    player1: 100,
    player2: 95,
    player3: 87
}

console.log(gameScores);

// Record with specific keys
type RGB = Record<'red' | 'green' | 'blue', number>

const color: RGB = {
    red: 255,
    green: 128,
    blue: 0
}

console.log(color);
console.log(color.red);
console.log(color['green']);
console.log(color['blue' as keyof RGB]);
console.log(color.yellow); // undefined
