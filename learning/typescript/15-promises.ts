
// Promises require ES2015 or higher

import {error} from "effect/Brand";

type User = { name: string, age: number };

// Promises are for asynchronous operations
function fetchUserData(id: number): Promise<User> {
    return fetch(`/api/users/${id}`)
        .then(response => response.json())
        .then(data => data as User)
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

// Using the promise
fetchUserData(1)
    .then(user => console.log(user))
    .catch(error => console.error(error));

// Creating a promise from scratch
function doAsyncWork(resolve, reject) {
    // perform async work here
    let success = true;
    if (success) resolve("some data")
    else reject("some error");
}

let p1: Promise<string> = new Promise(doAsyncWork);

let p2: Promise<string> = new Promise((resolve, reject) => {
    // perform async work here
    let success = true;
    if (success) resolve("some data")
    else reject("some error");
});

p2
    .then(data => console.log(data))
    .catch(error => console.error(error));
