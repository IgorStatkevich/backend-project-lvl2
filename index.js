import fs from 'fs';

const file1 = JSON.parse(fs.readFileSync('./src/file1.json', 'utf-8'));
const file2 = JSON.parse(fs.readFileSync('./src/file2.json', 'utf-8'));

console.log(file1);
console.log(file2);
