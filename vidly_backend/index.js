const express = require('express');
const genres = require('./routes/genres')
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`))

app.use(express.json());
app.use(express.urlencoded({ extended : true})); // key=value&key=value
app.use(express.static('public'));
app.use('/api/genres', genres);