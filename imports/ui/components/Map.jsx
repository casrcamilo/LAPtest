/** Libraries */
import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps'
import MarkList from './MarkList';
import { connect } from 'react-redux';

/** API & Utils */
import { setNewShopCoordinates } from '../../actions'

/** Icons */
//import markerPin from '../../assets/images/pin.png'

// 4.666342, -74.060677
const Map = ({ defaultCenter, openForm, setNewShopCoordinates, newShop }) => {

    handleLeftClick = ( e ) => {
        var point = {
            'lat': e.latLng.lat(),
            'lng': e.latLng.lng(),
        };
        setNewShopCoordinates(point);
    }

    return (
        <GoogleMap 
            defaultZoom={15}
            center={defaultCenter} 
            onClick={openForm ? ( e ) => handleLeftClick( e ) : null}
        >
            {openForm ? <Marker position={{ 'lat': newShop.lat, 'lng': newShop.lng }} /> : <MarkList />}
        </GoogleMap>

    );
}

const mapStateToProps = ( state ) => {
    return {
        openForm: state.openAddShopForm,
        defaultCenter: state.defaultCenter,
        newShop : state.newShop
    }
};

const mapDispatchToProps = {
    setNewShopCoordinates,
}

export default connect(mapStateToProps, mapDispatchToProps)(withScriptjs(
    withGoogleMap(Map) 
));

