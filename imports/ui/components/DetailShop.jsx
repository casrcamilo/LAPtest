/** Libraries */
import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles/';
import { Container, Typography, IconButton } from '@material-ui/core';

/** Icons */
import CloseIcon from '@material-ui/icons/Close';

/** API & Utils */
import { openShopDetails } from '../../actions'

/** Styles */
const useStyles = makeStyles(theme => ({
    CloseIcon:{
        position: 'absolute',
        top: 5,
        right: 5,
    }
}));

const DetailShop = ({ shop, openShopDetails }) => {
    const classes = useStyles();

    exitClick = () => {
        openShopDetails(false);
    }

    return (
        <Container>
            <IconButton className={classes.CloseIcon} onClick={exitClick}>
                <CloseIcon fontSize="small" />
            </IconButton>
            <Typography component="h6">
                {shop.name}
            </Typography>
        </Container>
    )
}

const mapStatetoProps = state => {
    return {
        shop: state.shopSelected
    }
}

const mapDispatchToProps = {
    openShopDetails,
}

export default connect(mapStatetoProps, mapDispatchToProps)(DetailShop)