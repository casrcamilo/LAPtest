/** Libraries */
import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles/';
import { Container, Typography, IconButton } from '@material-ui/core';

/** API & Utils */
import { openAddShopForm } from '../../actions'

/** Icons */
import CloseIcon from '@material-ui/icons/Close';

/** Styles */
const useStyles = makeStyles(theme => ({
    CloseIcon:{
        position: 'absolute',
        top: 5,
        right: 5,
    }
}));

const AddShopForm = ({ openAddShopForm }) => {
    const classes = useStyles(); 

    exitClick = () => {
        openAddShopForm(false);
    }

    return (
        <Container>
            <IconButton className={classes.CloseIcon} onClick={exitClick}>
                <CloseIcon fontSize="small" />
            </IconButton>
            <Typography component="h6">
                holii
            </Typography>
        </Container>
    )
}

const mapDispatchtoProps = {
    openAddShopForm
}

export default connect(null, mapDispatchtoProps)(AddShopForm);