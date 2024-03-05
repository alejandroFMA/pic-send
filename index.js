const express = require('express');
require('./db/connection');
const app = express();
const port = 3000;
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
}) 

const routeUsuarios = require('./routes/usuarios.routes')
const routeEnlaces = require('./routes/enlaces.routes')
const routeAuth = require('./routes/auth.routes')


app.use('/api/usuarios', routeUsuarios)
app.use('/api/enlaces', routeEnlaces)
app.use('/api/auth', routeAuth)


app.listen(port, () => {
    console.log(`Example app listening on port on http://localhost:${port}`) 
  })