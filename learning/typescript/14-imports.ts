
import {hireDeveloper} from "./13-modules";
hireDeveloper()

import Worker from "./13-modules"; // import default
let worker = new Worker(); // but in the module it is Employee
worker.name = "John";
console.log(worker.name);

import {StaffMember as CoWorker} from "./13-modules"; // alias
let emp: CoWorker = new CoWorker();

import * as HR from "./13-modules";
HR.hireDeveloper();

// Relative imports:
// - start with / ./ or ../

// Non-relative imports:
// import * as $ from "jquery";

// Module resolution: node_modules
// tsc --moduleResolution Classic (AMD, UMD, System, ES2015) | Node | Node16 (CommonJS modules)
