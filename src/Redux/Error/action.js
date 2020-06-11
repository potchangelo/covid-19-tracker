import * as type from './actionType';

const setError = error => ({
    type: type.SET_ERROR,
    payload: { error }
});

const unsetError = () => ({
    type: type.UNSET_ERROR
});

export { setError, unsetError }