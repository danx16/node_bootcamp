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

// Used synchronous version it is in the top level code and is only excuted once.
// The top level code actually only gets executed once right in the beginning

    const replaceTemplate = (temp, product) => {
        let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
        output = temp.replace(/{%IMAGE%}/g, product.image);   
        output = temp.replace(/{%PRICE%}/g, product.price);   
        output = temp.replace(/{%FROM%}/g, product.from);   
        output = temp.replace(/{%NUTRIENTS%}/g, product.nutrients);   
        output = temp.replace(/{%QUANTITY%}/g, product.quantity);   
        output = temp.replace(/{%PRICE%}/g, product.price);   
        output = temp.replace(/{%DESCRIPTION%}/g, product.description);   
        output = temp.replace(/{%ID%}/g, product.id);  
        
        if(!product.organic)
            output = temp.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
            return output;  
 
    };

    const tempOverview = fs.readFileSync(`${__dirname}/fc/templates/overview.html`, 'utf8'); 
    const tempCard = fs.readFileSync(`${__dirname}/fc/templates/template-card.html`, 'utf8'); 
    const tempProduct = fs.readFileSync(`${__dirname}/fc/templates/product.html`, 'utf8'); 

    const data = fs.readFileSync(`${__dirname}/fc/dev-data/data.json`, 'utf8'); // Read the file
    const dataObj = JSON.parse(data); // parse into an object

    const server = http.createServer((req, res) => {    
    const PathName = req.url;
    
    // Overview
    if (PathName === '/' || PathName === '/overview' ) {
        res.writeHead(200, {'Content-Type': 'text/html'});

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output); // to display the overview page
    } 

   // Product    
    else if (PathName === '/product') {
        res.end("This is the Product");
    }

    // About
    else if (PathName === '/about') {
        res.end('This is the About!');
    } 

    // API
    else if (PathName === '/api'){
    // do not read this file each time that there is a request and 
    // instead simply send back the data that we have in top level code

        res.writeHead(200, {'Content-Type': 'application/json'}); // telling the browser that index sending back JSON
        res.end(data);
    } 
    else {
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