/** Libraries */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles/';
import { Card, CardHeader, CardContent, CardActions, Typography, Avatar, IconButton, Button, TextField, Container } from '@material-ui/core'
import Rating from 'react-rating' ;
import { connect } from 'react-redux';
import { Mongo } from 'meteor/mongo'

/** Icons */
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

/** API & Utils */
import { Califications } from '../../api/Califications';
import { setOpenNewRatingCard } from '../../actions'

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
    CardActions:{
        textAlign:'right',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    ContainerRating:{
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        marginTop: 5,
    },
    LabelRating:{
        fontWeight: '200',
        fontStyle: 'italic',
        marginLeft: 10
    },
    IconRating:{
        color: '#EB6E00',
    }
}));

const Comment  = ({ activeUser, shopSelected, setOpenNewRatingCard }) => {
    const { _id, displayName, photoURL } = activeUser
    const [ temporalComment, setTemporalComment ] = useState("")
    const [ temporalRating, setTemporalRating ] = useState(0)
    const classes = useStyles();

    handleCancelClick = () => {
        setOpenNewRatingCard(false);
    }

    handleSubmit = () => {
        //create the docuement object
        var document = {
            'shop_id': shopSelected._id,
            'calificatedAt': new Date,
            'author':{
                _id,
                displayName,
                photoURL
            },
            'comment': temporalComment,
            'rating': temporalRating
        }

        //Add rating to DB
        try {
            Califications.insert(document);
            setOpenNewRatingCard(false)
            
        } catch (error) {
            throw new Meteor.Error('error', 'reason for error');
        }
       
    }

    return(
        <Card className={classes.CardMain}>
            <CardHeader
                avatar={
                    <Avatar alt="Profile Image" src={photoURL} aria-label="recipe" className={classes.avatar} />
                }
                title={
                    <Typography variant="h6" color="textPrimary">
                        {displayName}
                    </Typography> 
                }
            />
            <CardContent className={classes.CardContent}>
                <Container>
                    <Container className={classes.ContainerRating}>
                        <Rating
                            emptySymbol={<StarBorderIcon className={classes.IconRating}/>}
                            fullSymbol={<StarIcon className={classes.IconRating}/>}
                            initialRating={temporalRating}
                            onClick={( value ) => setTemporalRating(value)}
                            
                            fractions={2}
                        />
                        <Typography variant="caption" align="left" className={classes.LabelRating}>
                            {temporalRating}
                        </Typography>
                    </Container>
                    <TextField
                        id="standard-multiline-flexible"
                        label="Haz un comentario..."
                        multiline
                        fullWidth
                        rowsMax={4}
                        value={temporalComment}
                        onChange={( e ) => setTemporalComment(e.target.value)}

                    />
                </Container>
            </CardContent>
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
                    disabled={!Boolean(temporalRating)}
                    onClick={handleSubmit}
                >
                    Guardar
                </Button>
            </CardActions>
        </Card>
    )
}

const mapStateToProps = ( state ) => {
    return {
        activeUser: state.user,
        shopSelected: state.shopSelected
    }
};

const mapDispatchToProps = {
    setOpenNewRatingCard,
};

export default connect(mapStateToProps,mapDispatchToProps)(Comment);