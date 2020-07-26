const express = require('express'),
  router = express.Router(),
  db = require('../../models');

const deptHr = new db.Depthr();

router.post('/', (req, res, next) => {
    deptHr.updateDeptHr(req.body).then(() => {
    res.status(200).json({
      success: true,
      message: 'Department HR Date updated successfully'
    });
  }).catch(err => next(err,req, res, next));
});

router.get('/:id?', (req, res, next) => {
  deptHr.getDeptHr(req.params.id).then((data) => {
  res.status(200).json({
    success: true,
    message: 'Department HR Date',
    data
  });
}).catch(err => next(err,req, res, next));
});

module.exports = router;