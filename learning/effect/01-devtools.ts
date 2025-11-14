
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
// ^- should be run or assigned to a variable!
