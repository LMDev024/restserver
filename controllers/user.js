const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const userGet = async(req=request,res = response)=>{

//desectructuras los query es ideal para poder recibir ademas de parametrizar información que sea de interes

   const { limite = 5,desde = 0 }=req.query;
   const query = {estado:true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip( Number(desde) )
        .limit( Number(limite) )
    ])

   res.json({
        total,
        usuarios
    })
}


const userPost = async(req,res = response )=>{

    //hay que limpiar el body
    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});

    //verificar si el correo existe

    //encriptar la contraseña

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    //guardar en DB
    await usuario.save();


    res.json({
        msg: 'post API - controlador',
        usuario
    })
}


const userPut = async(req,res = response)=>{

    const {id} = req.params;
    const {_id, password, google,correo, ...resto } = req.body;

    //TODO validar contra base de datos
    if( password ) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto )

    res.json(usuario);
}

const userPatch = (req,res = response)=>{
    res.json({
        msg: 'patch API - controlador'
    })
}

const userDelete = async(req,res = response)=>{

    const { id } = req.params;


    //Fisicamente lo borramos

    //const usuario = await Usuario.findByIdAndDelete(id);

    //borrarlo sin perder la integridad referencial

    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false})

    res.json(usuario);
}



module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}