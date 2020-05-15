/** Libraries */
import React, { useState, useEffect } from 'react';
import { Marker } from 'react-google-maps';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** API & Utils */
import { Places } from '../../api/places';
import defaultPlaceTypesList from '../../utils/placeTypes';
import { updatePlaceSelected, loadPlaceDetails, updateDefaultCenter } from '../../actions';

/* eslint-disable no-shadow */
const MarkList = ({
  places,
  updatePlaceSelected,
  loadPlaceDetails,
  updateDefaultCenter,
}) => {
  // const [placeClicked, setPlaceClicked] = useState(null);

  const handleSelectMarkerClick = (place) => {
    updatePlaceSelected(place);
    updateDefaultCenter({ lat: place.lat, lng: place.lng });
    loadPlaceDetails(true);
  };

  const filterUrlPlacesTypes = (placeType) => {
    const placeTypeFiltered = defaultPlaceTypesList.filter(
      (defaultPlaceType) => defaultPlaceType.value === placeType,
    );
    return placeTypeFiltered[0].url;
  };

  return (
    <>
      {places.map((place) => {
        const placeTypeUrl = filterUrlPlacesTypes(place.placeType);
        return (
          <Marker
            key={place._id}
            position={{ lat: place.lat, lng: place.lng }}
            onClick={() => handleSelectMarkerClick(place)}
            icon={{ url: placeTypeUrl, scaledSize: new google.maps.Size(32, 45) }}
          />
        );
      })}
    </>
  );
};

const mapDispatchToProps = {
  updatePlaceSelected,
  loadPlaceDetails,
  updateDefaultCenter,
};

export default connect(null, mapDispatchToProps)(withTracker(() => ({
  places: Places.find({}, { sort: { createdAt: -1 } }).fetch(),
}))(MarkList));

MarkList.propTypes = {
  places: PropTypes.shape.isRequired,
  updatePlaceSelected: PropTypes.func.isRequired,
  loadPlaceDetails: PropTypes.func.isRequired,
  updateDefaultCenter: PropTypes.func.isRequired,
};
