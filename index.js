require('dotenv').config()
const express = require('express');
const server = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');  
const path = require('path');
const productRouter = require('./routes/product')
const userRouter = require('./routes/user');
console.log('env',process.env.DB_PASSWORD);

//db connection
main().catch(err => console.log(err));
async function main() { 
    await mongoose.connect('mongodb+srv://shubham06:shubham060219@cluster0.jxklc.mongodb.net/ecommerceDatabase?retryWrites=true&w=majority&appName=Cluster0');
    console.log('Database connected');
}
 
 
 
 
//bodyParser
server.use(cors()); 
server.use(express.json());
server.use(morgan('default'));
server.use(express.static(process.env.PUBLIC_DIR));  
server.use('/products', productRouter.router);
server.use('/users', userRouter.router);
server.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'build','index.html'));
})
  

//MVC model-view-controller

server.listen(process.env.PORT, () => {
    console.log('server started')
});



















// const server = http.createServer((req, res) => {
//     console.log(req.url);

//     if(req.url.startsWith('/product')) {
//         const id = req.url.split('/')[2];
//         const product = products.find(p => p.id == (+id));
//         console.log(product);
//         res.setHeader('Content-Type', 'text/html');
//         let modifiedIndex = index.replace('**title**', product.title)
//             .replace('**price**', product.price)
//             .replace('**rating**', product.rating)
//             .replace('**url**', product.thumbnail);
//         res.end(modifiedIndex);
//         return;
//      }


//     switch (req.url) {
//         case '/':
//             res.setHeader('Content-Type', 'text/html');
//             res.end(index);
//             break;
//         case '/api':
//             res.setHeader('Content-Type', 'application/json');
//             res.end(JSON.stringify(data));
//             break;
        
//         default:
//             res.writeHead(404); 
//             res.end();


//     }
//     console.log("server started");
//     // res.setHeader('Dummy', 'DummyValue');

// });
// server.listen(8080);








// <------------------------------------------------------------------------------------->


// const lib = require('./lib.js');
// const express = require('express');

// console.log("hello");
// console.log("Jai Shri Ram");

// const server = express();
// server.listen(8080);



// import {sum, diff} from './lib.js'

// const fs = require('fs');
// // const txt = fs.readFileSync('demo.txt','utf-8');
// fs.readFile('demo.txt', 'utf-8', (err, txt) => {
//     console.log(txt);
// }); 

// console.log(lib.sum(2,3), lib.diff(5,4));