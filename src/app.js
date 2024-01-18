require('dotenv').config()
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use('/api/users', require('./routers/users'));

app.listen(port, () => {
    console.log('Servidor en linea')
})