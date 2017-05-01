var express = require('express'),
    router = express.Router(),
    YahooWeather = require('../model/yahoo-weather'),
    Config = require('../config'),
    validator = require('validator');

router.get('/location/weather', function (req, res, next) {
    var locationData = [
        validator.trim(validator.escape(req.query.city)),
        validator.trim(validator.escape(req.query.state || ''))
    ];

    YahooWeather.getWeather(locationData, function (err, response) {
        if (null !== err) {
            res.json({
                status: 'error'
            });
            return;
        }
        res.json(response);
    });
});

router.get('/location/all', function (req, res, next) {
    res.json(Config.locations);
});

module.exports = router;