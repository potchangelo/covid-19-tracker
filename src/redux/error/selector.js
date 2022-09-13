import { useSelector } from "react-redux";

const useErrorSelector = () => useSelector(state => state.error);

export { useErrorSelector };
