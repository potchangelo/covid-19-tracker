import userEvent from '@testing-library/user-event';
import React from 'react';
import { expect, test } from 'vitest';

import { ErrorView } from '..';
import { setError } from '../../redux/error/slice';
import store from '../../redux/store';
import { renderWithProvider } from '../../utils/testingLibraryExtensions.jsx';

test('ErrorView not display if no error', () => {
  const { container } = renderWithProvider(<ErrorView />, store);
  expect(container.querySelector('.error-view')).toBeNull();
});

test('ErrorView display network error message', () => {
  store.dispatch(setError('Network Error'));
  const { getByText } = renderWithProvider(<ErrorView />, store);
  expect(getByText(/network error/i)).not.toBeNull();
});

test('ErrorView display general message for general error', () => {
  store.dispatch(setError('Not a network errors'));
  const { getByText } = renderWithProvider(<ErrorView />, store);
  expect(getByText(/something went wrong/i)).not.toBeNull();
});

test('ErrorView display and disappear after button click', async () => {
  store.dispatch(setError('This error will disappear soon'));
  const { container, getByText } = renderWithProvider(<ErrorView />, store);
  expect(getByText(/something went wrong/i)).not.toBeNull();
  const button = container.querySelector('button');
  await userEvent.click(button);
  expect(container.querySelector('.error-view')).toBeNull();
});
