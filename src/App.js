import React, { useState, useEffect, useCallback } from 'react';
import { MapView, ListView, DetailsView } from './Components';
import api from './Api';
import 'leaflet/dist/leaflet.css';
import './Css/App.scss';

function App() {
	// States
	const [locationArray, setLocationArray] = useState([]);
	const [selectedLocation, setSelectedLocation] = useState(null);
	const [mapCenter, setMapCenter] = useState([15, 101]);
	const [isLoading, setIsLoading] = useState(true);

	// Functions
	const onSelectLocation = useCallback((id) => {
		api.getLocation(id).then(response => {
			const { location } = response.data;
			const { coordinates: { latitude, longitude } } = location;
			setSelectedLocation(location);
			setMapCenter([latitude, longitude]);
		}).catch(error => {
			console.error(error);
			setSelectedLocation(null);
		});
	}, []);

	const onDeselectLocation = useCallback(() => setSelectedLocation(null), []);

	function getSortedLocation(locations) {
		return [...locations].sort((location1, location2) => {
			return location2.latest.confirmed - location1.latest.confirmed;
		});
	}

	// Effects
	useEffect(() => {
		api.getLocations().then(response => {
			const sortedLocation = getSortedLocation(response.data.locations);
			setLocationArray(sortedLocation);
		}).catch(error => {
			console.error(error);
		}).finally(() => {
			setIsLoading(false);
		});
	}, []);

	// Elements
	let detailsView = null;
	if (selectedLocation !== null) {
		detailsView = (
			<DetailsView location={selectedLocation} onClickClose={onDeselectLocation} />
		);
	}

	let loadingView = null;
	if (isLoading) {
		loadingView = (
			<div className="loading-view">
				<span className="icon">
                    <i className="fas fa-circle-notch fa-lg fa-spin" ></i>
                </span>
				<span className="loading-view__label">Loading</span>
			</div>
		);
	}

	return (
		<div className="App">
			<ListView 
				locationArray={locationArray} 
				selectedLocation={selectedLocation} 
				isLoading={isLoading} 
				onSelectItem={onSelectLocation} 
				onDeselectItem={onDeselectLocation} />
			<MapView 
				center={mapCenter} 
				zoom={5} 
				locationArray={locationArray}
				onSelectMarker={onSelectLocation} />
			{detailsView}
			{loadingView}
		</div>
	);
}

export default App;