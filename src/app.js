require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const MongoClient = require("mongodb");

const client = new MongoClient("mongodb+srv://myusername:mypassword@mycluster.mongodb.net/mydb");

client.connect((err, db) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Conectado a la base de datos");
  }
});



app.use('/api/users', require('./routers/users'));
app.listen(port, () => console.log(`Servidor en línea en el puerto ${port}`));
