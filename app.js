// //----------------Introduction to nodejs

//     //how to declare a function. To run nodejs use in terminal: "node app.js"
//     //function sayHello(name) {
//     //    console.log('Hello ' + name);
//     //}

//     //sayHello('Javi');



// //Window is not defined. We do not have windows in node,
// //this only goes for the browser.
//     //console.log(window);

// //----------------2nd class continued

// /*all of these functions belong to the window object. We 
//   could call them all, but, in nodejs global is used 
//   instead.
// */

//     //console.log; //global. It is usable throughout all the nodejs project without importing it.
//     //setTimeout(); //calls a function after a delay.
//     //clearTimeout();
//     //setInterval();
//     //clearInterval();


//     //global.console.log

// //this shows undefined. This is because var message is not a globally declared variable.
// //message is only being created inside app.js. 
//     //var message = ''
//     //console.log(global.message);

// //this is not a global object. In node, every file is a module and the variables
// //and functions scoped in that file are part part of that module.
//     //console.log(module);

// //-----------------3rd class

// //to search module in current folder. I can use ../ or ./subFolder/ to search for 
// //previous folders from this files location
// //its better to assign CONST to variables that get functions instead of VAR in javascript because
// // if I redefine it like this var logger = 1, it will throw a nasty error. 
// const log = require('./logger');

// //i can use jshint library to find errors.
// log('message');


//Path module

// const path =require('path');

// //specifies folder path, base, ext, name.
// var pathObj = path.parse(__filename);
// console.log(pathObj.name)

//os module

// const os = require('os');
// var totalMemory = os.totalmem();
// var freeMemory = os.freemem();

// console.log(`Total memory: ${totalMemory}`)
// console.log(`Free memory: ${freeMemory}`)

//filesystem module

// const fs = require('fs');

// // //synchronous function. Straightforward
// // const files = fs.readdirSync('./');
// // console.log(files)

// //asynchronous function. Requires a callback. This callback always runs after running async
// fs.readdir('./', function(err,files){
//     if (err) console.log('Error', err);
//     else console.log('Result', files);
// })

//Events module
//first letter denotes a CLASS
// const EventEmitter = require('events'); //class
// //const emitter = new EventEmitter(); // actual object of that class


// //emitter.on('logging', (eventArg)=>{console.log('Logging...', eventArg)})
// const Logger = require('./logger')
// const logger = new Logger();

// //register a listener
// logger.on('messageLogged',(eventArg) =>{
//     console.log('Listener called', eventArg);
// })
// logger.log('messageee');
// //raise an event. Searches through all the listeners and calls the event synchronously.
// //emitter.emit('messageLogged', {id: 1, url: 'http://'}); // making a noise, produce a signaling

// //raise: logging (data:message)
// //emitter.emit('logging', {data: 'message'})


//------------------http module

const http = require('http')

const server = http.createServer((req, res)=>{
    if (req.url == '/'){
        res.write('Hello World!!!!');
        res.end();
    }

    if (req.url =='/api/courses' ){
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
});
server.on('connection', (socket)=>{
    console.log('New connection..');
})

server.listen(3000);

console.log('Listening on port 3000...');

