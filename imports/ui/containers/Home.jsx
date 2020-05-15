/** Libraries */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles/';
import { Container } from '@material-ui/core';
import { connect } from 'react-redux';

/** Components */
import Map from '../components/Map';
import PopupDetailPlace from '../components/PopupDetailPlace';
import AddPlace from '../components/AddPlace';

/** API & Utils */
import credentials from '../../utils/credentialsGoogleMaps';

/** Styles */
const useStyles = makeStyles(() => ({
  ContainerMap: {
    height: '93vh',
    margin: 0,
    padding: 0,
  },
}));

const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${credentials.mapsKey}`;

const Home = ({ user, openPlaceDetails }) => {
  const classes = useStyles();
  const hasUser = Object.keys(user).length > 0;

  return (
    <>
      <Map
        googleMapURL={mapURL}
        containerElement={<Container maxWidth={false} className={classes.ContainerMap} />}
        mapElement={<div style={{ height: '100%' }} />}
        loadingElement={<p>Cargando...</p>}
      />

      { openPlaceDetails && <PopupDetailPlace /> }

      { hasUser && <AddPlace /> }
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  openPlaceDetails: state.openPlaceDetails,
});

export default connect(mapStateToProps, null)(Home);
