const { MongoClient, ServerApiVersion } = require('mongodb');

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
        console.log("Database conectado con éxito");
    } catch (error) {
        console.log("Error al conectar con la base de datos:", error);
    }
}

module.exports = { runDB };