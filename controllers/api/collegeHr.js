const express = require('express'),
  router = express.Router(),
  db = require('../../models');

const collegeHr = new db.Collegehr();

router.post('/', (req, res, next) => {
    collegeHr.updateCollegeHr(req.body).then(() => {
    res.status(200).json({
      success: true,
      message: 'College HR Date updated successfully'
    });
  }).catch(err => next(err,req, res, next));
});

router.get('/:id?', (req, res, next) => {
  collegeHr.getCollegeHr(req.params.id).then((data) => {
  res.status(200).json({
    success: true,
    message: 'College HR Date',
    data
  });
}).catch(err => next(err,req, res, next));
});

module.exports = router;