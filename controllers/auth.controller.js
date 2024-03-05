const Usuario = require("../models/usuarios.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { validationResult } = require("express-validator");

const loginUsuario = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const errores = validationResult(req);

    if (!errores.isEmpty()) {
      return res.status(400).json({
        errores: errores.array(),
      });
    }

    let usuario = await Usuario.findOne({ email });

    if (!usuario) {
      res.status(401).json({
        status: "error",
        message: "Credenciales incorrectas",
      });
      return next();
    }

    let pwd = await bcrypt.compare(password, usuario.password);
    if (!pwd) {
      return res.status(401).json({
        status: "error",
        message: "Password incorrecto",
      });
    }
    const secret = process.env.SECRET_JWT;
    const token = jwt.sign(
      {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
      },
      secret,
      {
        expiresIn: "8h",
      }
    );

    res.status(200).json({
      mensaje: "Autenticación conseguida",
      token,
    });

    return next();
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error autenticando usuario",
      error: error.message,
    });
  }
};

const usuarioAutenticado = async (req, res, next) => {
  try {

    return res.status(200).json({
      usuario: req.usuario  
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error obteniendo usuario autenticado",
      error: error.message,
    });
  }
};

module.exports = { loginUsuario, usuarioAutenticado };
