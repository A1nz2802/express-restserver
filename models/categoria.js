const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
  nombre: {
    type: String,
    require: [true, 'El nombre de la categoria es obligatoria'],
    unique: true
  },
  estado: {
    type: Boolean,
    default: true,
    require: true
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    require: true
  }
});

module.exports = model( 'Categoria', CategoriaSchema );