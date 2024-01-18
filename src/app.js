require('dotenv').config()
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const mongoose = require('mongoose');



const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@cluster0.mongodb.net/api-rest?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión a MongoDB exitosa');
  })
  .catch((err) => {
    console.error('Error conectando a MongoDB:', err);
  });






app.use('/api/users', require('./routers/users'));

app.listen(port, () => {
    console.log('Servidor en linea')
})