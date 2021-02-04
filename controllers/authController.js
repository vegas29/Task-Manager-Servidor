const Usuario = require('../models/Usuario');
const bcryptjs = require('bcrypt');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) =>{
    //Revisar si hay errores

    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})
    }

    //Extraer el email y pass

    const {email, password} = req.body;

    try{
        //Revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({msg:'El usuario no existe'});
        }

        //Revisar el password

        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passCorrecto){
            return res.status(400).json({msg:'Password incorrecto'});
        }

        //Si todo es correcto
        //Crear y firmar el JWT
        const payload = {
            usuario:{
                id:usuario.id
            }
        };

        //firmar el token
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn : 3600 // uan our
        }, (error, token)=>{
            if(error) throw error;

            res.json({token});
            res.json({msg: 'El usuario se creo exitosamente'});
        });
    }catch(error){
        console.log(error);
    }
}