/** Libraries */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles/';
import { Container, Button } from '@material-ui/core';
import { connect } from 'react-redux';

/** API & Utils */
import { Ratings } from '../../api/ratings';
import { updateShowNewRatingCard } from '../../actions';

/** Styles */
const useStyles = makeStyles(() => ({
  ContainerMakeComment: {
    display: 'flex',
    alignItems: 'center',
    height: '8%',
    backgroundColor: 'white',
    borderRadius: '0 0 10px 10px',
    borderTop: '0.5px solid #e3e3e3',
    '& button':{
      display: 'block',
      margin: 'auto',
    },
  },
}));

const MakeRating = ({
  activeUser,
  placeSelected,
  openNewRatingCard,
  updateShowNewRatingCard
}) => {
  const classes = useStyles();

  const addRating = (e) => {
    e.preventDefault;
    updateShowNewRatingCard(true);
  };

  return (
    <>
      {!(Ratings.findOne({ 'author._id': activeUser._id, place_id: placeSelected._id }))
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
        )}
    </>
  );
};

const mapStateToProps = (state) => ({
  activeUser: state.user,
  placeSelected: state.placeSelected,
  openNewRatingCard: state.openNewRatingCard,
});

const mapDispatchToProps = {
  updateShowNewRatingCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(MakeRating);
