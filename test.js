const fs = require('fs');

console.log('1. Start of script...');

//Synchronous operation (blocking)
console.log('2. Reading file synchronously...');
const dataSync = fs.readFileSync('user.txt', 'utf-8');
console.log('3. Synchronous file read complete..');

//Asynchronous operation (non-blocking)
console.log('4. Reading file asynchronously...');
fs.readFile('user.txt', 'utf-8', (err, dataAsync) => {
    if (err) throw err;
    console.log('6. Asynchronous file read complete...');
});

console.log('5. End of script...');