/** Libraries */
import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles/';
import { withTracker } from 'meteor/react-meteor-data';
import { Container, Grid, Typography, IconButton, Avatar, Icon, Button, } from '@material-ui/core';
import Rating from 'react-rating' 

/** Components */
import CalificationList from './CalificationList'
import NewRatingCard from './NewRatingCard'

/** Icons */
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

/** API & Utils */
import { Califications } from '../../api/Califications';
import { Shops } from '../../api/Shops';
import { defaultShopTypesList } from '../../utils/shoptypes'
import { openShopDetails, setOpenNewRatingCard, clearShopData } from '../../actions'

/** Styles */
const useStyles = makeStyles(theme => ({
    ContainerMain:{
        padding: '10px 10px 0 10px',
        borderRadius: '10px 10px 0 0',
        backgroundColor: 'white',
        height:'35%'
    },
    ContainerHead:{
        display: 'flex',
        padding: 0
    },
    TitleHead:{
        flex: '1',
    },
    DeleteButton:{
        color: 'red'
    },
    ContainerShopInfo:{
        padding: 0,
        display: 'flex',
        alignItems: 'center',   
        marginBottom: 10,
        marginBottom: 5      
    },
    ContainerRating:{
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        marginTop: 5,
    },
    AvatarShopType:{
        width: 80,
        height: 80 
    },
    ShopTypeIcon:{
        textAlign: 'center',
        display: 'block',
        margin: 'auto',
        fontSize: '3rem'
    },
    LabelCoordinates:{
        fontSize: '9px',
        fontWeight: '200',
        fontStyle: 'italic'
    },
    LabelRating:{
        fontWeight: '200',
        fontStyle: 'italic'
    },
    IconRating:{
        color: '#EB6E00',
    },
    ContainerComments:{
        padding: 0,
        height: '43vh',
        overflow: 'auto',
        height:'57%'
    },
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

const DetailShop = ( props ) => {
    const { 
        activeUser, 
        openShopDetails, 
        openNewRatingCard,
        setOpenNewRatingCard,
        clearShopData,
        hasRating, 
        shop
    } = props
    const { shopType, shopName, rating, lat, lng, userOwnerId } = shop

    const hasUser = Object.keys(activeUser).length > 0;
    const classes = useStyles();

    exitClick = () => {
        openShopDetails(false);
        setOpenNewRatingCard(false);
    };

    deleteShopSubmit = () => {
        //Delete shop in DB
        try {
            Shops.remove(
                {_id: shop._id},
            );
            openShopDetails(false);
            clearShopData({})
            
        } catch (error) {
            throw new Meteor.Error(error, [error.reason], [error.details]);
        } 
    };

    handleChangeRating = ( value ) => {
        value.preventDefault
        console.log(value);
    };

    addRating = ( e ) => {
        e.preventDefault
        setOpenNewRatingCard(true);
    };

    return (
        <>
        <Container className={classes.ContainerMain}>
            <Container className={classes.ContainerHead}>
                <Typography variant="h4" align="left" display="block" className={classes.TitleHead}>
                    Información
                </Typography>
                {/* If the current user is shop's owner */}
                {activeUser._id === userOwnerId
                    &&  <IconButton className={classes.DeleteButton} onClick={deleteShopSubmit} >
                            <DeleteIcon fontSize="small" />
                        </IconButton>  
                }
                <IconButton className={classes.CloseButton} onClick={exitClick}>
                    <CloseIcon fontSize="small" />
                </IconButton>                  
            </Container>
            <Grid container className={classes.ContainerShopInfo} spacing={2} >
                <Grid item xs={3}>
                        {defaultShopTypesList.map( defaultShopType =>
                            defaultShopType.value === shopType 
                            &&  <Avatar key={defaultShopType.icon} className={classes.AvatarShopType} style={{backgroundColor: defaultShopType.color}}>
                                    <Icon className={classes.ShopTypeIcon}>
                                        {defaultShopType.icon}
                                    </Icon>
                                </Avatar>
                        )}
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="h5" align="left" display="block">
                        {shopName}
                    </Typography>
                    <Typography variant="caption" align="left" className={classes.LabelCoordinates}>
                        {lat}, {lng}
                    </Typography>

                    <Container className={classes.ContainerRating}>
                        <Rating
                            emptySymbol={<StarBorderIcon className={classes.IconRating}/>}
                            fullSymbol={<StarIcon className={classes.IconRating}/>}
                            initialRating={rating}
                            readonly
                            fractions={2}
                            onChange={( value ) => handleChangeRating(value)}
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
            {openNewRatingCard 
                && <NewRatingCard/>
            }
            <CalificationList/>
        </Container>

        {/* The user is Loggedin and already has a rating of this shop? */ }
        {hasUser && hasRating 
            /* The User has open a comment card? */
            ?   !openNewRatingCard
                &&  <Container className={classes.ContainerMakeComment}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={ ( e ) => addRating(e)}
                        >
                            Calificar
                        </Button>
                    </Container>
            : null 
        } 

        </>
    )
}

const mapStatetoProps = state => {
    return {
        activeUser: state.user,
        shop: state.shopSelected,
        openNewRatingCard : state.openNewRatingCard
    }
}

const mapDispatchToProps = {
    openShopDetails,
    clearShopData,
    setOpenNewRatingCard,
}

export default connect(mapStatetoProps, mapDispatchToProps)(withTracker(({ activeUser, shop }) =>{
    return {
        hasRating: !Boolean(Califications.findOne({ 'author._id': activeUser._id, shop_id : shop._id })),
    };
})(DetailShop));