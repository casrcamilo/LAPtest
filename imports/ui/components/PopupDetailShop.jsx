/** Libraries */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles/';
import { Paper } from '@material-ui/core';

/** Components */
import DetailShop from './DetailShop'

/** Styles */
const useStyles = makeStyles(theme => ({
    Paper:{
        width: 350,
        height: '70vh',
        position: 'absolute',
        top: '15vh',
        left: '0.5vw',
        padding: 0,
        backgroundColor: '#e3e3e3'
    }
}));

export default PopupDetailShop = () => {

    const classes = useStyles();

    return (
        <Paper 
            elevation={3} 
            children={<DetailShop/>} 
            className={classes.Paper}
        ></Paper>

    )
}