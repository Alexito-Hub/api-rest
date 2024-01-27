require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require("morgan")
const cors = require('cors')
const app = express();

const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@serverdatadb.39fv13g.mongodb.net/Database?retryWrites=true&w=majority`;

mongoose.connect(uri)

const db = mongoose.connection;
db.on('error', (error) => {console.error('Error al conectar con la base de datos:', error)});

app.set('port', process.env.PORT || 3000)
app.set('json spaces', 4)
app.use(cors())
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CONEXIONES PRIVADA _________________________________________________________
app.use('/private/user', require('./routes/private/user'));
app.use('/private/key', require('./routes/private/key'));

// CONEXIONES DOWNLOAD _______________________________________________________


// CONEXIONES DATA _______________________________________________________


// CONEXIONES GAME _______________________________________________________


app.listen(app.get('port'), () => {
    db.once('open', () => {console.log('Base de datos conectada');});
    console.log(`Servidor en línea`);
}).on('error', (err) => {
    console.error("Error al iniciar el servidor:", err);
});
