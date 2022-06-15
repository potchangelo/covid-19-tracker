import Axios from 'axios';

// Old API: https://coronavirus-tracker-api.herokuapp.com/all
// Out of reach API: https://coronavirus-tracker-api.herokuapp.com/v2
// New baseUrl from https://github.com/Kilo59/coronavirus-tracker-api
const baseUrl = 'https://covid-tracker-us.herokuapp.com/v2';

const api = {
  getAllLocation: () => Axios.get(`${baseUrl}/locations`),
  getLocation: id => Axios.get(`${baseUrl}/locations/${id}`),
};

export default api;
