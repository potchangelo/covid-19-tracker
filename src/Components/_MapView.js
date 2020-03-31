import './Css/MapView.scss';
import React from 'react';
import { divIcon } from 'leaflet';
import { Map, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';

const markerIcons = {
    xxSmall: divIcon({
        className: 'map-view__marker pink', iconSize: [16, 16],
    }),
    xSmall: divIcon({
        className: 'map-view__marker pink', iconSize: [24, 24]
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

const maxBounds = [
    [90, 210],
    [-90, -210],
]

function MapView(props) {
    // Props
    const { locationArray, viewport, onViewportChanged, onSelectMarker } = props;

    // Elements
    const markerElements = locationArray.map(location => {
        const {
            id, coordinates: { latitude, longitude },
            country, country_code, province,
            latest: { confirmed }
        } = location;

        let markerIcon = markerIcons.xxSmall
        if (confirmed >= 101 && confirmed <= 500) {
            markerIcon = markerIcons.xSmall;
        }
        else if (confirmed >= 501 && confirmed <= 1000) {
            markerIcon = markerIcons.small;
        }
        else if (confirmed >= 1001 && confirmed <= 5000) {
            markerIcon = markerIcons.normal;
        }
        else if (confirmed >= 5001 && confirmed <= 10000) {
            markerIcon = markerIcons.large;
        }
        else if (confirmed >= 10001 && confirmed <= 50000) {
            markerIcon = markerIcons.xLarge;
        }
        else if (confirmed >= 50001) {
            markerIcon = markerIcons.xxLarge;
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
                onclick={_ => onSelectMarker(id)}
                onmouseover={e => e.target.openPopup()}
                onmouseout={e => e.target.closePopup()} >
                <Popup autoPan={false}>
                    <b>{title}</b>
                </Popup>
            </Marker>
        );
    });

    return (
        <Map
            className="map-view"
            viewport={viewport}
            zoomControl={false}
            maxBounds={maxBounds}
            maxBoundsViscosity={1.0}
            minZoom={2}
            onViewportChanged={onViewportChanged}>
            <ZoomControl position="topright" />
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot; target=&quot;_blank&quot;>OpenStreetMap</a> contributors"
            />
            {markerElements}
        </Map>
    )
}

export default MapView;

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