require('dotenv').config()
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const mongoose = require('mongoose');

function CONNECTION_DB(dbname) {
    return `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@cluster0.ncdk5.mongodb.net/${dbname}?retryWrites=true&w=majority`;
}

mongoose.connect(CONNECTION_DB('api-rest'),
    { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log(e))

app.use('/api/users', require('./routers/users'));

app.listen(port, () => {
    console.log('Servidor en linea')
})