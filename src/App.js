import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import MapView from './Components/MapView';
import 'leaflet/dist/leaflet.css';
import './Css/App.scss';
import ListView from './Components/ListView';
import DetailsView from './Components/DetailsView';

// API: https://coronavirus-tracker-api.herokuapp.com/all

function App() {
	// States
	const [latest, setLatest] = useState({
		confirmed: 0,
		recovered: 0,
		deaths: 0,
		updatedDate: null
	});
	const [locationArray, setLocationArray] = useState([]);
	const [selectedLocation, setSelectedLocation] = useState(null);
	const [mapCenter, setMapCenter] = useState([13, 100]);
	const [isLoading, setIsLoading] = useState(true);

	// Functions
	function getLatestCount(location, _locationArray) {
		const foundLocation = _locationArray.find(_location => {
			const matchCountry = _location.country === location.country;
			const matchCountryCode = _location.country_code === location.countryCode;
			const matchProvince = _location.province === location.province;
			return matchCountry && matchCountryCode && matchProvince;
		});
		if (foundLocation === undefined) return 0;
		return foundLocation.latest;
	}

	function combineLocationArray(confirmed, recovered, deaths) {
		const combinedArray = confirmed.locations.map((location, index) => {
			// Confirmed
			const {
				coordinates: { lat: _lat, long: _long },
				country,
				country_code: countryCode,
				province,
				latest: confirmedCount,
				history
			} = location;
			const id = `${countryCode}-${index}`;
			const coordinates = { lat: Number(_lat), long: Number(_long) };
			const newLocation = { id, coordinates, country, countryCode, province, confirmedCount, history };

			// Recovered, Deaths
			newLocation.recoveredCount = getLatestCount(newLocation, recovered.locations);
			newLocation.deathsCount = getLatestCount(newLocation, deaths.locations);

			return newLocation;
		});
		combinedArray.sort((location1, location2) => {
			return location2.confirmedCount - location1.confirmedCount;
		});
		return combinedArray;
	}

	const onSelectLocation = useCallback((id) => {
		const location = locationArray.find(_location => _location.id === id);
		if (location === undefined) {
			setSelectedLocation(null);
			return;
		}
		const { coordinates: { lat, long } } = location;
		setSelectedLocation(location);
		setMapCenter([lat, long]);
	}, [locationArray]);

	const onDeselectLocation = useCallback(() => setSelectedLocation(null), []);

	// Effects
	useEffect(() => {
		axios.get('https://coronavirus-tracker-api.herokuapp.com/all').then(response => {
			const { confirmed, recovered, deaths, latest } = response.data;
			setLocationArray(combineLocationArray(confirmed, recovered, deaths));
			setLatest(latest);
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
			<div className="loadingview">
				<span className="icon">
                    <i className="fas fa-circle-notch fa-lg fa-spin" ></i>
                </span>
				<span className="loadingview__label">Loading</span>
			</div>
		);
	}

	return (
		<div className="App">
			<ListView 
				latest={latest} 
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