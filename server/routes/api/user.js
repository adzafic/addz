const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

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
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      console.log(user, name, email, password);
      if (user) {
        res.status(400).send({ errors: [{ msg: 'Usuario ya existe' }] });
      }
      user = new User({
        name,
        email,
        password,
      });
      console.log(user);
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        }
      );
      //res.status(200).json({ msg: 'Usuario registrado' });
    } catch (error) {
      res.status(500).json({ errors: [{ msg: error }] });
    }
  }
);

module.exports = router;
