/** Libraries */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles/';
import {
  Container,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Select,
  MenuItem,
  Button,
  InputAdornment,
  ListItemIcon,
  Icon,
  ListItemText,
  ListItem,
} from '@material-ui/core';

/** Icons */
import CloseIcon from '@material-ui/icons/Close';
import RoomIcon from '@material-ui/icons/Room';

/** API & Utils */
import defaultPlacesTypesList from '../../utils/placeTypes';
import { Places } from '../../api/places';
import { updateShowPlaceForm, updateNewPlaceData, deletePlaceData } from '../../actions';

/** Styles */
import theme from '../../styles/Theme';

const useStyles = makeStyles(() => ({
  Container: {
    textAlign: 'center',
  },
  CloseIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  ButtonSubmit: {
    marginTop: 10,
  },
}));


/* eslint-disable no-shadow */
const AddPlaceForm = ({
  user,
  newPlace,
  updateShowPlaceForm,
  updateNewPlaceData,
  deletePlaceData
}) => {
  const classes = useStyles();
  const [placeName, setPlaceName] = useState(newPlace.placeName);
  const [placeType, setPlaceType] = useState(newPlace.placeType);
  const [errorFields, setErrorFields] = useState({
    placeName: false,
    placeType: false,
  });

  const handleBlur = (e) => {
    const { name, value } = e.target;
    console.log(value);
    if (!value) {
      setErrorFields({ [name]: false });
    }
    updateNewPlaceData({ [name]: value });
  };

  const handleSubmit = () => {
    // Create a new Place
    Places.insert({ ...newPlace, userOwnerId: user._id, rate: 0 });

    // Clear place data
    deletePlaceData({});

    // Close Form Popup
    updateShowPlaceForm(false);
  };

  const exitClick = () => {
    updateShowPlaceForm(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.Container}>
        <IconButton className={classes.CloseIcon} onClick={exitClick}>
          <CloseIcon fontSize="small" />
        </IconButton>
        <Typography variant="h4" align="left">
          Ingresar nuevo sitio
        </Typography>

        <Typography variant="caption" align="left" display="block" gutterBottom>
          {`${newPlace.lat}, ${newPlace.lng}`}
        </Typography>

        <FormControl required margin="normal" color="primary" fullWidth error={errorFields.placeName}>
          <InputLabel htmlFor="form-placeName">Nombre del sitio</InputLabel>
          <Input
            id="form-placeName"
            type="text"
            name="placeName"
            fullWidth
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
            aria-describedby="form-placeName-errorText"
            onBlur={(e) => handleBlur(e)}
            variant="outlined"
            startAdornment={(
              <InputAdornment position="start">
                <RoomIcon />
              </InputAdornment>
            )}
          />
          {errorFields.placeName && <FormHelperText id="form-placeName-errorText" error> Este campo es obligatorio </FormHelperText> }
        </FormControl>

        <FormControl required margin="normal" color="secondary" fullWidth error={errorFields.placeType}>
          <InputLabel htmlFor="form-placeType">Tipo de establecimiento</InputLabel>
          <Select
            id="form-placeType"
            type="text"
            name="placeType"
            fullWidth
            value={placeType}
            defaultValue={newPlace.placeType}
            aria-describedby="form-placeType-errorText"
            onChange={(e) => setPlaceType(e.target.value)}
            onBlur={(e) => handleBlur(e)}
          >
            {defaultPlacesTypesList.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                <ListItem>
                  <ListItemIcon>
                    <Icon>
                      {type.icon}
                    </Icon>
                  </ListItemIcon>
                  <ListItemText primary={type.label} />
                </ListItem>
              </MenuItem>
            ))}
          </Select>
          {errorFields.placType && <FormHelperText id="form-placeType-errorText" error>Por favor selecciona un valor</FormHelperText> }
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          className={classes.ButtonSubmit}
          onClick={handleSubmit}
        >
          Agregar
        </Button>

      </Container>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  newPlace: state.newPlace,
  user: state.user,
});

const mapDispatchtoProps = {
  updateShowPlaceForm,
  updateNewPlaceData,
  deletePlaceData,
};

export default connect(mapStateToProps, mapDispatchtoProps)(AddPlaceForm);

AddPlaceForm.propTypes = {
  user: PropTypes.shape.isRequired,
  newPlace: PropTypes.shape.isRequired,
  updateShowPlaceForm: PropTypes.func.isRequired,
  updateNewPlaceData: PropTypes.func.isRequired,
  deletePlaceData: PropTypes.func.isRequired,
};
