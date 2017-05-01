/*global require, module*/

var YahooWeather = {},
    querystring = require('querystring'),
    _baseOptions = {
        format: 'json',
        env: 'store://datatables.org/alltableswithkeys'
    };

YahooWeather.performAjax = function (url, options, callback) {
    var https = require('https'),
        _options,
        processing;

    _options = {
        host: 'query.yahooapis.com',
        path: url + '?' + querystring.stringify(Object.assign({}, options, _baseOptions)),
        headers: {
            'Accept': 'application/json'
        }
    };

    processing = function (response) {
        var str = '';

        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            callback(null, JSON.parse(str));
        });

        response.on('error', function (e) {
            callback(e, null);
        });
    };

    https
        .request(_options, processing)
        .end();
};

YahooWeather.getWeather = function (location, callback) {
    this.performAjax('/v1/public/yql', {
        q: ['select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="', location.join(', '), '")'].join('')
    }, callback || (function () {}));
};

YahooWeather.DEFAULT_OFFSET = 0;
YahooWeather.DEFAULT_LIMIT = 25;

module.exports = YahooWeather;