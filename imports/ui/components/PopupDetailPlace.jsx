/** Libraries */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles/';
import { Paper } from '@material-ui/core';

/** Components */
import DetailPlace from './DetailPlace';

/** Styles */
const useStyles = makeStyles(() => ({
  Paper: {
    width: 350,
    height: '70vh',
    position: 'absolute',
    top: '15vh',
    left: '0.5vw',
    padding: 0,
    backgroundColor: '#e3e3e3',
  },
}));

const PopupDetailPlace = () => {
  const classes = useStyles();

  return (
    <Paper
      elevation={3}
      className={classes.Paper}
    >
      <DetailPlace />
    </Paper>
  );
};

export default PopupDetailPlace;
