const { response, request } = require("express")


const esAdminRole = ( req = request ,res = response ,next )=>{

    if(!req.usuario ){
        return res.status(500).json({
            msg:'Se quiere verificar el role sin validar el token primero'
        });
    }

    const { rol, nombre } = req.usuario;
    console.log( rol, nombre )
    if( rol !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            mesg: `${ nombre } no es administrador -No puede hacer esto`
        });
    }
    next();
}

const tieneRole = ( ...roles)=>{

    return ( req = request ,res = response ,next )=>{

        if(!req.usuario ){
            return res.status(500).json({
                msg:'Se quiere verificar el role sin validar el token primero'
            });
        }

        const { rol, nombre } = req.usuario;
        if( !roles.includes(req.usuario.rol)){
            return res.status(401).json({
                mesg: ` El servicio requiere uno de estos roles ${ roles } `
            });
        }
        next();
    }

}

module.exports ={
    esAdminRole,
    tieneRole
}