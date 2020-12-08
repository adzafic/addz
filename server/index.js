'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const app = express();
const port = process.env.PORT || 3000;
// conectar a la base de datps
connectDB();
//trasformar peticiones
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//endpoints
app.get('/', (req, res) => {
  res.send({ message: 'Hola mundo' });
});

app.listen(port, () => console.log(`Servidor lanzado en puerto: ${port}`));
