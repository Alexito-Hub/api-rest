require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;


const { MongoClient, ServerApiVersion } = require('mongodb');
const encodedPassword = encodeURIComponent(process.env.PASSWORD_DB);
const uri = `mongodb+srv://<span class="math-inline">\{process\.env\.USER\_DB\}\:</span>{encodedPassword}@serverdatadb.39fv13g.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

    await client.close();
  }
}
run().catch(console.dir);




app.use('/api/users', require('./routers/users'));
app.listen(port, () => console.log(`Servidor en línea en el puerto ${port}`));
