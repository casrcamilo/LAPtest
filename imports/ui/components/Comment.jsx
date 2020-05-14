import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles/';
import { Card, CardHeader, CardContent, CardActions, Typography, Avatar, IconButton, Button, Menu, MenuItem, TextField } from '@material-ui/core'
import Rating from 'react-rating' ;
import { connect } from 'react-redux';

/** Icons */
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

/** API & Utils */
import { Ratings } from '../../api/ratings';
import { setOpenNewRatingCard, setCommentEditable, setCommentToEdit } from '../../actions'

/** Styles */
// CSS properties of a new styled menu from MaterialUI Menu Base
const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
    })(props => (
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

const useStyles = makeStyles(theme => ({
    CardMain:{
        margin: '10px 10px 0 10px',
        '&:last-child':{
            marginBottom: '10px',
        }
    },
    CardContent:{
        padding: '0px 15px 10px 15px',
        '&:last-child':{
            paddingBottom: '10px',
        }
    },
    CardActions:{
        textAlign:'right',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    IconRating:{
        color: '#D4AF37',
        fontSize: '14px'
    }
}));

const Comment  = ({ ratingData, 
                    activeUser, 
                    setOpenNewRatingCard, 
                    commentEditable, 
                    setCommentEditable, 
                    commentToEdit,
                    setCommentToEdit }) => {

    const rating_id = ratingData._id
    const { calificatedAt, comment, rating } = ratingData;
    const { _id, displayName, photoURL } = ratingData.author
    const [ anchorEl, setAnchorEl ] = useState(null);
    const [ temporalComment, setTemporalComment ] = useState(comment)
    const [ temporalRating, setTemporalRating] = useState(rating)
    const [ commentEdit, setcommentEdit ] = useState(false)
    const classes = useStyles();

    //Open dropdown Menu
    handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    //Close dropdown Menu
    handleClose = () => {
        setAnchorEl(null);
    };

    handleCancelClick = () => {
        setCommentEditable(false);
    }

    handleUpdateSubmit = () => {
        //create the docuement object
        var document = {
            'calificatedAt': new Date,
            'comment': temporalComment,
            'rating': temporalRating
        }

        //Update rating to DB
        try {
            Ratings.update(
                {_id: commentToEdit},
                { '$set': document}
            );
            setCommentEditable(false);
            setCommentToEdit("");
            
        } catch (error) {
            throw new Meteor.Error('error', 'reason for error');
        }
    }

    editComment = () => {
        setCommentToEdit(rating_id);
        setCommentEditable(true);
        setAnchorEl(null);
    }

    deleteComment = () => {
        //Delete rating in DB
        try {
            Ratings.remove(
                {_id: rating_id},
            );
            setCommentEditable(false);
            setCommentToEdit("");
            
        } catch (error) {
            throw new Meteor.Error(error, [error.reason], [error.details]);
        }
        
    }

    return(
        <>
            <Card className={classes.CardMain}>
                <CardHeader
                    avatar={
                        <Avatar alt="Profile Image" 
                                src={photoURL} 
                                aria-label="recipe" 
                                className={classes.avatar} 
                        />
                    }
                    action={activeUser._id === _id 
                            && <IconButton onClick={handleClick} aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                    }
                    title={
                        <Typography variant="h6" color="textPrimary">
                            {displayName}
                        </Typography> 
                    }
                    subheader={
                        <Typography variant="caption" color="textSecondary" display="block" gutterBottom>
                            {calificatedAt.toLocaleDateString("es-CO", { year: 'numeric', month: 'long', day: 'numeric' })}
                        </Typography> 
                    }
                />
                <CardContent className={classes.CardContent}>
                    <Rating
                        emptySymbol={<StarBorderIcon className={classes.IconRating}/>}
                        fullSymbol={<StarIcon className={classes.IconRating}/>}
                        initialRating={temporalRating}
                        onClick={( value ) => setTemporalRating(value)}
                        readonly={!commentToEdit === rating_id}
                        fractions={2}
                    />
                    {commentToEdit === rating_id
                    ?   <TextField
                            id="standard-multiline-flexible"
                            label="Haz un comentario..."
                            multiline
                            fullWidth
                            rowsMax={4}
                            value={temporalComment}
                            onChange={( e ) => setTemporalComment(e.target.value)}

                        />
                    :   <Typography variant="body2" color="textSecondary" component="p">
                            {comment}
                        </Typography> 
                    }
                </CardContent>
                {commentToEdit === rating_id
                &&  <CardActions className={classes.CardActions}>
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
                            disabled={!Boolean(temporalRating)}
                            onClick={handleUpdateSubmit}
                        >
                            Guardar
                        </Button>
                    </CardActions>
                }
            </Card>

            {/* Styled Dropdown Menu */} 
            <StyledMenu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={editComment} >Editar</MenuItem>
                <MenuItem onClick={deleteComment} >Eliminar</MenuItem>
            </StyledMenu>
        </>
    )
}

const mapStateToProps = ( state ) => {
    return {
        activeUser: state.user,
        commentEditable: state.commentEditable,
        commentToEdit: state.commentToEdit
    }
};

const mapDispatchtoProps = {
    setOpenNewRatingCard,
    setCommentEditable,
    setCommentToEdit
};

export default connect(mapStateToProps,mapDispatchtoProps)(Comment);