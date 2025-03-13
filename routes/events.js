/*
Event Routes
api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate'); 
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router(); 
const { getEventos, crearEvento,actualizarEvento, eliminarEvento } = require('../controllers/events');

//Todas tienen que pasar por la validacion del JWT
//Obtener eventos

router.get ('/', validarJWT, getEventos );

//Crear un nuevo evento
router.post (
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalizacion es obligatoria').custom( isDate ),

        validarCampos,
        validarJWT

    ], crearEvento);

//Actualizar evento
router.put ('/:id',validarJWT, actualizarEvento);

// Borrar evento
router.delete( '/:id',validarJWT, eliminarEvento );



module.exports = router; 