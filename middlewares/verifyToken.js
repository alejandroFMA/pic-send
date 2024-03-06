const jwt = require("jsonwebtoken");
require("dotenv").config()

const getUsuarioAuth = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");

    if (authHeader) {
      const token = authHeader.split(' ')[1];

      if (token) {
        const secret = process.env.SECRET_JWT;
        const usuario = jwt.verify(token, secret);
        req.usuario = usuario;
      }
    }
  } catch (error) {
    console.log(error.message);
    console.log('Token no válido');
  }
  
  next(); 
};

module.exports = {getUsuarioAuth}