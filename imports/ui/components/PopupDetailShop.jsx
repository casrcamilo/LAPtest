/** Libraries */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles/';
import { Paper } from '@material-ui/core';

/** Components */
import DetailShop from './DetailShop'

/** Styles */
const useStyles = makeStyles(theme => ({
    Paper:{
        height: '70vh',
        width: '15vw',
        position: 'absolute',
        top: '15vh',
        left: '0.5vw',
        padding: '10px'
    }
}));

export default PopupDetailShop = () => {

    const classes = useStyles();

    return (
        <Paper 
            elevation={3} 
            children={<DetailShop/>} 
            className={classes.Paper}
        />
    )
}