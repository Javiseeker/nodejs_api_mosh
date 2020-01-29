const express =require('express');
const router = express.Router();
const Joi = require('joi');

const genres_test = [
    {id: 1, name: 'Terror'},
    {id: 2, name: 'Science Fiction'},
    {id: 3, name: 'Adventure'},
    {id: 4, name: 'Romance'},
    {id: 5, name: 'Comedy'}
]

//CRUD operations for genres
router.get('/',(req,res) => 
{
    res.send(genres_test);
})

router.get('/:id', (req,res) => 
{
    const genre = genres_test.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre with the given id was not found')
    res.send(genre)
})

router.post('/', (req,res) => 
{
    const { error } = validateGenre(req.body);
    if  (error) return res.status(400).send(error.details[0].message);
    const genre = {
        id: genres_test.length +1,
        name: req.body.name,
    };
    genres_test.push(genre);
    res.send(genre);
})

router.put('/:id', (req,res) =>
{
    const genre = genres_test.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Course with the given id was not found')

    const {error} = validateGenre(req.body); //getting result.error. Object Destructure
    if  (error) return res.status(400).send(error.details[0].message);
    genre.name = req.body.name
    res.send(genre);
})
router.delete('/:id', (req,res) => 
{
    const genre = genres_test.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Course with the given id was not found')
    //const index = genres_test.indexOf(genre);
    genres_test.splice(genres_test.indexOf(genre), 1);
    res.send(genre);
})

function validateGenre(genre){
    const schema = {
        name: Joi.string().required()
    };
    return Joi.validate(genre, schema);
}

module.exports = router