
// if i dont have a folder with this name, and want it to be imported from
// the node modules folder, then i only need to import it as it is, just the name.
var _ = require('underscore');

//flow of imported libraries search.
// 1. core module, from within nodejs.
// 2. file or folder, made in my project.
// 3. node_module, third party

var result = _.contains([1,2,3],2)
console.log(result);