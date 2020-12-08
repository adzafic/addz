const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

//@route POST api/users
//@desc test users
//@acess Public
router.post(
  '/',
  [
    check('name', 'Nombre es un campo requerido').not().isEmpty(),
    check('email', 'Entre un email valido').isEmail(),
    check(
      'password',
      'La contraseña tiene que tener mas de 6 caracteres'
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    //buscar usuario

    //encriptar contraseña
    res.send({
      message: 'user route',
    });
  }
);

module.exports = router;
