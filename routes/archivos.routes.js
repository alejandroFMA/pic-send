const express = require ("express");
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken')
const archivosController = require('../controllers/archivos.controller')
const {check} = require('express-validator')



router.post('/subir',
verifyToken.getUsuarioAuth,
archivosController.subirArchivo);

router.delete('/borrar/:id', archivosController.borrarArchivo);

module.exports = router