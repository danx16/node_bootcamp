const fs = require('fs'); // access or reading data

const textIn = fs.readFileSync('./Came-from-course/txt/input.txt', 'utf8');
console.log(textIn);

// text
// fs.writeFile
//console.log(fs.writeFile)


const textOut = `This is the avocado : ${textIn}.\n Created on ${Date.now()}`;
fs.writeFileSync('./Came-from-course/txt/output.txt', textOut);

console.log('Text written!');