const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const courses = require('./routes/courses');
const homepage = require('./routes/homepage');
const express = require('express');
const logger = require('./middleware/logger');
const authenticator = require('./authenticator')
const app = express();


const port = process.env.PORT || 3000;

//configuration. Not used for passwords or any improtant variables. These are stored in env vars.
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));
//process.env.NODE_ENV // UNDEFINED, it can be dev, testing, staging, production. This is one way.
console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
//another way to get the current environment. returns development by default.
console.log(`app: ${app.get('env')}`)
app.get('env')
app.listen(port, () => console.log(`Listening on port ${port}`))
app.use(express.json()); //{data:id}
app.use(express.urlencoded({ extended : true})); // key=value&key=value
app.use(express.static('public'));
app.use(helmet());
app.set('view engine', 'pug');
app.set('views', './views'); //default. optional setting
//aqui estoy utilizando dejando por default /api/courses. Por lo tanto lo quito en los endpoints de courses.js
app.use('/api/courses', courses);
//homepage
app.use('', homepage);


if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...')
}

//db work...
dbDebugger('Connected to the database...')

app.use(logger);
app.use(authenticator);




//req.params are parameters for essential or required values.
//req.query are parameters to provide additional data for backend services. ?sortBy=Name
//app.get('/api/courses/:year/:month', (req,res)=>{
//        res.send(req.query);
//});
