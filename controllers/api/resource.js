const express = require('express'),
  router = express.Router(),
  db = require('../../models');

const resource = new db.Resource();

router.post('/', (req, res, next) => {
  resource.createResource(req.body).then(resourceResult => {
    res.status(201).json({
      success: true,
      message: 'Resource Created Successfully'
    });
  }).catch(err => next(err, req, res, next));
});

router.get('/', (req, res, next) => {
  resource.getResource(req.body).then((data) => {
    data = data.map(d => {
      d['user_id'] = req.body['user']['user_id'];
      return d;
    });
    res.status(200).json({
      success: true,
      message: 'resource data',
      data
    });
  }).catch(err => next(err, req, res, next));
});

router.put('/:id', (req, res, next) => {
  resource.updateResource(req.body, req.params.id).then(resourceResult => {
    res.status(202).json({
      success: true,
      message: 'Resource Updated Successfully'
    });
  }).catch(err => next(err, req, res, next));
});

router.delete('/:id', (req, res, next) => {
  resource.deleteResource(req.params.id).then(resourceResult => {
    res.status(200).json({
      success: true,
      message: 'Resource Deleted Successfully'
    });
  }).catch(err => next(err, req, res, next));
});

module.exports = router;