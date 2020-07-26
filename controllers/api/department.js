const express = require('express'),
  router = express.Router(),
  db = require('../../models');

const dept = new db.Dept();

router.post('/', (req, res, next) => {
    dept.createDept(req.body).then(() => {
    res.status(201).json({
      success: true,
      message: 'Department created successfully'
    });
  }).catch(err => next(err,req, res, next));
});

module.exports = router;