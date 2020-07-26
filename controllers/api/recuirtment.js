const express = require('express'),
    router = express.Router(),
    db = require('../../models');

const recuirtment = new db.Recuirtment();

router.post('/', (req, res, next) => {
    recuirtment.createRecuirtment(req.body).then(recuirtmentResult => {
        res.status(201).json({
            success: true,
            message: 'Recuirtment Created Successfully'
        });
    }).catch(err => next(err, req, res, next));
});

router.get('/', (req, res, next) => {
    recuirtment.getRecuirtment(req.body).then(data => {
        res.status(200).json({
            success: true,
            message: 'Recuirtment List',
            data
        });
    }).catch(err => next(err, req, res, next));
});

router.put('/accept', (req, res, next) => {
    recuirtment.acceptRecuirtment(req.body).then(recuirtmentResult => {
        res.status(201).json({
            success: true,
            message: 'Recuirtment Acceptance Registed'
        });
    }).catch(err => next(err, req, res, next));
});

module.exports = router;