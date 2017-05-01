import React from 'react';

const Loader = (props) => {
    if (!props.isLoading) {
        return null;
    }

    return (
        <div className="loader">
            <div className="loader__inner">
                <div className="loader__inner__element--1" />
                <div className="loader__inner__element--2" />
                <div className="loader__inner__element--3" />
                <div className="loader__inner__element--4" />
                <div className="loader__inner__element--5" />
                <div className="loader__inner__element--6" />
                <div className="loader__inner__element--7" />
                <div className="loader__inner__element--8" />
                <div className="loader__inner__element--9" />
            </div>
        </div>
    );
};

export default Loader;