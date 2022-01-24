const { response } = require('express');


const userGet = (req,res = response)=>{
//desectructuras los query es ideal para poder recibir ademas de parametrizar información que sea de interes
    const {q,nombre= 'No name',apikey,page = 1, limit}  = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    })
}
const userPost = (req,res = response)=>{
//hay que limpiar el body
    const {nombre,edad} = req.body;

    res.json({
        msg: 'post API - controlador',
        nombre,
        edad
    })
}
const userPut = (req,res = response)=>{
    const id = req.params.id;
    res.json({
        msg: 'put API - controlador',
        id
    })
}
const userPatch = (req,res = response)=>{
    res.json({
        msg: 'patch API - controlador'
    })
}
const userDelete = (req,res = response)=>{
    res.json({
        msg: 'delete API - controlador'
    })
}



module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete    
}