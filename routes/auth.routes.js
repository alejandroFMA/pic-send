const express = require ("express");
const router = express.Router();
const auth= require('../controllers/auth.controller')
const {check} = require('express-validator')


router.post('/login', auth.loginUsuario);
router.get('/usuario', auth.getUsuarioAuth);


module.exports=router