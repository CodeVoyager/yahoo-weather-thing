import {
    createStore,
    combineReducers
} from 'redux';

import {
    SET_SELECTED_LOCATIONS,
    SET_LOCATIONS,
    START_LOADING,
    STOP_LOADING,
    SET_WEATHER_INFOS,
    SET_UNITS
} from './constants';


let loadingsInProgress = 0;

const appStore = createStore(function (state, action) {
    switch (action.type) {
        case SET_LOCATIONS:
            return Object.assign({}, state, {
                locations: action.locations
            });
        case SET_SELECTED_LOCATIONS:
            return Object.assign({}, state, {
                selectedLocations: action.selectedLocations
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
        case SET_WEATHER_INFOS:
            return Object.assign({}, state, {
                weatherInfos: action.weatherInfos
            });
        default:
            return state;
    }
}, {
    locations: [],
    selectedLocations: [],
    weatherInfos: null,
    isLoading: false
});

export default appStore;