import React from 'react';
import { render } from '@testing-library/react';
import { MapView } from '..';

const mockViewport =  { center: [15, 101], zoom: 5 };
const mockLocationArray = [0, 1, 2].map(id => {
    return {
        id, coordinates: { latitude: 0, longitude: 0 },
        country: 'Z', country_code: 'Z', province: 'Z',
        latest: { confirmed: 10 }
    }
});
const mockSelectedLocation = {
    id: 1, coordinates: { latitude: 0, longitude: 0 },
    country: 'Z', country_code: 'Z', province: 'Z',
    latest: { confirmed: 10 }
}

test('MapView has no markers if location array is empty', () => {
    const { container } = render(
        <MapView 
            viewport={mockViewport} 
            locationArray={[]} />
    );
    expect(container.querySelector('.map-view__marker')).toBeNull();
});

test('MapView markers count equals location array length', () => {
    const { container } = render(
        <MapView 
            viewport={mockViewport} 
            locationArray={mockLocationArray} />
    );
    expect(container.querySelectorAll('.map-view__marker').length).toBe(mockLocationArray.length);
});

test('MapView selected marker has different class than others', () => {
    const { container } = render(
        <MapView 
            viewport={mockViewport} 
            locationArray={mockLocationArray} 
            selectedLocation={mockSelectedLocation} />
    );
    expect(container.querySelector('.map-view__marker.selected')).not.toBeNull();
    expect(container.querySelectorAll('.map-view__marker:not(.selected)').length).toBe(mockLocationArray.length - 1);
});