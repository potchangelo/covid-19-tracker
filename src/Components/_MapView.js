import './Css/MapView.scss';

import React, { useState, useEffect, useCallback } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { divIcon } from 'leaflet';
import { MapContainer, TileLayer, Marker, ZoomControl, Tooltip } from 'react-leaflet';

import { applyGetLocation } from '../Redux/Location/actionThunk';
import { getFilteredLocationArray } from '../Redux/Location/selector';

const markerIcons = {
    xxSmall: divIcon({
        className: 'map-view__marker pink', iconSize: [20, 20]
    }),
    xSmall: divIcon({
        className: 'map-view__marker pink', iconSize: [26, 26]
    }),
    small: divIcon({
        className: 'map-view__marker pink', iconSize: [32, 32]
    }),
    normal: divIcon({
        className: 'map-view__marker purple', iconSize: [48, 48]
    }),
    large: divIcon({
        className: 'map-view__marker purple', iconSize: [64, 64]
    }),
    xLarge: divIcon({
        className: 'map-view__marker red', iconSize: [80, 80]
    }),
    xxLarge: divIcon({
        className: 'map-view__marker red', iconSize: [96, 96]
    })
};

let selectedMarkerIcons = {};
Object.keys(markerIcons).forEach((key) => {
    const { className, iconSize } = markerIcons[key].options;
    const icon = divIcon({
        className: `${className} selected`, iconSize
    });
    selectedMarkerIcons[key] = icon;
});

const mqDesktop = 1024;
const maxBounds = [[90, 270], [-90, -240]];

function MapView(props) {
    // Props
    const {
        locationArray, selectedLocation, applyGetLocation
    } = props;
    const [map, setMap] = useState(null);
    const [viewport, setViewport] = useState({ center: [15, 101], zoom: 5 });

    // Functions
    const onMapChange = useCallback(() => {
        const { lat, lng } = map.getCenter();
        const zoom = map.getZoom();
        setViewport({ center: [lat, lng], zoom });
    }, [map]);

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
        }
    }, [map, onMapChange]);

    useEffect(() => {
        if (!!selectedLocation && !!map) {
            const { coordinates: { latitude, longitude } } = selectedLocation;
            let nextLatitude = latitude;
            if (map.getContainer().offsetWidth < mqDesktop) {
                if (latitude >= 65) nextLatitude -= 0.5
                else if (latitude < 65 && latitude >= 50) nextLatitude -= 1;
                else if (latitude < 50 && latitude >= 45) nextLatitude -= 1.5;
                else nextLatitude -= 2;
            }
            map.setView([nextLatitude, longitude], 6);
        }
    }, [selectedLocation, map]);

    // Elements
    const markerElements = locationArray.map(location => {
        const {
            id, coordinates: { latitude, longitude },
            country, country_code, province,
            latest: { confirmed }
        } = location;

        let markerIconsSet = markerIcons;
        if (location.id === selectedLocation?.id) {
            markerIconsSet = selectedMarkerIcons;
        }

        let markerIcon = markerIconsSet.xxSmall;
        if (confirmed >= 5001 && confirmed <= 10000) {
            markerIcon = markerIconsSet.xSmall;
        }
        else if (confirmed >= 10001 && confirmed <= 50000) {
            markerIcon = markerIconsSet.small;
        }
        else if (confirmed >= 50001 && confirmed <= 100000) {
            markerIcon = markerIconsSet.normal;
        }
        else if (confirmed >= 100001 && confirmed <= 500000) {
            markerIcon = markerIconsSet.large;
        }
        else if (confirmed >= 500001 && confirmed <= 1000000) {
            markerIcon = markerIconsSet.xLarge;
        }
        else if (confirmed >= 1000001) {
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
                eventHandlers={{click: () => applyGetLocation(id)}} >
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
                whenCreated={setMap} >
                <ZoomControl position="topright" />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot; target=&quot;_blank&quot;>OpenStreetMap</a> contributors"
                />
                {markerElements}
            </MapContainer>
        </div>
    )
}

function mapStateToProps(state) {
    const locationArray = getFilteredLocationArray(state);
    const { selectedLocation } = state.locationReducer;
    return { locationArray, selectedLocation };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ applyGetLocation }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MapView);

/*
location confirmed count => icon style
0-5,000 => pink, super very small
5,001-10,000 => pink, very small
10,001-50,000 => pink, small
50,001-100,000 => purple, normal
100,001-500,000 => purple, big
500,001-1,000,000 => red, very big
1,000,000 up => red, super very big
*/