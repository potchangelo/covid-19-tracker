import { divIcon } from 'leaflet';
import { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, ZoomControl, Tooltip } from 'react-leaflet';
import { useDispatch } from 'react-redux';
import { setError } from '../redux/error/slice';
import { useLocationsSelector } from '../redux/locations/selector';
import { getLocation } from '../redux/locations/slice';
import './css/mapView.scss';

const markerIcons = {
  xxSmall: divIcon({
    className: 'map-view__marker pink',
    iconSize: [20, 20],
  }),
  xSmall: divIcon({
    className: 'map-view__marker pink',
    iconSize: [26, 26],
  }),
  small: divIcon({
    className: 'map-view__marker pink',
    iconSize: [32, 32],
  }),
  normal: divIcon({
    className: 'map-view__marker purple',
    iconSize: [44, 44],
  }),
  large: divIcon({
    className: 'map-view__marker purple',
    iconSize: [50, 50],
  }),
  xLarge: divIcon({
    className: 'map-view__marker red',
    iconSize: [62, 62],
  }),
  xxLarge: divIcon({
    className: 'map-view__marker red',
    iconSize: [68, 68],
  }),
};

let selectedMarkerIcons = {};
Object.keys(markerIcons).forEach(key => {
  const { className, iconSize } = markerIcons[key].options;
  const icon = divIcon({
    className: `${className} selected`,
    iconSize,
  });
  selectedMarkerIcons[key] = icon;
});

const mqDesktop = 1024;
const maxBounds = [
  [90, 270],
  [-90, -240],
];

function _MapView() {
  // Data
  const { filteredLocations, selectedLocation } = useLocationsSelector();
  const dispatch = useDispatch();
  const [map, setMap] = useState(null);
  const [viewport, setViewport] = useState({ center: [15, 101], zoom: 5 });

  // Functions
  const onMapChange = useCallback(() => {
    const { lat, lng } = map.getCenter();
    const zoom = map.getZoom();
    setViewport({ center: [lat, lng], zoom });
  }, [map]);

  async function onMarkerClick(id) {
    try {
      await dispatch(getLocation(id)).unwrap();
    } catch (error) {
      dispatch(setError(error));
    }
  }

  // Effects
  useEffect(() => {
    if (!!map) {
      map.on('move', onMapChange);
      map.on('zoom', onMapChange);
    }
    return () => {
      if (!!map) {
        map.off('move', onMapChange);
        map.off('zoom', onMapChange);
      }
    };
  }, [map, onMapChange]);

  useEffect(() => {
    if (!!selectedLocation && !!map) {
      const {
        coordinates: { latitude, longitude },
      } = selectedLocation;
      let nextLatitude = latitude;
      if (map.getContainer().offsetWidth < mqDesktop) {
        if (latitude >= 65) nextLatitude -= 0.5;
        else if (latitude < 65 && latitude >= 50) nextLatitude -= 1;
        else if (latitude < 50 && latitude >= 45) nextLatitude -= 1.5;
        else nextLatitude -= 2;
      }
      map.setView([nextLatitude, longitude], 6);
    }
  }, [selectedLocation, map]);

  // Elements
  const markerElements = filteredLocations.map(location => {
    const {
      id,
      coordinates: { latitude, longitude },
      country,
      country_code,
      province,
      latest: { confirmed },
    } = location;

    let markerIconsSet = markerIcons;
    if (location.id === selectedLocation?.id) {
      markerIconsSet = selectedMarkerIcons;
    }

    let markerIcon = markerIconsSet.xxSmall;
    if (confirmed >= 10001 && confirmed <= 50000) {
      markerIcon = markerIconsSet.xSmall;
    } else if (confirmed >= 50001 && confirmed <= 100000) {
      markerIcon = markerIconsSet.small;
    } else if (confirmed >= 100001 && confirmed <= 500000) {
      markerIcon = markerIconsSet.normal;
    } else if (confirmed >= 500001 && confirmed <= 1000000) {
      markerIcon = markerIconsSet.large;
    } else if (confirmed >= 1000001 && confirmed <= 10000000) {
      markerIcon = markerIconsSet.xLarge;
    } else if (confirmed >= 10000001) {
      markerIcon = markerIconsSet.xxLarge;
    }

    let title = country;
    if (province !== '' && province !== country) {
      title = `${province}, ${country}`;
    }

    return (
      <Marker
        key={`${id}-${country_code}`}
        position={[latitude, longitude]}
        icon={markerIcon}
        eventHandlers={{ click: () => onMarkerClick(id) }}
      >
        <Tooltip direction={'top'}>
          <b>{title}</b>
        </Tooltip>
      </Marker>
    );
  });

  return (
    <div className="map-view__container">
      <MapContainer
        className="map-view"
        center={viewport.center}
        zoom={viewport.zoom}
        zoomControl={false}
        maxBounds={maxBounds}
        maxBoundsViscosity={1.0}
        minZoom={2}
        ref={setMap}
      >
        <ZoomControl position="topright" />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright" target="_blank">OpenStreetMap</a> contributors'
        />
        {markerElements}
      </MapContainer>
    </div>
  );
}

export default _MapView;

/*

20220616 => max 85M , min 0

location confirmed count => icon style

0 - 100,000
0-10,000 => pink, super very small
10,001-50,000 => pink, very small
50,001-100,000 => pink, small

100,001 - 1,000,000
100,001-500,000 => purple, normal
500,001-1,000,000 => purple, big

1,000,001 +
1,000,001-10,000,000 => red, very big
10,000,001 up => red, super very big

*/
