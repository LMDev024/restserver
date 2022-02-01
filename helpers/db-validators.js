const Role = require('../models/role');
const usuario = require('../models/usuario');

const esRoleValido = async(rol='') =>{
    const existeRol = await Role.findOne( {rol} );
    if( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`)
    }
}

const emailExiste = async(correo='')=>{
    const existeEmail = await usuario.findOne({correo});
    if ( existeEmail ){
        throw new Error(`${ correo }, ya se encuentra registrado en la BD`)
    }
}

const existeUsuarioPorId = async( id )=>{
    const existeUsuario = await usuario.findById(id);
    if ( !existeUsuario ){
        throw new Error(`El id no existe  ${ id }`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}