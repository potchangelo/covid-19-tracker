import 'leaflet/dist/leaflet.css';
import './Css/App.scss';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapView, ListView, DetailsView, InfoView, LoadingView } from './Components';
import api from './Api';

const mqDesktop = 1024;

function App() {
	// States
	const [locationArray, setLocationArray] = useState([]);
	const [selectedLocation, setSelectedLocation] = useState(null);
	const [mapViewport, setMapViewport] = useState({ center: [15, 101], zoom: 5 });
	const [isAllLocationLoading, setIsAllLocationLoading] = useState(true);
	const [isLocationLoading, setIsLocationLoading] = useState(false);
	const [isShowInfo, setIsShowInfo] = useState(false);
	const appRef = useRef(null);

	// Functions
	const onSelectLocation = useCallback((id) => {
		setIsLocationLoading(true);
		api.getLocation(id).then(response => {
			const { location } = response.data;
			const { coordinates: { latitude, longitude } } = location;

			let nextLatitude = latitude;
			/*
			latitude top = 90 bottom = -90
			*/
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
		}).finally(() => {
			setIsLocationLoading(false);
		});
	}, []);
	const onDeselectLocation = useCallback(() => setSelectedLocation(null), []);

	const onOpenInfo = useCallback(() => setIsShowInfo(true), []);
	const onCloseInfo = useCallback(() => setIsShowInfo(false), []);

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
				onClickInfo={onOpenInfo} />
			<MapView
				viewport={mapViewport}
				onViewportChanged={setMapViewport}
				locationArray={locationArray}
				onSelectMarker={onSelectLocation} />
			<DetailsView
				location={selectedLocation}
				isLoading={isLocationLoading}
				onClickClose={onDeselectLocation} />
			<InfoView
				isShowInfo={isShowInfo}
				onClickClose={onCloseInfo} />
			<LoadingView
				isLoading={isAllLocationLoading}
				label="Loading"
				extraClass="loading-view__app" />
		</div>
	);
}

export default App;