function addLocation(country) {
    return {
        type: 'ADD_LOCATION',
        payload: { country }
    }
}

const addLocationAsync = () => (dispatch) => {
    const prom = new Promise((resolve) => {
        setTimeout(() => {
            resolve(Math.random());
        }, 2000);
    });
    return prom.then(country => {
        dispatch(addLocation(country));
    });
}

export { addLocation, addLocationAsync };