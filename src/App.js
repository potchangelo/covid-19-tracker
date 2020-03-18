import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import MapView from './Components/MapView';
import 'leaflet/dist/leaflet.css';
import './Css/App.scss';
import ListView from './Components/ListView';
import DetailsView from './Components/DetailsView';

// API old: https://coronavirus-tracker-api.herokuapp.com/all
// APi new: https://coronavirus-tracker-api.herokuapp.com/v2/locations
const api = 'https://coronavirus-tracker-api.herokuapp.com/v2/locations';

function App() {
	// States
	const [locationArray, setLocationArray] = useState([]);
	const [selectedLocation, setSelectedLocation] = useState(null);
	const [mapCenter, setMapCenter] = useState([15, 101]);
	const [isLoading, setIsLoading] = useState(true);

	// Functions
	const onSelectLocation = useCallback((id) => {
		const location = locationArray.find(_location => _location.id === id);
		if (location === undefined) {
			setSelectedLocation(null);
			return;
		}
		const { coordinates: { latitude, longitude } } = location;
		setSelectedLocation(location);
		setMapCenter([latitude, longitude]);
	}, [locationArray]);

	const onDeselectLocation = useCallback(() => setSelectedLocation(null), []);

	function getSortedLocation(locations) {
		return [...locations].sort((location1, location2) => {
			return location2.latest.confirmed - location1.latest.confirmed;
		});
	}

	// Effects
	useEffect(() => {
		axios.get(api).then(response => {
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