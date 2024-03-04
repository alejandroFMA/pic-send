const Usuario = require("../models/usuarios.model");
const bcrypt = require("bcrypt");
const {validationResult} = require('express-validator');

exports.nuevoUsuario = async (req, res) => {
  let body = req.body;
  try {

    // if (!body.nombre || !body.email || !body.password) {
    //     return res.status(400).json({
    //       status: "error",
    //       message: "Obligatorio enviar todos los datos",
    //     });
    // };

    //Validación email existente
    
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({
            errores: errores.array()
        });
    }
    
    
    const {email} = body
    let existeUsuario = await Usuario.findOne({email});

    if (existeUsuario) {
      return res.status(400).json({
        status: "error",
        message: "Email ya existente",
      });
    };

    body.password = await bcrypt.hash(body.password, 10); //Hasheo de password
    let nuevoUsuario = new Usuario(body);
    
    await nuevoUsuario.save();
    nuevoUsuario.password = undefined;

    return res.status(201).json({
      status: "Usuario creado correctamente",
      usuario: nuevoUsuario,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error registrando usuario",
      error: error.message,
    });
  }
};
