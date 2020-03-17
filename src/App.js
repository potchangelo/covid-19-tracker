import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapView from './Components/MapView';
import 'leaflet/dist/leaflet.css';
import './Css/App.scss';

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
	const [isLoading, setIsLoading] = useState(false);

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
		return confirmed.locations.map((location, index) => {
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
			const coordinates = { lat: Number(_lat), long: Number(_long) }
			const newLocation = { id, coordinates, country, countryCode, province, confirmedCount, history };

			// Recovered, Deaths
			newLocation.recoveredCount = getLatestCount(newLocation, recovered.locations);
			newLocation.deathsCount = getLatestCount(newLocation, deaths.locations);

			return newLocation;
		})
	}

	// Effects
	useEffect(() => {
		axios.get('https://coronavirus-tracker-api.herokuapp.com/all').then(response => {
			console.log(response.data);
			const { confirmed, recovered, deaths, latest } = response.data;
			setLocationArray(combineLocationArray(confirmed, recovered, deaths));
		}).catch(error => {
			console.error(error);
		})
	}, []);

	return (
		<div className="App">
			<MapView center={[13, 100]} zoom={5} locationArray={locationArray} />
		</div>
	);
}

export default App;