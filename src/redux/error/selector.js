import { useSelector } from 'react-redux';

/**
 * @returns {string|null} error message
 */
const useErrorSelector = () => useSelector(state => state.error);

export { useErrorSelector };
