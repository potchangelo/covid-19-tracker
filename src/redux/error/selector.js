import { useSelector } from 'react-redux';

/**
 * @returns {Error|null} error object
 */
const useErrorSelector = () => useSelector(state => state.error);

export { useErrorSelector };
