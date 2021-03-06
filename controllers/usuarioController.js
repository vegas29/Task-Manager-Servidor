const Usuario = require('../models/Usuario');
const bcryptjs = require('bcrypt');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) =>{
   
    //Revisar si hay errores

    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})
    }
    //extraer email y password

    const {email, password} = req.body;
   
    try{
        //Revisar que el usuario regstrado sea unico

        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({msg: 'El usuario ya existe'});
        }

        //crear el nuevo usuario
        usuario = new Usuario(req.body);

        //Hashear el passowrd
        const salt = await bcryptjs.genSalt(10);
        usuario.password =  await bcryptjs.hash(password, salt);

        //guardar

        await usuario.save();

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
        
        //mensaje

        
    }catch(error){
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}