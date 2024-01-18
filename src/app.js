require('dotenv').config()
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@cluster0-OMITTED.mongodb.net/` + `api-rest?retryWrites=true&w=majority`;
// Prints "MongoServerError: bad auth Authentication failed."
mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000
})
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log(e))


app.use('/api/users', require('./routers/users'));

app.listen(port, () => {
    console.log('Servidor en linea')
})