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

app.use(cors())
app.set('port', process.env.PORT || 4003)
app.set('json spaces', 4)
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CONEXIONES PRIVADA _________________________________________________________
app.use('/private/user', require('./routes/private/user'));
app.use('/private/key', require('./routes/private/key'));
app.use('/private/socket', require('./routes/private/socket-token'))

app.use('/comments/lu', require('./routes/idf-ee/comments-lu'))
app.use('/comments/jamie', require('./routes/idf-ee/comments-jamie'))

// CONEXIONES DOWNLOAD _______________________________________________________
app.use('/api/download/ytdl-search', require('./routes/download/ytdl-search'));
app.use('/api/download/ytdl-mp4', require('./routes/download/ytdl-mp4'));
app.use('/api/download/ytdl-mp3', require('./routes/download/ytdl-mp3'));
app.use('/api/download/tiktok', require('./routes/download/tiktok'));


// CONEXIONES DATA _______________________________________________________


// CONEXIONES GAME _______________________________________________________


// CONEXIONES OTHERS ___________________________________________________________
app.use('/api/others/frases', require('./routes/others/frases'))


app.listen(app.get('port'), () => {
    db.once('open', () => {console.log('Base de datos conectada');});
    console.log(`Servidor en línea`);
}).on('error', (err) => {
    console.error("Error al iniciar el servidor:", err);
});
