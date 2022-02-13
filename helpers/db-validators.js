const Role = require('../models/role');
const usuario = require('../models/usuario');
const categoria = require('../models/categoria');
const producto = require('../models/producto');

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
const existeCategoriaPorId = async( id )=>{
    const existeCategoria= await categoria.findById(id);
    if ( !existeCategoria ){
        throw new Error(`El id no existe  ${ id }`);
    }
}
const existeProductoPorId = async( id )=>{
    const existeProducto = await producto.findById(id);
    if ( !existeProducto ){
        throw new Error(`El id no existe  ${ id }`);
    }
}

const coleccionesPermitidas=(coleccion='',colecciones=[])=>{
    const incluida = colecciones.includes( coleccion);
    if(!incluida){
        throw new Error(`La colección ${ coleccion } no es permitida, ${ colecciones }`);
    }
    return true
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}