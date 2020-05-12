import React from 'react';
import { makeStyles } from '@material-ui/core/styles/';
import { Card, CardHeader, CardContent, Typography, Avatar, IconButton } from '@material-ui/core'
import Rating from 'react-rating' ;
import { connect } from 'react-redux';

/** Icons */
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

/** Styles */
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
    IconRating:{
        color: '#D4AF37',
        fontSize: '14px'
    }
}));

const Comment  = ({ calificationData, activeUser }) => {
    const { calificated, comment, rating } = calificationData;
    const { id, displayName, photoUrl } = calificationData.author
    const classes = useStyles();

    return(
        <Card className={classes.CardMain}>
            <CardHeader
                avatar={
                    <Avatar alt="Profile Image" src={photoUrl} aria-label="recipe" className={classes.avatar} />
                }
                action={activeUser._id === id 
                        && <IconButton aria-label="settings">
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
                        {calificated.toLocaleDateString("es-CO", { year: 'numeric', month: 'long', day: 'numeric' })}
                    </Typography> 
                }
            />
            <CardContent className={classes.CardContent}>
                <Rating
                    emptySymbol={<StarBorderIcon className={classes.IconRating}/>}
                    fullSymbol={<StarIcon className={classes.IconRating}/>}
                    initialRating={rating}
                    readonly
                    fractions={2}
                />
                <Typography variant="body2" color="textSecondary" component="p">
                    {comment}
                </Typography> 
            </CardContent>
        </Card>
    )
}

const mapStateToProps = ( state ) => {
    return {
        activeUser: state.user
    }
}

export default connect(mapStateToProps,null)(Comment);