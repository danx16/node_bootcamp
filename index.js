const fs = require('fs');

// Blocking, synchronous way
// const inputIn = fs.readFileSync('./Came-from-course/txt/input.txt', 'utf8');
// console.log(inputIn);
// const InputOut = `New avocado is availabe on: ${inputIn}. \n Created on ${Date.now()}`;
// fs.writeFileSync(`./Came-from-course/txt/output.txt`, InputOut);
// console.log(InputOut);

// Non-blocking, Asynchronous way
fs.readFile('./Came-from-course/txt/start.txt', 'utf8',(err, data1) => {
    fs.readFile(`./Came-from-course/txt/${data1}.txt`, 'utf8',(err, data2) => {
        console.log(data2);
        fs.readFile(`./Came-from-course/txt/append.txt`, 'utf8',(err, data3) => {
            console.log(data3);

        //location,2function,utf,error=log
        fs.writeFile('./Came-from-course/txt/final.txt',`${data2}\n${data3}`, 'utf8', err => {
            console.log('Your file has been written');
        }  )    
        });
    });
});
console.log('File is written!');
