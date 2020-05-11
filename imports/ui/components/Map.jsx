/** Libraries */
import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps'
import MarkList from './MarkList';
import { connect } from 'react-redux';

/** Icons */
//import markerPin from '../../assets/images/pin.png'

// 4.666342, -74.060677
const Map = ({ defaultCenter, openForm }) => {

    return (
        <GoogleMap 
            defaultZoom={15}
            center={defaultCenter}   
   
        >
            {!openForm && <MarkList />}
        </GoogleMap>

    );
}

const mapStateToProps = ( state ) => {
    return {
        openForm: state.openAddShopForm,
        defaultCenter: state.defaultCenter
    }
};

export default connect(mapStateToProps, null)(withScriptjs(
    withGoogleMap(Map) 
));

