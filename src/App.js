import 'leaflet/dist/leaflet.css';
import './Css/App.scss';

import React, { useEffect, useCallback } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
	 MapView, ListView, DetailsView, 
	 FilterView, InfoView, LoadingView, ErrorView 
} from './Components';

import { getLocationArray } from './Redux/Location/action';

function App(props) {
	// Props, States
	const { isLoading, getLocationArray } = props;

	// Functions
	const onLoad = useCallback(() => getLocationArray(), [getLocationArray]);

	// Effects
	useEffect(() => { onLoad(); }, [onLoad]);

	return (
		<div className="app">
			<ListView />
			<MapView />
			<DetailsView />
			<FilterView />
			<InfoView />
			<LoadingView
				isShow={isLoading}
				label="Loading"
				extraClass="loading-view__app" />
			<ErrorView />
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