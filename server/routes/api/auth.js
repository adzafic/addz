const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const EXPIRES_IN = 3600;

//@route GET api/auth
//@desc test auth
//@acess Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

router.get('/check', (req, res) => {
  res.status(200).json({ msg: 'OK' });
});

//@route POST api/auth/login
//@desc test users
//@acess Public
router.post(
  '/login',
  [
    check('email', 'Entre un email valido').isEmail(),
    check('password', 'La contraseña no puede estar vacia').not().isEmpty(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    const { email, password } = req.body;
    console.log({ email, password });
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .send({ errors: [{ msg: 'Error usuario o contraseña' }] });
      }

      const coincide = await bcrypt.compare(password, user.password);

      if (!coincide) {
        return res
          .status(400)
          .send({ errors: [{ msg: 'Error usuario o contraseña' }] });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: EXPIRES_IN },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token, expiresIn: EXPIRES_IN });
        }
      );
    } catch (error) {}
  }
);

module.exports = router;
