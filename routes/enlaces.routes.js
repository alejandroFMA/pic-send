const express = require ("express");
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken')
const enlaceController = require('../controllers/enlaces.controller')
const {check} = require('express-validator')


router.post('/crear', [
    check("nombre_original", "El nombre original es obligatorio").not().isEmpty(),
], verifyToken.getUsuarioAuth, 
enlaceController.nuevoEnlace );

router.get('/leer')

module.exports=router