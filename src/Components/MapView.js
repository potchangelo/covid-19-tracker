import React from 'react';
import { divIcon } from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

/*
location confirmed count => icon style
1-100 => pink, super very small
100-500 => pink, very small
501-1000 => pink, small
1001-5000 => purple, normal
5001-10000 => purple, big
10001-50000 => red, very big
50000 up => red, super very big
*/
const markerIcons = {
	xxSmall: divIcon({
		className: 'case__marker pink', iconSize: [10, 10],
	}),
	xSmall: divIcon({
		className: 'case__marker pink', iconSize: [16, 16]
	}),
	small: divIcon({
		className: 'case__marker pink', iconSize: [24, 24]
	}),
	normal: divIcon({
		className: 'case__marker purple', iconSize: [32, 32]
	}),
	large: divIcon({
		className: 'case__marker purple', iconSize: [48, 48]
	}),
	xLarge: divIcon({
		className: 'case__marker red', iconSize: [72, 72]
	}),
	xxLarge: divIcon({
		className: 'case__marker red', iconSize: [96, 96]
	})
};

function MapView(props) {
    const { locationArray, center, zoom, onSelectMarker } = props;
    // Elements
    const markerElements = locationArray.map(location => {
        const {
            id, coordinates: { lat, long },
            country, province, confirmedCount
        } = location;

        let markerIcon = markerIcons.xxSmall
        if (confirmedCount >= 101 && confirmedCount <= 500) {
            markerIcon = markerIcons.xSmall;
        }
        else if (confirmedCount >= 501 && confirmedCount <= 1000) {
            markerIcon = markerIcons.small;
        }
        else if (confirmedCount >= 1001 && confirmedCount <= 5000) {
            markerIcon = markerIcons.normal;
        }
        else if (confirmedCount >= 5001 && confirmedCount <= 10000) {
            markerIcon = markerIcons.large;
        }
        else if (confirmedCount >= 10001 && confirmedCount <= 50000) {
            markerIcon = markerIcons.xLarge;
        }
        else if (confirmedCount >= 50001) {
            markerIcon = markerIcons.xxLarge;
        }

        const label = (province !== '') ? `${province}, ${country}` : country;

        return (
            <Marker
                key={id}
                position={[lat, long]}
                icon={markerIcon}
                onclick={_ => onSelectMarker(id)}
                onmouseover={e => e.target.openPopup()}
                onmouseout={e => e.target.closePopup()} >
                <Popup>
                    <b>{label}</b>
                </Popup>
            </Marker>
        );
    });

    return (
        <Map className="mapview" center={center} zoom={zoom}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            {markerElements}
        </Map>
    )
}

export default MapView;