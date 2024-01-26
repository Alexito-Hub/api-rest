require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;
const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@serverdatadb.39fv13g.mongodb.net/?retryWrites=true&w=majority`;

const db = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function runDB() {
  try {
    await db.connect();
    await db.db("admin").command({ ping: 1 });
    console.log("Database conectado con exito");
  } finally {

  }
}

app.listen(port, () => {
  runDB().catch(console.dir);
  console.log(`Servidor en línea en el puerto ${port}`);
});
