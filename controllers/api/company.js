const express = require('express'),
    router = express.Router(),
    db = require('../../models');

const company = new db.Company();

router.get('/', (req, res, next) => {
    company.getCompany().then(data => {
        res.status(200).json({
            success: true,
            message: 'Companies list',
            data
        });
    }).catch(err => next(err, req, res, next));
});

router.get('/all', (req, res, next) => {
    company.getCompanyFullDetails(req.body).then(data => {
        res.status(200).json({
            success: true,
            message: 'Companies list',
            data
        });
    }).catch(err => next(err, req, res, next));
});

module.exports = router;