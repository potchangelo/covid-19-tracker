import React from 'react';
import { render } from '@testing-library/react';
import { ErrorView } from '..';

const mockError = new Error('Err101');

test('ErrorView disappeared if no error', () => {
  const { container } = render(<ErrorView />);
  expect(container.querySelector('.error-view')).toBeNull();
});

test('ErrorView appeared if has error', () => {
  const { container } = render(<ErrorView error={mockError} />);
  expect(container.querySelector('.error-view')).not.toBeNull();
});
