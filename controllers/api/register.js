const express = require('express'),
  router = express.Router(),
  db = require('../../models');

const register = new db.Register();

router.post('/college', (req, res, next) => {
  register.createCollege(req.body).then(() => {
    res.status(201).json({
      success: true,
      message: 'college created successfully'
    });
  }).catch(err => next(err,req, res, next));
});

router.post('/company', (req, res, next) => {
  register.createCompany(req.body).then(() => {
    res.status(201).json({
      success: true,
      message: 'company created successfully',
    });
  }).catch(err => next(err,req, res, next));
});

router.post('/student', (req, res, next) => {
  register.createStudentLogin(req.body).then(() => {
    res.status(201).json({
      success: true,
      message: 'student login created successfully',
    });
  }).catch(err => next(err,req, res, next));
});

router.post('/collegehr', (req, res, next) => {
  register.createCollegeHrLogin(req.body).then(() => {
    res.status(201).json({
      success: true,
      message: 'college HR login created successfully',
    });
  }).catch(err => next(err,req, res, next));
});

router.post('/depthr', (req, res, next) => {
  register.createDeptHrLogin(req.body).then(() => {
    res.status(201).json({
      success: true,
      message: 'Department HR login created successfully',
    });
  }).catch(err => next(err,req, res, next));
});

module.exports = router;