/** Libraries */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles/';
import { Container, Button } from '@material-ui/core';
import { withTracker } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';

/** API & Utils */
import { Califications } from '../../api/Califications';
import { setOpenNewRatingCard } from '../../actions'

/** Styles */
const useStyles = makeStyles(theme => ({
    ContainerMakeComment:{
        display: 'flex',
        alignItems: 'center',   
        height:'8%',
        backgroundColor: 'white',
        borderRadius: '0 0 10px 10px',
        borderTop: '0.5px solid #e3e3e3',
        '& button':{
            display: 'block',
            margin: 'auto'
        }
    }
}));

const MakeRating = ({ activeUser, shopSelected, openNewRatingCard, setOpenNewRatingCard }) => {

    const classes = useStyles();

    addRating = ( e ) => {
        e.preventDefault
        setOpenNewRatingCard(true);
    }

    return (
        <>
            <p>si</p> 
            {!Boolean(Califications.findOne({ 'author._id': activeUser._id, shop_id : shopSelected._id }))
                && <Container className={classes.ContainerMakeComment}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={ ( e ) => addRating(e)}
                    >
                        Calificar
                    </Button>
                </Container>
            }


        </>
    )
}

const mapStateToProps = ( state ) => {
    return {
        activeUser: state.user,
        shopSelected: state.shopSelected,
        openNewRatingCard : state.openNewRatingCard
    }
}

const mapDispatchToProps = {
    setOpenNewRatingCard,
}

export default connect(mapStateToProps, mapDispatchToProps)(MakeRating);

