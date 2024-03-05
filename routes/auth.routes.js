const express = require ("express");
const router = express.Router();
const auth = require('../controllers/auth.controller')
const verifyToken = require('../middlewares/verifyToken')
 
const {check} = require('express-validator')


router.post('/login', [
    check("email", "Añade un email válido").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty()   
], auth.loginUsuario);
router.get('/usuario', verifyToken.getUsuarioAuth, auth.usuarioAutenticado);


module.exports=router