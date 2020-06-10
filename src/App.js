import 'leaflet/dist/leaflet.css';
import './Css/App.scss';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapView, ListView, DetailsView, FilterView, InfoView, LoadingView, ErrorView } from './Components';
import { bindActionCreators } from 'redux';
import { getLocationArray } from './Redux/Location/action';
import { connect } from 'react-redux';

const mqDesktop = 1024;

function App(props) {
	// States, Refs
	const { isLoading, getLocationArray } = props;

	const [mapViewport, setMapViewport] = useState({ center: [15, 101], zoom: 5 });

	const [isShowFilter, setIsShowFilter] = useState(false);
	const [isNeedResetFilter, setIsNeedResetFilter] = useState(false);
	const [isShowInfo, setIsShowInfo] = useState(false);

	const [error, setError] = useState(null);

	// Functions
	// - Filter
	const onFilterLocations = useCallback((nextLocationArray) => {
		// setSelectedLocation(null);
		// setLocationArray(nextLocationArray);
		setIsShowFilter(false);
	}, []);

	const onResetFilterLocations = useCallback(() => {
		// setSelectedLocation(null);
		// setLocationArray(prevArray => {
		// 	return prevArray.map(location => {
		// 		const nextLocation = Object.assign({}, {...location});
		// 		delete nextLocation.isHidden;
		// 		return nextLocation;
		// 	});
		// });
		setIsShowFilter(false);
		setIsNeedResetFilter(true);
	}, []);

	const onResetFilterEnd = useCallback(() => setIsNeedResetFilter(false), []);

	// - Open popup
	const onOpenFilter = useCallback(() => setIsShowFilter(true), []);
	const onCloseFilter = useCallback(() => setIsShowFilter(false), []);

	const onOpenInfo = useCallback(() => setIsShowInfo(true), []);
	const onCloseInfo = useCallback(() => setIsShowInfo(false), []);

	// - Close error
	const onCloseError = useCallback(() => setError(null), []);

	// Effects
	useEffect(() => getLocationArray(), []);

	return (
		<div className="app">
			<ListView
				onClickFilter={onOpenFilter}
				onClickReset={onResetFilterLocations}
				onClickInfo={onOpenInfo} />
			<MapView
				viewport={mapViewport}
				onViewportChanged={setMapViewport} />
			<DetailsView />
			<FilterView 
				isShow={isShowFilter}
				isNeedReset={isNeedResetFilter}
				locationArray={[]} 
				onClickFilter={onFilterLocations} 
				onClickClose={onCloseFilter}
				onResetEnd={onResetFilterEnd} />
			<InfoView isShow={isShowInfo} onClickClose={onCloseInfo} />
			<LoadingView
				isShow={isLoading}
				label="Loading"
				extraClass="loading-view__app" />
			<ErrorView error={error} onClickClose={onCloseError} />
			
		</div>
	);
}

function mapStateToProps(state) {
    const { isLocationArrayLoading } = state.locationReducer;
    return { isLoading: isLocationArrayLoading };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ getLocationArray }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);