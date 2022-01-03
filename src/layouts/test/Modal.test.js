import React from 'react';
import { render } from '@testing-library/react';
import { Modal } from '..';

test('Modal disappeared if no props passed', () => {
  const { container } = render(<Modal />);
  expect(container.childElementCount).toBe(0);
});

test('Modal disappeared if isShow is false', () => {
  const { container } = render(<Modal isShow={false} />);
  expect(container.childElementCount).toBe(0);
});

test('Modal appeared if isShow is true', () => {
  const { container } = render(<Modal isShow={true} />);
  expect(container.childElementCount).toBe(1);
});

test('Modal has no content if children props is empty', () => {
  const { container } = render(<Modal isShow={true} />);
  expect(container.querySelector('.modal-content').childElementCount).toBe(0);
});

test('Modal has content if contains children props', () => {
  const { container } = render(
    <Modal isShow={true}>
      <div>Content</div>
    </Modal>
  );
  expect(container.querySelector('.modal-content').childElementCount).toBeGreaterThanOrEqual(1);
});
