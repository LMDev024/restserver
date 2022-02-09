const { response } = require("express");
const { Producto } = require("../models/index");


const obtenerProductos = async(req, res=response)=>{
    //creao las constantes para sacar los parametros del query
    const { limite = 5, desde = 0 }= req.query
    //creamos una constante para traernos solo los productos con estado true
    const query ={estado:true};
    //creamos un arreglo que será devuelto, el cual contendrá el total y los productos
    const [total, productos]= await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .skip( Number(desde) )
            .limit( Number(limite) )
            .populate( 'categoria', 'nombre' )
            .populate( 'usuario', 'nombre' )
    ])
    res.json({
        total,
        productos
    })
}


//obtenerProducto - {} - populate
const obtenerProducto = async(req,res = response)=>{
    const { id } = req.params;
    const producto = await Producto.findById(id)
        .populate('usuario','nombre')
        .populate('categoria','nombre')
    res.json({
        producto
    })
}


//borrarCategoria -estado:false

const crearProducto = async(req, res= response) =>{

    const {estado,usuario,...body} = req.body;

    const productoDB = await Producto.findOne({nombre: body.nombre});

    if( productoDB ){
        return res.status(400).json({
            msg:`El producto ${ productoDB.nombre }, ya existe`
        });
    }
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id,

    }

    const producto = new Producto( data );
    await producto.save();

    res.status(201).json(producto)
}

//actualizarCategoria
const actualizarProducto = async(req,res = response)=>{

    const { id }= req.params;
    const {__id,estado,usuario,...data} = req.body;

    if(data.nombre){
        data.nombre=data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id,data,{new:true})

    res.json({
        producto
    })
}

//borrarCategoria -estado:false
const borrarProducto = async(req,res=response)=>{

    const { id }= req.params;
    const producto = await Producto.findByIdAndUpdate(id, {estado:false},{new:true});

    res.json(producto);
}

module.exports ={
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}