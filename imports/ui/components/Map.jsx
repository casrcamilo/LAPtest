/** Libraries */
import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps'
import MarkList from './MarkList'

/** Icons */
//import markerPin from '../../assets/images/pin.png'

// 4.666342, -74.060677
const Map = () => {

    return (
        <GoogleMap 
            defaultZoom={15}
            defaultCenter={{ lat: 4.666342, lng: -74.060677 }}  
        >
            <MarkList />
        </GoogleMap>

    );
}

export default withScriptjs(
    withGoogleMap(Map) 
);

