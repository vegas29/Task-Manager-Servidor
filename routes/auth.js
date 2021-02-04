//Rutas para autenticar usuarios

const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authController');

//Crear un usuario

//api/auth

router.post('/',
    [
       
        check('email', 'Agregar un email valido').isEmail(),
        check('password', 'La contraseña debe ser minimo de 6 caracteres').isLength({min:6})
    ],
    authController.autenticarUsuario
);

module.exports = router;