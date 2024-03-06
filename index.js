const express = require('express');
require('./db/connection');
const app = express();
const port = 3000;
app.use(express.json());


const routeUsuarios = require('./routes/usuarios.routes');
const routeEnlaces = require('./routes/enlaces.routes');
const routeArchivos = require('./routes/archivos.routes');
const routeAuth = require('./routes/auth.routes');


app.use('/api/usuarios', routeUsuarios);
app.use('/api/enlaces', routeEnlaces);
app.use('/api/archivos', routeArchivos);
app.use('/api/auth', routeAuth);


app.listen(port, () => {
    console.log(`Example app listening on port on http://localhost:${port}`) 
  })