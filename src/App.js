import React, { useState, useEffect, useCallback } from 'react';
import { MapView, ListView, DetailsView, LoadingView } from './Components';
import api from './Api';
import 'leaflet/dist/leaflet.css';
import './Css/App.scss';

function App() {
	// States
	const [locationArray, setLocationArray] = useState([]);
	const [selectedLocation, setSelectedLocation] = useState(null);
	const [mapCenter, setMapCenter] = useState([15, 101]);
	const [isAllLocationLoading, setIsAllLocationLoading] = useState(true);
	const [isLocationLoading, setIsLocationLoading] = useState(false);

	// Functions
	const onSelectLocation = useCallback((id) => {
		setIsLocationLoading(true);
		api.getLocation(id).then(response => {
			const { location } = response.data;
			const { coordinates: { latitude, longitude } } = location;
			setSelectedLocation(location);
			setMapCenter([latitude, longitude]);
		}).catch(error => {
			console.error(error);
			setSelectedLocation(null);
		}).finally(() => {
			setIsLocationLoading(false);
		});
	}, []);

	const onDeselectLocation = useCallback(() => setSelectedLocation(null), []);

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
		<div className="app">
			<ListView 
				locationArray={locationArray} 
				selectedLocation={selectedLocation} 
				isLoading={isAllLocationLoading} 
				onSelectItem={onSelectLocation} 
				onDeselectItem={onDeselectLocation} />
			<MapView 
				center={mapCenter} 
				zoom={5} 
				locationArray={locationArray}
				onSelectMarker={onSelectLocation} />
			<DetailsView 
				location={selectedLocation} 
				isLoading={isLocationLoading} 
				onClickClose={onDeselectLocation} />
			<LoadingView
				isLoading={isAllLocationLoading}
				label="Loading"
				extraClass="loading-view__app" />
		</div>
	);
}

export default App;