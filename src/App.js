import 'leaflet/dist/leaflet.css';
import './Css/App.scss';

import React, { useState, useEffect, useCallback } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
	 MapView, ListView, DetailsView, 
	 FilterView, InfoView, LoadingView, ErrorView 
} from './Components';

import { getLocationArray } from './Redux/Location/action';

//const mqDesktop = 1024;

function App(props) {
	// States
	const { isLoading, getLocationArray } = props;

	const [mapViewport, setMapViewport] = useState({ center: [15, 101], zoom: 5 });
	const [error, setError] = useState(null);

	// Functions
	const onLoad = useCallback(() => getLocationArray(), [getLocationArray]);


	// - Close error
	const onCloseError = useCallback(() => setError(null), []);

	// Effects
	useEffect(() => { onLoad(); }, [onLoad]);

	return (
		<div className="app">
			<ListView />
			<MapView
				viewport={mapViewport}
				onViewportChanged={setMapViewport} />
			<DetailsView />
			<FilterView />
			<InfoView />
			<LoadingView
				isShow={isLoading}
				label="Loading"
				extraClass="loading-view__app" />
			<ErrorView error={error} onClickClose={onCloseError} />
			
		</div>
	);
}

function mapStateToProps(state) {
    const {
		isLocationArrayLoading: isLoading 
	} = state.locationReducer;
    return { isLoading };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ getLocationArray }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);