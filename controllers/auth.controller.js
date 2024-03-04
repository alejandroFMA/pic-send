const Usuario = require("../models/usuarios.model");


const loginUsuario = async (req,res,next)=> {

    try {

        const {email} = req.body;

        let existeUsuario = await Usuario.findOne({email});

       if(!existeUsuario){
        return res.status(400).json({
            status: "error",
            message: "Usuario no existe",
          });
       }; 

       return res.status(200).json({
        mensaje:"Autenticación conseguida"
       })
        
    } catch (error) {
        res.status(500).json({
            status:"error",
            message: "Error autenticando usuario",
            error: error.message
        });
     
    }

};

const getUsuarioAuth = async (req,res) => {

    try {
        
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error obteniendo usuario autenticado",
            error: error.message,
    });
    }
};



module.exports = {loginUsuario, getUsuarioAuth}