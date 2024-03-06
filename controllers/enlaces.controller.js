const { nanoid } = require("nanoid");
const Enlaces = require("../models/enlaces.model");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const nuevoEnlace = async (req, res, next) => {
  try {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
      return res.status(400).json({
        errores: errores.array(),
      });
    }

    const { nombre_original } = req.body;
    console.log(req.usuario);

    const url = nanoid();
    const name = nanoid();
    const timestamp = Date.now();

    const enlace = new Enlaces({
      url: url,
      nombre_original,
      nombre: `${name}-${timestamp}`,
    });

    if (req.usuario) {
      const { password, descargas } = req.body;

      if (password) {
        let nuevoPassword = await bcrypt.hash(password, 10);
        enlace.password = nuevoPassword;
      }
      if (descargas) {
        enlace.descargas = descargas;
      }

      enlace.autor = req.usuario.id;
    }

    await enlace.save();

    return res.status(200).json({
      message: "Nuevo enlace",
      enlace,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error creando nuevo enlace",
      error: error.message,
    });
  }
};

const obtenerEnlace = async (req, res, next) => {
  try {
    const { url } = req.params.url;

    let enlace = await Enlaces.findOne(url);

    if (!enlace) {
      res.status(404).json({
        status: "error",
        message: "Enlace no existe",
      });
      return next();
    }

    res.status(200).json({
      url: req.params.url,
      message: "Enlace correcto",
      archivo: enlace.nombre,
    });

    const { descargas,nombre } = enlace;
    if (descargas === 1) {
      req.archivo = nombre      
      next()
    } else {
      descargas--;
      await enlace.save();
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
  

module.exports = { nuevoEnlace, obtenerEnlace };
