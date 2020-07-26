const express = require('express'),
  router = express.Router(),
  db = require('../../models');

const login = new db.Login();

router.post('/', (req, res, next) => {
  login.loginValidator(req.body).then(user => {
    res.status(200).json({
      success: true,
      message: 'Loged In successfully',
      user,
    });
  }).catch(err => next(err,req, res, next));
});

module.exports = router;