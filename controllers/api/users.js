const express = require('express'),
  router = express.Router(),
  db = require('../../models');

  const users = new db.Users();

  router.get('/', (req, res, next) => {
    users.getUser(req.body).then((data) => {
      res.status(200).json({
        success: true,
        message: 'user data',
        data
      });
    }).catch(err => next(err,req, res, next));
  });

  router.get('/events', (req, res, next) => {
    users.getUserEvents(req.body).then((data) => {
      res.status(200).json({
        success: true,
        message: 'user events data',
        data
      });
    }).catch(err => next(err,req, res, next));
  });

  module.exports = router;