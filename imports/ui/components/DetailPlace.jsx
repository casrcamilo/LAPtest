/** Libraries */
import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles/';
import { withTracker } from 'meteor/react-meteor-data';
import {
  Container, Grid, Typography, IconButton, Avatar, Icon, Button,
} from '@material-ui/core';
import Rating from 'react-rating';

/** Icons */
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

/** Components */
import RatingList from './RatingList';
import NewRatingCard from './NewRatingCard';

/** API & Utils */
import { Ratings } from '../../api/ratings';
import { Places } from '../../api/places';
import defaultPlacesTypesList from '../../utils/placeTypes';
import { loadPlaceDetails, updateShowNewRatingCard } from '../../actions';

/** Styles */
const useStyles = makeStyles(() => ({
  ContainerMain: {
    padding: '10px 10px 0 10px',
    borderRadius: '10px 10px 0 0',
    backgroundColor: 'white',
    height: '35%',
  },
  ContainerHead: {
    display: 'flex',
    padding: 0,
  },
  TitleHead: {
    flex: '1',
  },
  DeleteButton: {
    color: 'red',
  },
  ContainerPlaceInfo: {
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    marginBottom: 5,
  },
  ContainerRating: {
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    marginTop: 5,
  },
  AvatarPlaceType: {
    width: 80,
    height: 80,
  },
  PlaceTypeIcon: {
    textAlign: 'center',
    display: 'block',
    margin: 'auto',
    fontSize: '3rem',
  },
  LabelCoordinates: {
    fontSize: '9px',
    fontWeight: '200',
    fontStyle: 'italic',
  },
  LabelRating: {
    fontWeight: '200',
    fontStyle: 'italic',
  },
  IconRating: {
    color: '#EB6E00',
  },
  ContainerComments: {
    padding: 0,
    overflow: 'auto',
    height: '57%',
  },
  ContainerMakeComment: {
    display: 'flex',
    alignItems: 'center',
    height: '8%',
    backgroundColor: 'white',
    borderRadius: '0 0 10px 10px',
    borderTop: '0.5px solid #e3e3e3',
    '& button': {
      display: 'block',
      margin: 'auto',
    },
  },
}));

const DetailPlace = (props) => {
  const {
    activeUser,
    place,
    openNewRatingCard,
    loadPlaceDetails,
    updateShowNewRatingCard,
    hasRating,
  } = props;
  const { placeType, placeName, rating, lat, lng, userOwnerId } = place;

  const hasUser = Object.keys(activeUser).length > 0;
  const classes = useStyles();

  const exitClick = () => {
    loadPlaceDetails(false);
    updateShowNewRatingCard(false);
  };

  const deletePlaceSubmit = () => {
    // Delete place in DB
    try {
      Places.remove(
        { _id: place._id },
      );
      loadPlaceDetails(false);
    } catch (error) {
      throw new Meteor.Error(error, [error.reason], [error.details]);
    }
  };

  const handleChangeRating = (value) => {
    value.preventDefault();
  };

  const addRating = (e) => {
    e.preventDefault();
    updateShowNewRatingCard(true);
  };

  return (
    <>
      <Container className={classes.ContainerMain}>
        <Container className={classes.ContainerHead}>
          <Typography variant="h4" align="left" display="block" className={classes.TitleHead}>
            Información
          </Typography>
          {/* If the current user is place registry's owner */}
          {activeUser._id === userOwnerId
            && (
              <IconButton className={classes.DeleteButton} onClick={deletePlaceSubmit}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          <IconButton className={classes.CloseButton} onClick={exitClick}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Container>
        <Grid container className={classes.ContainerPlaceInfo} spacing={2}>
          <Grid item xs={3}>
            {defaultPlacesTypesList.map((defaultPlaceType) => defaultPlaceType.value === placeType
              && (
              <Avatar
                key={defaultPlaceType.icon}
                className={classes.AvatarPlaceType}
                style={{ backgroundColor: defaultPlaceType.color }}
              >
                <Icon className={classes.PlaceTypeIcon}>
                  {defaultPlaceType.icon}
                </Icon>
              </Avatar>
              ))}
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h5" align="left" display="block">
              {placeName}
            </Typography>
            <Typography variant="caption" align="left" className={classes.LabelCoordinates}>
              {`${lat}, ${lng}`}
            </Typography>

            <Container className={classes.ContainerRating}>
              <Rating
                emptySymbol={<StarBorderIcon className={classes.IconRating} />}
                fullSymbol={<StarIcon className={classes.IconRating} />}
                initialRating={rating}
                readonly
                fractions={2}
                onChange={(value) => handleChangeRating(value)}
              />
              <Typography variant="caption" align="left" className={classes.LabelRating}>
                (4.5) 1 voto(s)
              </Typography>
            </Container>
          </Grid>
        </Grid>
        <Typography variant="h5" align="left" display="block">
          Comentarios:
        </Typography>
      </Container>
      <Container className={classes.ContainerComments}>
        {/* Open a new card to rating and write the comment */}
        {openNewRatingCard && <NewRatingCard /> }
        <RatingList />
      </Container>

      {/* The user is Loggedin and already has a rating of this place? */ }
      {hasUser && hasRating
        /* The User has open a comment card? */
        ? !openNewRatingCard
          && (
            <Container className={classes.ContainerMakeComment}>
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => addRating(e)}
              >
                Calificar
              </Button>
            </Container>
          ) : null}
    </>
  );
};

const mapStatetoProps = (state) => ({
  activeUser: state.user,
  place: state.placeSelected,
  openNewRatingCard: state.openNewRatingCard,
});

const mapDispatchToProps = {
  loadPlaceDetails,
  updateShowNewRatingCard,
};

export default connect(mapStatetoProps, mapDispatchToProps)(withTracker(({ activeUser, place }) =>{
  return {
    hasRating: !(Ratings.findOne({ 'author._id': activeUser._id, place_id: place._id })),
  };
})(DetailPlace));
