const express = require('express'),
    router = express.Router(),
    db = require('../../models');

const favorites = new db.Favorites();

router.post('/', (req, res, next) => {
    favorites.addFavorites(req.body).then(() => {
        res.status(201).json({
            success: true,
            message: 'Favorites added successfully'
        });
    }).catch(err => next(err, req, res, next));
});

router.get('/', (req, res, next) => {
    favorites.getFavorites(req.body).then((data) => {
        res.status(200).json({
            success: true,
            message: 'Favorites List',
            data
        });
    }).catch(err => next(err, req, res, next));
});

module.exports = router;