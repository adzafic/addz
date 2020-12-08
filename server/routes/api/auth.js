const express = require('express');
const router = express.Router();

//@route GET api/auth
//@desc test auth
//@acess Public
router.get('/', (req, res) => {
  res.send({
    message: 'user auth',
  });
});

module.exports = router;
