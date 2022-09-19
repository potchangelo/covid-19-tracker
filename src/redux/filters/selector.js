import { useSelector } from 'react-redux';

/**
 * @typedef FiltersState
 * @property {string} name
 * @property {number} minConfirmed
 * @property {number} maxConfirmed
 * @property {string} inputName
 * @property {number} inputMinConfirmed
 * @property {number} inputMaxConfirmed
 */

/**
 * @returns {FiltersState} Filter state
 */
const useFiltersSelector = () => useSelector(state => state.filters);

export { useFiltersSelector };
