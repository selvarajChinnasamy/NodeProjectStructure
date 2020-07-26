const express = require('express'),
  router = express.Router(),
  db = require('../../models');

const events = new db.Events();

router.post('/', (req, res, next) => {
  events.createEvent(req.body).then(() => {
    res.status(200).json({
      success: true,
      message: 'Event Created successfully'
    });
  }).catch(err => next(err, req, res, next));
});

router.post('/acceptance', (req, res, next) => {
  events.registerAcceptance(req.body).then(() => {
    res.status(200).json({
      success: true,
      message: 'Event Acceptance Registed'
    });
  }).catch(err => next(err, req, res, next));
});

router.post('/attendance', (req, res, next) => {
  events.registerAttendance(req.body).then(() => {
    res.status(200).json({
      success: true,
      message: 'Event Attendance Registed'
    });
  }).catch(err => next(err, req, res, next));
});

// GET

router.get('/', (req, res, next) => {
  events.getEvents(req.body).then((data) => {
    res.status(200).json({
      success: true,
      message: 'Event List',
      data
    });
  }).catch(err => next(err, req, res, next));
});

router.put('/:id', (req, res, next) => {
  events.updateEvent(req.body, req.params.id).then(() => {
    res.status(200).json({
      success: true,
      message: 'Event Created successfully'
    });
  }).catch(err => next(err, req, res, next));
});

router.delete('/:id', (req, res, next) => {
  events.deleteEvent(req.params.id).then(resourceResult => {
    res.status(200).json({
      success: true,
      message: 'Resource Deleted Successfully'
    });
  }).catch(err => next(err, req, res, next));
});

module.exports = router;