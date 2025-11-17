/**
 * @description Install language service for IDE
 * @file Effect syntax highlighting in IDE
 */

// ```
// npm install @effect/language-service --save-dev
// ```
//
// tsconfig.json:
//
// ```
//    "plugins": [
//       {
//         "name": "@effect/language-service"
//       }
//     ]
// ```

import { Effect } from "effect";

Effect.log("Hello world!")
// ^- effect: Effect must be yielded or assigned to a variable. effect(floatingEffect)
