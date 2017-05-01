import React from 'react';

const replaceRegExp = /\s/gi;

const WeatherInfoItem = (props) => {
    let status = props.item.text.toLowerCase().replace(replaceRegExp, '-');

    return (
        <div className="weather-info__forecast__item ease-in-show grid__column-3--normal-screen grid__column-4--middle-screen grid__column-12--small-screen" data-status={status}>
            <div className="weather-info__forecast__item__title">{props.item.day} {props.item.date}</div>
            <div className="weather-info__forecast__item__status">Status: {props.item.text}</div>
            <div className="weather-info__forecast__item__temperature">
                Temperature:&nbsp;
                <div className="weather-info__forecast__item__temperature__low">{props.item.low}{props.units.temperature}</div>
                &nbsp;-&nbsp;
                <div className="weather-info__forecast__item__temperature__high">{props.item.high}{props.units.temperature}</div>
            </div>
        </div>
    );
};

export default WeatherInfoItem;