import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { ErrorView } from '..';
import store from '../../redux/store';
import { setError } from '../../redux/error/slice';

test('ErrorView disappeared if no error', () => {
  const { container } = render(<Provider store={store}><ErrorView /></Provider>);
  expect(container.querySelector('.error-view')).toBeNull();
});

test('ErrorView appeared and displayed network error message', () => {
  store.dispatch(setError(new Error("Network Error")))
  const { getByText } = render(<Provider store={store}><ErrorView /></Provider>);
  expect(getByText(/network error/i)).not.toBeNull();
});

test('ErrorView appeared and displayed general message for general error', () => {
  store.dispatch(setError(new Error("Not a network error")))
  const { getByText } = render(<Provider store={store}><ErrorView /></Provider>);
  expect(getByText(/something went wrong/i)).not.toBeNull();
});
