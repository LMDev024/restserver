const { Router } = require('express');
const { userGet, userPost, userPut, userPatch, userDelete } = require('../controllers/user');

const router = Router();

//Se pasa la referencia de la funcion (userGet por ejemplo) así, cuando se ejecuta el metodo se pasan los argumentos

    router.get('/', userGet );
    router.post('/', userPost );
    router.put('/:id', userPut );
    router.patch('/', userPatch );
    router.delete('/', userDelete );

module.exports = router;