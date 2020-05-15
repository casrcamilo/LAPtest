/** Libraries */
import React from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from 'react-google-maps';
import { connect } from 'react-redux';
import MarkList from './MarkList';

/** API & Utils */
import { updateNewPlaceCoordinates } from '../../actions';

const Map = ({
  defaultCenter,
  openForm,
  updateNewPlaceCoordinates,
  newPlace,
}) => {
  const handleLeftClick = (e) => {
    const point = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    updateNewPlaceCoordinates(point);
  };

  return (
    <GoogleMap
      defaultZoom={15}
      center={defaultCenter}
      onClick={openForm ? (e) => handleLeftClick(e) : null}
    >
      {openForm ? <Marker position={{ lat: newPlace.lat, lng: newPlace.lng }} /> : <MarkList />}
    </GoogleMap>

  );
};

const mapStateToProps = (state) => ({
  openForm: state.openAddPlaceForm,
  defaultCenter: state.defaultCenter,
  newPlace: state.newPlace,
});

const mapDispatchToProps = {
  updateNewPlaceCoordinates,
};

export default connect(mapStateToProps, mapDispatchToProps)(withScriptjs(
  withGoogleMap(Map),
));
