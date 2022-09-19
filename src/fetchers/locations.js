import Axios from 'axios';

// Original API
// const baseUrl = 'https://coronavirus-tracker-api.herokuapp.com/v2';
// Forked API
const baseUrl = 'https://covid-tracker-us.herokuapp.com/v2';

const getLocations = () => Axios.get(`${baseUrl}/locations`);

/**
 * @param {number} id
 */
const getLocation = id => Axios.get(`${baseUrl}/locations/${id}`);

export { getLocations, getLocation };
