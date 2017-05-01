import React from 'react';
import WeatherInfoItem from './weather-info-item';

const getWindDirectionForDegree = (degree) => {
    if (0 < degree && 22.5 > degree) {
        return 'N';
    }
    if (22.5 < degree && 45 > degree) {
        return 'NNE';
    }
    if (45 <= degree && 67.5 > degree) {
        return 'NE';
    }
    if (67.5 <= degree && 90 > degree) {
        return 'ENE';
    }
    if (90 <= degree && 112.5 > degree) {
        return 'E';
    }
    if (112.5 <= degree && 135 > degree) {
        return 'ESE';
    }
    if (135 <= degree && 157.5 > degree) {
        return 'SE';
    }
    if (157.5 <= degree && 180 > degree) {
        return 'SSE';
    }
    if (180 <= degree && 202.5 > degree) {
        return 'S';
    }
    if (202.5 <= degree && 225 > degree) {
        return 'SSW';
    }
    if (225 <= degree && 247.5 > degree) {
        return 'SW';
    }
    if (247.5 <= degree && 270 > degree) {
        return 'WSW';
    }
    if (270 <= degree && 292.5 > degree) {
        return 'W';
    }
    if (292.5 <= degree && 315 > degree) {
        return 'WNW';
    }
    if (315 <= degree && 337.5 > degree) {
        return 'NW';
    }
    if (337.5 <= degree && 360 > degree) {
        return 'N';
    }

    return null;
};

const WeatherInfo = (props) => {
    let forecastItems = null,
        windDirection = null,
        title = null,
        temperature = null,
        wind = null,
        pressure = null;

    if (!props.weatherInfo || !props.units) {
        return null;
    }

    if (props.weatherInfo.forecast && props.weatherInfo.forecast instanceof Array) {
        forecastItems = props.weatherInfo.forecast.map((item, i) => {
            return (<WeatherInfoItem key={i} units={props.units} item={item} />);
        });
    }

    if (props.weatherInfo.wind) {
        windDirection = getWindDirectionForDegree(parseFloat(props.weatherInfo.wind.direction));
        wind = (<div className="weather-info__status__wind">Wind: {props.weatherInfo.wind.speed}{props.units.speed} {windDirection}</div>);
    }

    if (props.weatherInfo.atmosphere) {
        pressure = (<div className="weather-info__status__pressure">Pressure: {props.weatherInfo.atmosphere.pressure}{props.units.pressure}</div>);
    }

    if (props.weatherInfo.condition) {
        title = (<div className="weather-info__status__title">Status: {props.weatherInfo.condition.text}</div>);
        temperature = (<div className="weather-info__status__temperature">Temp: {props.weatherInfo.condition.temp}{props.units.temperature}</div>);
    }

    return (
        <div className="weather-info ease-in-show">
            <div className="weather-info__title">{props.weatherInfo.title}</div>
            <div className="weather-info__status">
                {title}
                {temperature}
                {pressure}
                {wind}
            </div>
            <div className="weather-info__forecast grid">
                <div className="weather-info__forecast__title grid__column-12--small-screen grid__column-12--middle-screen grid__column-12--normal-screen">
                    Forecast:
                </div>
                {forecastItems}
            </div>
        </div>
    );
};

export default WeatherInfo;