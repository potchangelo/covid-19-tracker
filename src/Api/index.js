import Axios from "axios";

// Old API: https://coronavirus-tracker-api.herokuapp.com/all
const baseUrl = 'https://coronavirus-tracker-api.herokuapp.com/v2';

const api = {
    getAllLocation: () => Axios.get(`${baseUrl}/locations`),
    getLocation: (id) => Axios.get(`${baseUrl}/locations/${id}`)
}

export default api;