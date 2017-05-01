import React, { Component } from 'react';
import { connect } from 'react-redux';
import superagent from 'superagent';
import appStore from '../config/app-store';
import LocationSelect from './location-select';
import Loader from './loader';
import WeatherInfo from './weather-info';
import {
    SET_SELECTED_LOCATIONS,
    SET_LOCATIONS,
    START_LOADING,
    STOP_LOADING,
    SET_WEATHER_INFOS,
    SET_UNITS
} from '../config/constants';

const CITY = 0,
    STATE = 1,
    ZIP = 2,
    NOT_FOUND = -1;


const mapStateToProps = (state) => {
    return {
        isLoading: state.isLoading,
        locations: state.locations,
        weatherInfos: state.weatherInfos,
        units: state.units,
        selectedLocations: state.selectedLocations
    }
}

const id = (a) => {
    return a;
};

class Main extends Component {
    componentDidMount() {
        this.performApiCall({
            url: '/api/location/all'
        }, (locations) => {
            appStore.dispatch({
                type: SET_LOCATIONS,
                locations: locations
            });
        });
    }

    performApiCall(config, callback) {
        appStore.dispatch({
            type: START_LOADING
        });

        superagent
            .get(config.url)
            .query(config.data || {})
            .end((err, res) => {
                appStore.dispatch({
                    type: STOP_LOADING
                });

                if (err) {
                    console.error(err);
                    return;
                }

                callback(res.body);
            });
    }

    onLocationClick(selectedLocation) {
        let state = appStore.getState(),
            _selectedLocations = state.selectedLocations;

        if (NOT_FOUND !== _selectedLocations.indexOf(selectedLocation)) {
            _selectedLocations = _selectedLocations.filter(function (id) {
                return selectedLocation !== id;
            });
        } else {
            _selectedLocations.push(selectedLocation);
        }

        appStore.dispatch({
            type: SET_SELECTED_LOCATIONS,
            selectedLocations: _selectedLocations.map(id)
        });
    }

    onSubmitClick() {
        if (this.props.selectedLocations.length) {
            this.fetchLocationWeatherData(this.props.locations.filter((item, i) => {
                return NOT_FOUND !== this.props.selectedLocations.indexOf(i);
            }));
        }
    }

    fetchLocationWeatherData(locations) {
        let data,
            url;

        if (1 === locations.length) {
            data = {
                zip: locations[0][ZIP]
            };
            url = '/api/location/weather';
        } else {
            data = {
                zip: locations.map((location) => {
                    return location[ZIP];
                })
            };
            url = '/api/location/weather/multiple';
        }

        this.performApiCall({
            url: url,
            data: data
        }, (data) => {
            if (data.query && data.query.results) {
                let weatherInfos = [],
                    index = -1;
                if (data.query.results.channel && data.query.results.channel instanceof Object && !(data.query.results.channel instanceof Array)) {
                    data.query.results.channel = [data.query.results.channel];
                }
                if (data.query.results.channel && data.query.results.channel instanceof Array) {
                    weatherInfos = data.query.results.channel.map((channel) => {
                        return ({
                            title: channel.item.title,
                            condition: channel.item.condition,
                            forecast: channel.item.forecast,
                            wind: channel.wind,
                            atmosphere: channel.atmosphere
                        });
                    })

                    if (data.query.results.channel.length) {
                        appStore.dispatch({
                            type: SET_UNITS,
                            units: data.query.results.channel[0].units
                        });
                    }

                    appStore.dispatch({
                        type: SET_WEATHER_INFOS,
                        weatherInfos: weatherInfos
                    });
                }
            }
        });
    }

    render() {
        let weatherInfos = null;

        if (this.props.weatherInfos && this.props.weatherInfos.length) {
            weatherInfos = this.props.weatherInfos.map(function (weatherInfo, i) {
                return (<WeatherInfo key={i} weatherInfo={weatherInfo} units={this.props.units} />);
            }.bind(this));
        }

        return (
            <div className="main-wrapper main-app">
                <div className="main-wrapper__inner">
                    <div className="main-title">
                        Yahoo Weather Reader
                    </div>
                    <LocationSelect locations={this.props.locations} selectedLocations={this.props.selectedLocations} onLocationClick={this.onLocationClick} onSubmitClick={this.onSubmitClick.bind(this)} />
                    {weatherInfos}
                </div>
                <Loader isLoading={this.props.isLoading} />
            </div>
        );
    }
}

export default connect(mapStateToProps)(Main)