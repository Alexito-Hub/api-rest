require('dotenv').config();
const express = require('express');

const morgan = require("morgan")

const app = express();

const { runDB } = require('./database')

app.set('port', process.env.PORT || 3000)
app.set('json spaces', 2)

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

runDB().catch(console.dir);

app.listen(app.get('port'), () => {
    console.log(`Servidor en línea en el puerto ${app.get('port')}`);
}).on('error', (err) => {
    console.error("Error al iniciar el servidor:", err);
});
