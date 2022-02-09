const { Router } = require('express');
const { check } = require('express-validator');

const { crearCategoria,
        obtenerCategorias,
        obtenerCategoria,
        actualizarCategoria,
        borrarCategoria
} = require('../controllers/categorias');

const { existeCategoriaPorId } = require('../helpers/db-validators');


const {
    validarCampos,
    validarJWT,
    tieneRole,
    esAdminRole
} = require('../middlewares');

const router = Router();


//crear middleware llamado existeCategoria para verificar el id


//Obtener todas las cetegorias - publico
router.get('/',obtenerCategorias)

//obtener una categoria por id - publico
router.get('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],obtenerCategoria)

//crear categoria - privado - cualquier persona con un token válido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria)

//Actualizar - privado - cualquier persona con un token válido
router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    esAdminRole,
    validarCampos
],actualizarCategoria)

//Borrar una categoria - privado - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],borrarCategoria)


module.exports = router;