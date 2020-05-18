const fs = require('fs');
const http = require('http');
const url = require('url');

// - -  -  -  -  - - -  -  -  -  - 
// -- FILES

/*
// Blocking, synchronous way
const inputIn = fs.readFileSync('./fc/txt/input.txt', 'utf8');
console.log(inputIn);
const InputOut = `New avocado is availabe on: ${inputIn}. \n Created on ${Date.now()}`;
fs.writeFileSync(`./fc/txt/output.txt`, InputOut);
console.log(InputOut);

// Non-blocking, Asynchronous way
fs.readFile('./fc/txt/start.txt', 'utf8',(err, data1) => {
    fs.readFile(`./fc/txt/${data1}.txt`, 'utf8',(err, data2) => {
        console.log(data2);
        fs.readFile(`./fc/txt/append.txt`, 'utf8',(err, data3) => {
            console.log(data3);
            fs.writeFile('./fc/txt/final.txt',`${data2}\n${data3}`, 'utf8', err => {
            console.log('Your file has been written');
        })    
        });
    });
});
console.log('File is written!');

*/

// - -  -  -  -  - - -  -  -  -  - 
// -- SERVER

const server = http.createServer((req, res) => { 
    const PathName = req.url;
    
    if (PathName === '/' || PathName === '/Overview' ) {
        res.end('This is the Overview or Main');
    } else if (PathName === '/About') {
        res.end('This is the About!');
    } else {
        res.writeHead(404, {
            'Content-type' : 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>This page could not be found!</h1>');
    }

    res.end('Hello from the server'); // to execute on the browser
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000')
})