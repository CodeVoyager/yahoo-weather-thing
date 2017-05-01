import React from 'react';

const LocationSelectItem = (props) => {
    let label = [props.city],
        itemClass = ["location-select__items__item"];

    if (props.state) {
        label.push(props.state);
    }

    if (props.isSelected) {
        itemClass.push('selected');
    }

    return (
        <div className={itemClass.join('--')} onClick={props.onClick}>
            {label.join(' ')}
        </div>
    );
};

export default LocationSelectItem;