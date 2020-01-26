const Joi = require('joi')
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`))
app.use(express.json());

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
]

app.get('/', (req, res) =>{
    res.send('Hello world2');
});

app.get('/api/courses', (req, res) =>{
    res.send(courses);
});

app.get('/api/courses/:id', (req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course with the given id was not found')
    res.send(course)
})

app.post('/api/courses', (req,res)=>{
    const { error } = validateCourse(req.body); //getting result.error. Object Destructure
    if  (error){
        //400 bad request
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course = {
        id: courses.length +1,
        name: req.body.name
    };
    console.log('procesando...')
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req,res)=> {
    
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course with the given id was not found')

    const {error} = validateCourse(req.body); //getting result.error. Object Destructure
    if  (error){
        //400 bad request
        res.status(400).send(error.details[0].message);
        return;
    }
    //update course
    course.name = req.body.name
    //return updated course
    res.send(course);

})

app.delete('/api/courses/:id', (req,res)=>{
    //look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course with the given id was not found')
    console.log(`entre de nuevo y mira course: ${course}`)

    //delete course
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
})

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

//req.params are parameters for essential or required values.
//req.query are parameters to provide additional data for backend services. ?sortBy=Name
//app.get('/api/courses/:year/:month', (req,res)=>{
//        res.send(req.query);
//});
