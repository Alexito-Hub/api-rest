require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

const uri = `mongodb+srv://<span class="math-inline">\{process\.env\.USER\_DB\}\:</span>{process.env.PASSWORD_DB}@cluster0.mongodb.net/api-rest?retryWrites=true&w=majority`;

mongoose.connect(uri)
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch(err => console.error('Error conectando a MongoDB:', err));

mongoose.connection.on('connected', () => {
  app.use('/api/users', require('./routers/users'));

  app.listen(port, () => console.log(`Servidor en línea en el puerto ${port}`));
});
