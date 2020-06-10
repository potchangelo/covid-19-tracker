import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getLocationArray, getLocation } from '../Redux/Location/action';

function TestRedux(props) {
    console.log(props.isSelectedLocationLoading);

    useEffect(() => {
        props.getLocationArray()
        setTimeout(() => {
            props.getLocation(154);
        }, 1500);
    }, [])

    return <div></div>;
}

function mapStateToProps(state) {
    const { locationArray, selectedLocation, isLocationArrayLoading, isSelectedLocationLoading } = state.locationReducer;
    return { locationArray, selectedLocation, isLocationArrayLoading, isSelectedLocationLoading }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getLocationArray, getLocation
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TestRedux);