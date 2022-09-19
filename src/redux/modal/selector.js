import { useSelector } from 'react-redux';

/**
 * @returns {string|null} Modal name
 */
const useModalSelector = () => useSelector(state => state.modal);

export { useModalSelector };
