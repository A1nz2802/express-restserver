const { response } = require('express');
const Categoria = require('../models/categoria');

// Obtener Categorias - paginado - total - populate
const obtenerCategorias = async(req, res = response ) => {

  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [ total, categorias ] = await Promise.all([
    Categoria.countDocuments( query ),
    Categoria.find( query )
      .skip(Number( desde ))
      .limit(Number( limite ))
      .populate('usuario')
  ])

  res.json({
    total,
    categorias
  });
}

// obtenerCategoria - populate 
const obtenerCategoria = async(req, res = response ) => {

  const { id } = req.params;
  
  const { _id, nombre, estado, usuario } = await Categoria.findOne({ id }).populate('usuario');

  res.status(200).json({
    id: _id,
    categoria: nombre,
    estado,
    usuario: usuario.nombre
  });
    

}

const crearCategoria = async(req, res = response ) => {

  // Capitalizo el nombre
  const nombre = req.body.nombre.toUpperCase();
  
  // Buscar si existe una categoria con ese nombre en la BD
  const categoriaDB = await Categoria.findOne({ nombre });

  // Si existe la categoria
  if ( categoriaDB ) {
    return res.status(400).json({
      msg: `La categoria ${ categoriaDB.nombre }, ya existe`
    });
  }

  // Generar la data a guardar y evitar que el cliente envie el estado.
  const data = {
    nombre,
    usuario: req.usuario._id // id del usuario en el jwt
  }

  // Crear la nueva categoria
  const categoria = new Categoria( data );

  // Guardar categoria en la DB
  await categoria.save();

  // Imprimimos la categoria en la respuesta
  res.status(201).json( categoria );
}

// Actualizar Categoria

// Borrar Categoria - estado:false

module.exports = {
  obtenerCategoria,
  obtenerCategorias,
  crearCategoria
}