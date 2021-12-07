const { validationResult } = require('express-validator');

const validarCampos = ( req, res, next ) => {

  const errors = validationResult( req );
  if( !errors.isEmpty() ) {
    return res.status(400).json(errors);
  }

  // Si pasa este middleware entonces que continue con el siguiente middleware
  next();
}

module.exports = {
  validarCampos
}