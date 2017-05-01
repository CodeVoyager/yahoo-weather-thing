import React, { Component } from 'react';
import { connect } from 'react-redux';
import superagent from 'superagent';
import appStore from '../config/app-store';
import LocationSelect from './location-select';
import Loader from './loader';
import WeatherInfo from './weather-info';
import {
    SET_SELECTED_LOCATION,
    SET_LOCATIONS,
    START_LOADING,
    STOP_LOADING,
    SET_WEATHER_INFO,
    SET_UNITS
} from '../config/constants';

const CITY = 0,
    STATE = 1;


const mapStateToProps = (state) => {
    return {
        isLoading: state.isLoading,
        locations: state.locations,
        weatherInfo: state.weatherInfo,
        units: state.units,
        selectedLocation: state.selectedLocation
    }
}

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
            .query(config.query || {})
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
        appStore.dispatch({
            type: SET_SELECTED_LOCATION,
            selectedLocation: selectedLocation
        });
    }

    onSubmitClick() {
        if (null !== this.props.selectedLocation) {
            this.fetchLocationWeatherData(this.props.locations[this.props.selectedLocation]);
        }
    }

    fetchLocationWeatherData(location) {
        this.performApiCall({
            url: '/api/location/weather',
            query: {
                city: location[CITY],
                state: location[STATE],
            }
        }, (data) => {
            if (data.query && data.query.results) {
                appStore.dispatch({
                    type: SET_UNITS,
                    units: data.query.results.channel.units
                });
                appStore.dispatch({
                    type: SET_WEATHER_INFO,
                    weatherInfo: {
                        title: data.query.results.channel.item.title,
                        condition: data.query.results.channel.item.condition,
                        forecast: data.query.results.channel.item.forecast,
                        wind: data.query.results.channel.wind,
                        atmosphere: data.query.results.channel.atmosphere
                    }
                });
            }
        });
    }

    render() {
        return (
            <div className="main-wrapper main-app">
                <div className="main-wrapper__inner">
                    <div className="main-title">
                        Yahoo Weather Reader
                    </div>
                    <LocationSelect locations={this.props.locations} selectedLocation={this.props.selectedLocation} onLocationClick={this.onLocationClick} onSubmitClick={this.onSubmitClick.bind(this)} />
                    <WeatherInfo weatherInfo={this.props.weatherInfo} units={this.props.units} />
                </div>
                <Loader isLoading={this.props.isLoading} />
            </div>
        );
    }
}

export default connect(mapStateToProps)(Main)