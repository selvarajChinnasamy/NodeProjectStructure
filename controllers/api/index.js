const router = require('express').Router(),
  login = require('./login'),
  register = require('./register'),
  student = require('./student'),
  departmentHr = require('./departmentHr'),
  department = require('./department'),
  collegeHr = require('./collegeHr'),
  events = require('./events'),
  votings =  require('./votings'),
  resource = require('./resource'),
  recuirtment = require('./recuirtment'),
  company = require('./company'),
  favorites = require('./favorites'),
  users = require('./users');

router.use('/login', login);
router.use('/register', register);
router.use('/student', student);
router.use('/deptHr', departmentHr);
router.use('/dept', department);
router.use('/collegeHr', collegeHr);
router.use('/event', events);
router.use('/votings', votings);
router.use('/resource', resource);
router.use('/recuirtment', recuirtment),
router.use('/company', company);
router.use('/favorites', favorites);
router.use('/users', users);

module.exports = router;
