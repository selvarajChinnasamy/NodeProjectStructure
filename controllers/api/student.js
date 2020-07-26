const express = require('express'),
  router = express.Router(),
  db = require('../../models');

  const student = new db.Student();


  router.post('/', (req, res, next) => {
    req.body['user_id'] = req.body['user'].user_id;
    delete req.body['user'];
    student.updateStudent(req.body).then(() => {
      res.status(200).json({
        success: true,
        message: 'student data updated successfully',
      });
    }).catch(err => next(err,req, res, next));
  });

  router.get('/', (req, res, next) => {
    student.getStudents(JSON.parse(req.query.json), req.body['user']).then((data) => {
      res.status(200).json({
        success: true,
        message: 'student data',
        data
      });
    }).catch(err => next(err,req, res, next));
  });

  module.exports = router;