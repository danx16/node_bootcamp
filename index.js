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
        output = output.replace(/{%IMAGE%}/g, product.image);
        output = output.replace(/{%PRICE%}/g, product.price);
        output = output.replace(/{%FROM%}/g, product.from);
        output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
        output = output.replace(/{%QUANTITY%}/g, product.quantity);
        output = output.replace(/{%DESCRIPTION%}/g, product.description);
        output = output.replace(/{%ID%}/g, product.id);


        if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
        return output;
        
    }

    // Read the template overview
    const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf8'); 
    const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf8'); 
    const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf8');

    const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf8'); // Read the file
    const dataObj = JSON.parse(data); // parse into an object

    const server = http.createServer((req, res) => { 
    
    const {query, pathname} = url.parse(req.url, true);   

    // Overview
    if (pathname === '/' || pathname === '/overview' ) {
        res.writeHead(200, {'Content-Type': 'text/html'});

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('') // use tempCard function and element of json. // Which is data of the propertoes
        // dataObj = holds all the product and each iteration, we will replace the placeholders
        //            in the template card with the current product which is el or element
        //            and this () => () arrow function implicitly return it here

        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
    } 

   // Product    
    else if (pathname === '/product') {
       res.writeHead(200, {'Content-Type': 'text/html'});
       // Readetrieving an element based on a query string
       const productDisplay = dataObj[query.id]; // Product right from this data object 

       // ReplaceTemplate to put in a template and a product. So product is an object with all of these properties
       // So in replaceTemplate, we pass in the template product that we loaded up from the tempProduct
       const output = replaceTemplate(tempProduct, productDisplay); 

       res.end(output);
    }

    // API
    else if (pathname === '/api'){
    // do not read this file each time that there is a request and 
    // instead simply send back the data that we have in top level code

        res.writeHead(200, {'Content-Type': 'application/json'}); // telling the browser that index sending back JSON
        res.end(data);
    } 

    // Not Found
    else {
        res.writeHead(404, {
            'Content-type' : 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>This page could not be found!</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000')
})