const jwt = require("jsonwebtoken");
require("dotenv").config()

const getUsuarioAuth = (req, res, next) => {
  try {

    const authHeader= req.get("Authorization");
    const token = authHeader.split(' ')[1]

    if(!authHeader){
        res.status(401).json({
            status: "error",
            message: "Error obteniendo autorización, JWT no válido",
            error: error.message,
        });
    };
    const secret = process.env.SECRET_JWT;
    const usuario = jwt.verify(token, secret)
    req.usuario = usuario

    next()
  } catch (error) {
   console.log(error.message)
  }
};

module.exports = {getUsuarioAuth}