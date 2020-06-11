import './Css/MapView.scss';

import React, { useState, useEffect, useRef } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { divIcon } from 'leaflet';
import { Map, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';

import { getLocation } from '../Redux/Location/action';
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
        locationArray, selectedLocation, getLocation
    } = props;
    const [viewport, setViewport] = useState({ center: [15, 101], zoom: 5 });
    const mapRef = useRef(null);

    // Effects
    useEffect(() => {
        if (!!selectedLocation) {
            const { coordinates: { latitude, longitude } } = selectedLocation;

            let nextLatitude = latitude;
            if (mapRef.current.offsetWidth < mqDesktop) {
                if (latitude >= 65) nextLatitude -= 0.5
                else if (latitude < 65 && latitude >= 50) nextLatitude -= 1;
                else if (latitude < 50 && latitude >= 45) nextLatitude -= 1.5;
                else nextLatitude -= 2;
            }
            setViewport({ center: [nextLatitude, longitude], zoom: 6 });
        }
    }, [selectedLocation]);

    // Elements
    const markerElements = locationArray.map(location => {
        const {
            id, coordinates: { latitude, longitude },
            country, country_code, province,
            latest: { confirmed }
        } = location;

        let markerIconsSet = markerIcons;
        if (!!selectedLocation) {
            if (location.id === selectedLocation.id) {
                markerIconsSet = selectedMarkerIcons;
            }
        }

        let markerIcon = markerIconsSet.xxSmall;
        if (confirmed >= 101 && confirmed <= 500) {
            markerIcon = markerIconsSet.xSmall;
        }
        else if (confirmed >= 501 && confirmed <= 1000) {
            markerIcon = markerIconsSet.small;
        }
        else if (confirmed >= 1001 && confirmed <= 5000) {
            markerIcon = markerIconsSet.normal;
        }
        else if (confirmed >= 5001 && confirmed <= 10000) {
            markerIcon = markerIconsSet.large;
        }
        else if (confirmed >= 10001 && confirmed <= 50000) {
            markerIcon = markerIconsSet.xLarge;
        }
        else if (confirmed >= 50001) {
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
                onclick={_ => getLocation(id)}
                onmouseover={e => e.target.openPopup()}
                onmouseout={e => e.target.closePopup()} >
                <Popup autoPan={false}>
                    <b>{title}</b>
                </Popup>
            </Marker>
        );
    });

    return (
        <div className="map-view__container" ref={mapRef}>
            <Map
                className="map-view"
                viewport={viewport}
                zoomControl={false}
                maxBounds={maxBounds}
                maxBoundsViscosity={1.0}
                minZoom={2}
                onViewportChanged={setViewport}>
                <ZoomControl position="topright" />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot; target=&quot;_blank&quot;>OpenStreetMap</a> contributors"
                />
                {markerElements}
            </Map>
        </div>
    )
}

function mapStateToProps(state) {
    const locationArray = getFilteredLocationArray(state);
    const { selectedLocation } = state.locationReducer;
    return { locationArray, selectedLocation };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getLocation }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MapView);

/*
location confirmed count => icon style
1-100 => pink, super very small
101-500 => pink, very small
501-1000 => pink, small
1001-5000 => purple, normal
5001-10000 => purple, big
10001-50000 => red, very big
50000 up => red, super very big
*/