/** Libraries */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles/';
import { Container } from '@material-ui/core';
import { connect } from 'react-redux';

/** Components */
import Map from  '../components/Map';
import PopupDetailShop from '../components/PopupDetailShop'
import AddShop from '../components/AddShop'

/** API & Utils */
import credentials from '../../utils/credentialsGoogleMaps'
const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${credentials.mapsKey}`

/** Styles */
const useStyles = makeStyles(theme => ({
    ContainerMap: {
        height: '93vh',
        margin: 0,
        padding: 0,
    },
}));


const Home = ({ user, openShopdetails }) => {
    const classes = useStyles();
    const hasUser = Object.keys(user).length > 0;

    return(
        <>
            <Map
                googleMapURL={mapURL}
                containerElement={<Container maxWidth={false} className={classes.ContainerMap} />}
                mapElement={<div style={{height: '100%'}}/>}
                loadingElement={<p>Cargando...</p>}
            />

            { openShopdetails && <PopupDetailShop/> }

            { hasUser && <AddShop/> }
        </>
    )
}

const mapStateToProps = ( state ) => {
    return { 
        user: state.user,
        openShopdetails:  state.openShopDetails
    }
}

export default connect(mapStateToProps, null)(Home)