
// For
for (let i = 0; i < 10; i++) {
    if (i % 2 == 0) {
        console.log(`${i} is even`);
    } else {
        console.log(`${i} is odd`);
    }
}

// While
let j = 0;
while (j < 10) {
    console.log(`${j} is less than 10`);
    j++;
}

// Do-while
let l = 0;
do {
    console.log('Do-while loop');
    l++;
} while (l < 10);

// Switch
let k = 1;
switch (k) {
    case 1:
        console.log('Case 1');
        break;
    case 2:
        console.log('Case 2');
        break;
    default:
        console.log('Default');
}
