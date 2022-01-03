const { Router } = require('express');
const { check } = require('express-validator');

const { crearCategoria, obtenerCategoria, obtenerCategorias } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// {{url}}/api/categorias

// Obtener todas las categorias - publico
router.get('/',[
  validarCampos
], obtenerCategorias );

// Obtener una categoria por id - publico
router.get('/:id', [
  check('id', 'Debe ser un id válido').isMongoId(),
  check('id').custom( existeCategoriaPorId ),
  validarCampos
], obtenerCategoria);


// Crear categoria - privado - cualquier persona con un token válido
router.post('/',[
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  validarCampos
], crearCategoria);

// Actualizar - privado - cualquiera con token válido
router.put('/:id', (req, res) => {
  res.json('PUT');
});

// Borrar una categoria - solo rol admin
router.delete('/id', (req, res) => {
  res.json('DELETE');
});

module.exports = router;

