import {
    createStore,
    combineReducers
} from 'redux';

import {
    SET_SELECTED_LOCATION,
    SET_LOCATIONS,
    START_LOADING,
    STOP_LOADING,
    SET_WEATHER_INFO,
    SET_UNITS
} from './constants';


let loadingsInProgress = 0;

const appStore = createStore(function (state, action) {
    switch (action.type) {
        case SET_LOCATIONS:
            return Object.assign({}, state, {
                locations: action.locations
            });
        case SET_SELECTED_LOCATION:
            return Object.assign({}, state, {
                selectedLocation: action.selectedLocation
            });
        case SET_UNITS:
            return Object.assign({}, state, {
                units: action.units
            });
        case START_LOADING:
            ++loadingsInProgress;

            return Object.assign({}, state, {
                isLoading: true
            });
        case STOP_LOADING:
            --loadingsInProgress;

            return Object.assign({}, state, {
                isLoading: !!loadingsInProgress
            });
        case SET_WEATHER_INFO:
            return Object.assign({}, state, {
                weatherInfo: action.weatherInfo
            });
        default:
            return state;
    }
}, {
    locations: [],
    selectedLocation: null,
    weatherInfo: null,
    isLoading: false
});

export default appStore;