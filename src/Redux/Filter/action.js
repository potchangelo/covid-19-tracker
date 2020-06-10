import * as key from "./actionKey";

const setFilter = (name, minConfirmed, maxConfirmed) => ({
    type: key.SET_FILTER,
    payload: { name, minConfirmed, maxConfirmed }
});

const resetFilter = () => ({
    type: key.RESET_FILTER
});

export { setFilter, resetFilter };