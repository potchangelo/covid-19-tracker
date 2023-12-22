// import { render } from '@testing-library/react';
import React from 'react';
// import { Provider } from 'react-redux';
import { ErrorView } from '..';
import store from '../../redux/store';
import { setError } from '../../redux/error/slice';
import { renderWithProvider } from '../../utils/testingLibraryExtensions.jsx';

test('ErrorView not display if no error', () => {
  const { container } = renderWithProvider(<ErrorView />, store);
  expect(container.querySelector('.error-view')).toBeNull();
});

test('ErrorView display network error message', () => {
  store.dispatch(setError(new Error("Network Error")))
  const { getByText } = renderWithProvider(<ErrorView />, store);
  expect(getByText(/network error/i)).not.toBeNull();
});

test('ErrorView display general message for general error', () => {
  store.dispatch(setError(new Error("Not a network errors")))
  const { getByText } = renderWithProvider(<ErrorView />, store);
  expect(getByText(/something went wrong/i)).not.toBeNull();
});
