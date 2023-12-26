import { render } from '@testing-library/react';
import React from 'react';

import { MapView } from '..';

const mockViewport = { center: [15, 101], zoom: 5 };
const mockLocations = [0, 1, 2].map(id => {
  return {
    id,
    coordinates: { latitude: 0, longitude: 0 },
    country: 'Z',
    country_code: 'Z',
    province: 'Z',
    latest: { confirmed: 10 },
  };
});
const mockSelectedLocation = {
  id: 1,
  coordinates: { latitude: 0, longitude: 0 },
  country: 'Z',
  country_code: 'Z',
  province: 'Z',
  latest: { confirmed: 10 },
};

test('MapView has no markers if location array is empty', () => {
  const { container } = render(<MapView viewport={mockViewport} locations={[]} />);
  expect(container.querySelector('.map-view__marker')).toBeNull();
});

test('MapView markers count equals location array length', () => {
  const { container } = render(<MapView viewport={mockViewport} locations={mockLocations} />);
  expect(container.querySelectorAll('.map-view__marker').length).toBe(mockLocations.length);
});

test('MapView selected marker has different class than others', () => {
  const { container } = render(
    <MapView viewport={mockViewport} locations={mockLocations} selectedLocation={mockSelectedLocation} />,
  );
  expect(container.querySelector('.map-view__marker.selected')).not.toBeNull();
  expect(container.querySelectorAll('.map-view__marker:not(.selected)').length).toBe(mockLocations.length - 1);
});
