//this didnt work. Needs revising.
//console.log(__filename);
//console.log(__dirname);

//nodejs doesnt execute my code directly in each file. It is wrapped inside
//a function like this:
//This is the module wrapper function. All the "global" modules are not really global.
//(function (exports, require, module, __filename, __dirname) {
const EventEmitter = require('events');

var url = 'http://mylogger.io/log'


class Logger extends EventEmitter{
    //when a function is inside a class, its a method of that class.
    log(message) {
        //send http request
    
        console.log(message);
        this.emit('messageLogged', {id: 1, url: 'http://'}); // making a noise, produce a signaling
    
    }
    
}

//I can export the module's variables and functions with different names as I 
//desire.


//I can export module.exports."name" without this .name and the const that
//will execute this function will use it with its name by default. No need to
//search for the name here.
module.exports = Logger;
//module.exports.endPoint = url;

//}) 

