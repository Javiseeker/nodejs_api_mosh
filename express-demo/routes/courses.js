const express =require('express');
const router = express.Router();
const Joi = require('joi');


const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
]

router.get('/', (req, res) =>{
    res.send(courses);
});

router.get('/:id', (req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course with the given id was not found')
    res.send(course)
})

router.post('/', (req,res)=>{
    const { error } = validateCourse(req.body); //getting result.error. Object Destructure
    if  (error){
        //400 bad request
        res.status(400).send(error.details[0].message);
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

router.put('/:id', (req,res)=> {
    
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

router.delete('/:id', (req,res)=>{
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

module.exports = router;