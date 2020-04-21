import 'leaflet/dist/leaflet.css';
import './Css/App.scss';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapView, ListView, DetailsView, FilterView, InfoView, LoadingView, ErrorView } from './Components';
import api from './Api';

const mqDesktop = 1024;

function App() {
	// States, Refs
	const [locationArray, setLocationArray] = useState([]);
	const [selectedLocation, setSelectedLocation] = useState(null);
	const [mapViewport, setMapViewport] = useState({ center: [15, 101], zoom: 5 });

	const [isAllLocationLoading, setIsAllLocationLoading] = useState(true);
	const [isLocationLoading, setIsLocationLoading] = useState(false);
	const [isShowFilter, setIsShowFilter] = useState(false);
	const [isNeedResetFilter, setIsNeedResetFilter] = useState(false);
	const [isShowInfo, setIsShowInfo] = useState(false);

	const [error, setError] = useState(null);

	const appRef = useRef(null);

	// Functions
	// - Filter
	const onFilterLocations = useCallback((nextLocationArray) => {
		setSelectedLocation(null);
		setLocationArray(nextLocationArray);
		setIsShowFilter(false);
	}, []);

	const onResetFilterLocations = useCallback(() => {
		setSelectedLocation(null);
		setLocationArray(prevArray => {
			return prevArray.map(location => {
				const nextLocation = Object.assign({}, {...location});
				delete nextLocation.isHidden;
				return nextLocation;
			});
		});
		setIsShowFilter(false);
		setIsNeedResetFilter(true);
	}, []);

	const onResetFilterEnd = useCallback(() => setIsNeedResetFilter(false), []);

	// - Select
	const onSelectLocation = useCallback((id) => {
		setIsLocationLoading(true);
		setError(null);
		api.getLocation(id).then(response => {
			const { location } = response.data;
			const { coordinates: { latitude, longitude } } = location;

			let nextLatitude = latitude;
			if (appRef.current.offsetWidth < mqDesktop) {
				if (latitude >= 65) nextLatitude -= 0.5
				else if (latitude < 65 && latitude >= 50) nextLatitude -= 1;
				else if (latitude < 50 && latitude >= 45) nextLatitude -= 1.5;
				else nextLatitude -= 2;
			}

			setSelectedLocation(location);
			setMapViewport({ center: [nextLatitude, longitude], zoom: 6 });
		}).catch(error => {
			console.error(error);
			setSelectedLocation(null);
			setError(error);
		}).finally(() => {
			setIsLocationLoading(false);
		});
	}, []);

	const onDeselectLocation = useCallback(() => setSelectedLocation(null), []);

	// - Open popup
	const onOpenFilter = useCallback(() => setIsShowFilter(true), []);
	const onCloseFilter = useCallback(() => setIsShowFilter(false), []);

	const onOpenInfo = useCallback(() => setIsShowInfo(true), []);
	const onCloseInfo = useCallback(() => setIsShowInfo(false), []);

	// - Close error
	const onCloseError = useCallback(() => setError(null), []);

	// Effects
	useEffect(() => {
		api.getAllLocation().then(response => {
			const { locations } = response.data;
			const sortedLocation = [...locations].sort((location1, location2) => {
				return location2.latest.confirmed - location1.latest.confirmed;
			});
			setLocationArray(sortedLocation);
		}).catch(error => {
			console.error(error);
			setError(error);
		}).finally(() => {
			setIsAllLocationLoading(false);
		});
	}, []);

	return (
		<div className="app" ref={appRef}>
			<ListView
				locationArray={locationArray}
				selectedLocation={selectedLocation}
				isLoading={isAllLocationLoading}
				onSelectItem={onSelectLocation}
				onDeselectItem={onDeselectLocation}
				onClickFilter={onOpenFilter}
				onClickReset={onResetFilterLocations}
				onClickInfo={onOpenInfo} />
			<MapView
				viewport={mapViewport}
				locationArray={locationArray}
				selectedLocation={selectedLocation}
				onViewportChanged={setMapViewport}
				onSelectMarker={onSelectLocation} />
			<DetailsView
				location={selectedLocation}
				isLoading={isLocationLoading}
				onClickClose={onDeselectLocation} />
			<FilterView 
				isShow={isShowFilter}
				isNeedReset={isNeedResetFilter}
				locationArray={locationArray} 
				onClickFilter={onFilterLocations} 
				onClickClose={onCloseFilter}
				onResetEnd={onResetFilterEnd} />
			<InfoView
				isShow={isShowInfo}
				onClickClose={onCloseInfo} />
			<LoadingView
				isShow={isAllLocationLoading}
				label="Loading"
				extraClass="loading-view__app" />
			<ErrorView error={error} onClickClose={onCloseError} />
		</div>
	);
}

export default App;