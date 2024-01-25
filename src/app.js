require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;
const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@serverdatadb.39fv13g.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function runDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. Successfully connected to MongoDB!");
  } finally {
    // No need to close the connection here, let it be handled by a proper middleware
  }
}

app.use(express.json()); // Parse JSON bodies
app.use('/api/users', require('./routers/users'));

app.listen(port, () => {
  runDB().catch(console.dir);
  console.log(`Servidor en línea en el puerto ${port}`);
});
