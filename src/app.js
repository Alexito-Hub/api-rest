require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@cluster0.mongodb.net/api-rest?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch(err => console.error('Error conectando a MongoDB:', err));

// Asegúrate de que mongoose esté conectado antes de escuchar en el puerto
mongoose.connection.on('connected', () => {
  app.use('/api/users', require('./routers/users'));

  app.listen(port, () => console.log(`Servidor en línea en el puerto ${port}`));
});
