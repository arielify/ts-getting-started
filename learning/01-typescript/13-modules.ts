
// Modules:
// - encapsulation
// - re-usability
// - high-level abstraction

export interface Person {}

export function hireDeveloper(): void {
    console.log("Hired a developer!");
}

export default class Employee implements Person {
    name: string;
}

class Manager {
    name: string;
}

export { Manager, Employee as StaffMember };
