import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles/';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  TextField,
} from '@material-ui/core';
import Rating from 'react-rating';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor'

/** Icons */
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

/** API & Utils */
import { Ratings } from '../../api/ratings';
import { updateShowNewRatingCard, updateCommentEditable, updateCommentToEdit } from '../../actions';

/** Styles */
// CSS properties of a new styled menu from MaterialUI Menu Base
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
));

const useStyles = makeStyles(() => ({
  CardMain: {
    margin: '10px 10px 0 10px',
    '&:last-child': {
      marginBottom: '10px',
    },
  },
  CardContent: {
    padding: '0px 15px 10px 15px',
    '&:last-child': {
      paddingBottom: '10px',
    },
  },
  CardActions: {
    textAlign: 'right',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  IconRating: {
    color: '#D4AF37',
    fontSize: '14px',
  },
}));

const Comment = ({
  place,
  ratingData,
  activeUser,
  commentToEdit,
  commentEditable,
  updateShowNewRatingCard,
  updateCommentEditable,
  updateCommentToEdit
}) => {
  const ratingId = ratingData._id
  const placeId = place._id
  const { calificatedAt, comment, rating } = ratingData;
  const { _id, displayName, photoURL } = ratingData.author;
  const [anchorEl, setAnchorEl] = useState(null);
  const [temporalComment, setTemporalComment] = useState(comment);
  const [temporalRating, setTemporalRating] = useState(rating);
  const [commentEdit, setcommentEdit] = useState(false);
  const classes = useStyles();

  // Open dropdown Menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close dropdown Menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCancelClick = () => {
    updateCommentEditable(false);
  };

  const handleUpdateSubmit = () => {
    // create the docuement object
    const document = {
      calificatedAt: new Date(),
      comment: temporalComment,
      rating: temporalRating,
    };

    Meteor.call('ratings.update', commentToEdit, placeId, document);
    updateCommentEditable(false);
    updateCommentToEdit('');
  };

  const editComment = () => {
    updateCommentToEdit(ratingId);
    updateCommentEditable(true);
    setAnchorEl(null);
  };

  const deleteComment = () => {
    // Delete rating in DB
    try {
      Ratings.remove(
        { _id: ratingId },
      );
      updateCommentEditable(false);
      updateCommentToEdit('');
    } catch (error) {
      throw new Meteor.Error(error, [error.reason], [error.details]);
    }
  };

  return (
    <>
      <Card className={classes.CardMain}>
        <CardHeader
          avatar={(
            <Avatar
              alt="Profile Image"
              src={photoURL}
              aria-label="recipe"
              className={classes.avatar}
            />
          )}
          action={activeUser._id === _id
            && (
            <IconButton onClick={handleClick} aria-label="settings">
              <MoreVertIcon />
            </IconButton>
            )}
          title={(
            <Typography variant="h6" color="textPrimary">
              {displayName}
            </Typography>
          )}
          subheader={(
            <Typography variant="caption" color="textSecondary" display="block" gutterBottom>
              {calificatedAt.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}
            </Typography>
          )}
        />
        <CardContent className={classes.CardContent}>
          <Rating
            emptySymbol={<StarBorderIcon className={classes.IconRating} />}
            fullSymbol={<StarIcon className={classes.IconRating} />}
            initialRating={temporalRating}
            onClick={(value) => setTemporalRating(value)}
            readonly={!commentToEdit === ratingId}
            fractions={2}
          />
          {commentToEdit === ratingId
            ? (
              <TextField
                id="standard-multiline-flexible"
                label="Haz un comentario..."
                multiline
                fullWidth
                rowsMax={4}
                value={temporalComment}
                onChange={(e) => setTemporalComment(e.target.value)}
              />
            ) : (
              <Typography variant="body2" color="textSecondary" component="p">
                {comment}
              </Typography>
            )}
        </CardContent>
        {commentToEdit === ratingId
        && (
        <CardActions className={classes.CardActions}>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            onClick={handleCancelClick}
          >
            Cancelar
          </Button>
          <Button
            size="small"
            color="primary"
            variant="contained"
            disabled={!temporalRating}
            onClick={handleUpdateSubmit}
          >
            Guardar
          </Button>
        </CardActions>
        )}
      </Card>

      {/* Styled Dropdown Menu */}
      <StyledMenu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={editComment}> Editar </MenuItem>
        <MenuItem onClick={deleteComment}> Eliminar </MenuItem>
      </StyledMenu>
    </>
  );
};

const mapStateToProps = (state) => ({
  place: state.placeSelected,
  activeUser: state.user,
  commentEditable: state.commentEditable,
  commentToEdit: state.commentToEdit,
});

const mapDispatchtoProps = {
  updateShowNewRatingCard,
  updateCommentEditable,
  updateCommentToEdit,
};

export default connect(mapStateToProps, mapDispatchtoProps)(Comment);
