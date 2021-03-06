const { Router } = require('express');
const { check } = require('express-validator');


const {validarCampos,validarJWT,tieneRole} = require('../middlewares');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { userGet, userPost, userPut, userPatch, userDelete } = require('../controllers/user');


const router = Router();

//Se pasa la referencia de la funcion (userGet por ejemplo) así, cuando se ejecuta el metodo se pasan los argumentos

    router.get('/', userGet );

    router.post('/',[
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password  debe de ser más de 6 letras').isLength({min: 6}),
        check('correo', 'El correo no es valido').isEmail(),
        check('correo').custom( emailExiste ),
        //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
        check('rol').custom( esRoleValido ),
        validarCampos
    ], userPost );

    router.put('/:id',[
        check('id','No es un id valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('rol').custom( esRoleValido ),
        validarCampos
    ], userPut );

    router.patch('/', userPatch );

    router.delete('/:id',[
        validarJWT,
        tieneRole('ADMIN_ROLE','VENTAS_ROLE' ),
        //este middlewares fuerza a que si o si solo debe ser ADMIN_ROLE para borrar usuarios esAdminRole,
        check('id','No es un id valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos

    ], userDelete );

module.exports = router;