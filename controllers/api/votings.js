const express = require('express'),
  router = express.Router(),
  db = require('../../models');

  const votings = new db.Votings();


  router.post('/create', (req, res, next) => {
    req.body['user_id'] = req.body['user']['user_id'];
    req.body['college_id'] = req.body['user']['college_id'];
    req.body['dept_id'] = req.body['user']['dept_id'];
    req.body['user_id'] = req.body['user']['user_id'];
    delete req.body['user'];
    votings.createVotings(req.body).then(user => {
        res.status(201).json({
          success: true,
          message: 'Votings Created Successfully'
        });
      }).catch(err => next(err,req, res, next));
  });

  router.put('/accept', (req, res, next) => {
    votings.acceptVotings(req.body).then(user => {
        res.status(200).json({
          success: true,
          message: 'Voting acceptance Registed'
        });
      }).catch(err => next(err,req, res, next));
  });

  router.get('/', (req, res, next) => {
    votings.getVotings(req.body['user']).then((data) => {
      res.status(200).json({
        success: true,
        message: 'votings data',
        data
      });
    }).catch(err => next(err,req, res, next));
  });

  module.exports = router;