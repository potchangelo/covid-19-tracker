import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { applyGetLocationArray, applyGetLocation } from '../Redux/Location/actionThunk';

function TestRedux(props) {
    console.log(props.isSelectedLocationLoading);

    useEffect(() => {
        props.applyGetLocationArray()
        setTimeout(() => {
            props.applyGetLocation(154);
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
        applyGetLocationArray, applyGetLocation
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TestRedux);