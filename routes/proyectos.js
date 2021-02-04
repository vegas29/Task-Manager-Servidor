const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//Proyecto
//api/proyectos
router.post('/',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],   
    proyectoController.crearProyecto
);

//Obtener todos los proye
router.get('/',
    auth,   
    proyectoController.obtenerProyectos
);



//Actualizar proyecto por id

router.put('/:id',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],   
    proyectoController.actualizarProyecto
);

//Eliminar un proyecto

router.delete('/:id',
    auth,  
    proyectoController.eliminarProyecto
);

module.exports = router;
