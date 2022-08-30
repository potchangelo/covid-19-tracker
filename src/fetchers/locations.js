import Axios from 'axios';

// Old API: https://coronavirus-tracker-api.herokuapp.com/all
// Out of reach API: https://coronavirus-tracker-api.herokuapp.com/v2
// New baseUrl from https://github.com/Kilo59/coronavirus-tracker-api
const baseUrl = 'https://covid-tracker-us.herokuapp.com/v2';

const getLocations = () => Axios.get(`${baseUrl}/locations`);

/**
 * @param {number} id
 */
const getLocation = id => Axios.get(`${baseUrl}/locations/${id}`);

export { getLocations, getLocation };
