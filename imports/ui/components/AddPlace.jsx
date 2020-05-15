/** Libraries */
import React, { useState } from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { Fab, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/** Icons */
import AddIcon from '@material-ui/icons/Add';

/** Components */
import AddPlaceForm from './AddPlaceForm';

/** API & Utils */
import { updateShowPlaceForm } from '../../actions';

/** Styles */
import theme from '../../styles/Theme';

const useStyles = makeStyles(() => ({
  AddButton: {
    position: 'absolute',
    bottom: '3vh',
    left: '1.5vw',
    height: 56,
  },
  Paper: {
    height: '70vh',
    position: 'absolute',
    top: '15vh',
    left: '0.5vw',
    padding: '10px',
  },
}));

/* eslint-disable no-shadow */
const AddPlace = ({ openForm, updateShowPlaceForm }) => {
/* es-lint-enable */

  const classes = useStyles();
  const [hoverButton, setHoverButton] = useState(false);

  const handleClick = () => {
    updateShowPlaceForm(true);
  };

  const handleEnterHover = () => {
    setHoverButton(true);
  };

  const handleLeaveHover = () => {
    setHoverButton(false);
  };

  return (
    <ThemeProvider theme={theme}>
      {openForm
        && (
          <Paper elevation={3} className={classes.Paper}>
            <AddPlaceForm />
          </Paper>
        )}
      <Fab
        color="primary"
        aria-label="add"
        className={classes.AddButton}
        onClick={() => handleClick()}
        onMouseEnter={() => handleEnterHover()}
        onMouseLeave={() => handleLeaveHover()}
        variant={hoverButton ? 'extended' : 'round'}
      >
        <AddIcon />
        {hoverButton ? 'Agregar Establecimiento' : null}
      </Fab>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  openForm: state.openAddPlaceForm,
});

const mapDispatchToProps = {
  updateShowPlaceForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPlace);

AddPlace.propTypes = {
  openForm: PropTypes.bool.isRequired,
  updateShowPlaceForm: PropTypes.func.isRequired,
};
