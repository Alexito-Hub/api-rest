require('dotenv').config();
const express = require('express');
const morgan = require("morgan")

const app = express();

app.set('port', process.env.PORT || 3000)
app.set('json spaces', 2)

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
    console.log(`Servidor en línea en el puerto ${app.get('port')}`);
}).on('error', (err) => {
    console.error("Error al iniciar el servidor:", err);
});
