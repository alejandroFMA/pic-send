const express = require ("express");
const router = express.Router();
const {nuevoUsuario} = require('../controllers/usuarios.controller')
const {check} = require('express-validator')


router.post('/crear', [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "Añade un email válido").isEmail(),
    check("password", "El password debe ser de al menos seis caracteres").isLength({min:6})    
], nuevoUsuario);

module.exports=router