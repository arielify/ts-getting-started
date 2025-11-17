/**
 * Install language service for IDE with Effect syntax highlighting in IDE:
 * https://effect.website/docs/getting-started/devtools/
 *
 * ```
 * npm install @effect/language-service --save-dev
 * ```
 *
 * tsconfig.json:
 *
 * ```
 * {
 *   "compilerOptions": {
 *     "plugins": [
 *        {
 *          "name": "@effect/language-service"
 *        }
 *     ]
 *   }
 * }
 * ```
 */

import { Effect } from "effect";

Effect.log("Hello world!")
// ^- effect: Effect must be yielded or assigned to a variable. effect(floatingEffect)
