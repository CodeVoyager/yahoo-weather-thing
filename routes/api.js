var express = require('express'),
    router = express.Router(),
    YahooWeather = require('../model/yahoo-weather'),
    Config = require('../config'),
    validator = require('validator');

router.get('/location/weather', function (req, res, next) {
    var locationData = [
        validator.trim(validator.escape(req.query.zip))
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

router.get('/location/weather/multiple', function (req, res, next) {
    if (!req.body || !req.query.zip || !(req.query.zip instanceof Array)) {
        res.json({
            query: {
                count: 0,
                results: {
                    channel: []
                }
            }
        });

        return;
    }

    YahooWeather.getWeather(req.query.zip.map(function (data) {
        return validator.trim(validator.escape(data));
    }), function (err, response) {
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