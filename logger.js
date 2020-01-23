//this didnt work. Needs revising.
console.log(__filename);
console.log(__dirname);

//nodejs doesnt execute my code directly in each file. It is wrapped inside
//a function like this:
//This is the module wrapper function. All the "global" modules are not really global.
//(function (exports, require, module, __filename, __dirname) {



var url = 'http://mylogger.io/log'

function log(message) {
    //send http request

    console.log(message);
}

//I can export the module's variables and functions with different names as I 
//desire.


//I can export module.exports."name" without this .name and the const that
//will execute this function will use it with its name by default. No need to
//search for the name here.
module.exports = log;
//module.exports.endPoint = url;

//}) 

