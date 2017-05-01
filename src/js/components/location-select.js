import React from 'react';
import LocationItemSelect from './location-select-item';

const CITY = 0,
    STATE = 1;

let LocationSelect = (props) => {
    let items = null;

    if (props.locations && props.locations instanceof Array) {
        items = props.locations.map((location, i) => {
            return (<LocationItemSelect isSelected={i === props.selectedLocation} key={i} id={i} city={location[CITY]} state={location[STATE]} onClick={props.onLocationClick.bind(this, i)} />);
        });
    }

    return (
        <div className="main-wrapper">
            <div className="main-wrapper__inner">
                <div className="location-select">
                    <div className="location-select__header">
                        Locations
                    </div>
                    <div className="location-select__step">1. Select one of the locations by clicking on it</div>
                    <div className="location-select__items">
                        {items}
                    </div>
                    <div className="location-select__step">2. Submit your select by clicking button below</div>
                    <div className="location-select__button-wrapper">
                        <div className="location-select__button-wrapper__button" onClick={props.onSubmitClick}>
                            Submit
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default LocationSelect;