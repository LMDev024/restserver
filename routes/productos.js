const { Router } = require('express');
const { check } = require('express-validator');

const { obtenerProductos,
        obtenerProducto,
        crearProducto,
        actualizarProducto,
        borrarProducto
} = require('../controllers/productos');

const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');


const {
    validarCampos,
    validarJWT,
    esAdminRole
} = require('../middlewares');

const router = Router();


//crear middleware llamado existeCategoria para verificar el id


//Obtener todas las cetegorias - publico
router.get('/',obtenerProductos)

//obtener una categoria por id - publico
router.get('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],obtenerProducto)

//crear categoria - privado - cualquier persona con un token válido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
],crearProducto)

//Actualizar - privado - cualquier persona con un token válido
router.put('/:id',[
    validarJWT,
    //check('categoria', 'No es un id de Mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],actualizarProducto)

//Borrar una categoria - privado - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],borrarProducto)


module.exports = router;