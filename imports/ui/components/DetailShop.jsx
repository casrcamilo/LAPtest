/** Libraries */
import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles/';
import { Container, Grid, Typography, IconButton, Avatar, Icon, Button, } from '@material-ui/core';
import Rating from 'react-rating' 

/** Components */
import CalificationList from './CalificationList'

/** Icons */
import CloseIcon from '@material-ui/icons/Close';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

/** API & Utils */
import { Califications } from '../../api/Califications';
import { shopTypesList } from '../../utils/shoptypes'
import { openShopDetails } from '../../actions'

/** Styles */
const useStyles = makeStyles(theme => ({
    ContainerMain:{
        padding: '10px 10px 0 10px',
        borderRadius: '10px 10px 0 0',
        backgroundColor: 'white',
        height:'35%'
    },
    ContainerCloseButton:{
        textAlign: 'right',
        padding: 0
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

const DetailShop = ({ activeUser, shop, openShopDetails }) => {
    const classes = useStyles();

    exitClick = () => {
        openShopDetails(false);
    }

    handleChangeRating = ( value ) => {
        value.preventDefault
        console.log(value);
    }

    return (
        <>
        <Container className={classes.ContainerMain}>
            <Container className={classes.ContainerCloseButton}>
                <Grid container>
                    <Grid item xs={10}>
                        <Typography variant="h4" align="left" display="block">
                            Información
                        </Typography>
                    </Grid>   
                    <Grid item xs={2}>
                        <IconButton className={classes.CloseButton} onClick={exitClick}>
                            <CloseIcon fontSize="small" />
                        </IconButton>                  
                    </Grid> 
                </Grid>
            </Container>
            <Grid container className={classes.ContainerShopInfo} spacing={2} >
                <Grid item xs={3}>
                        {shopTypesList.map( shopType =>
                            shopType.value === shop.shopType 
                            &&  <Avatar key={shopType.icon} className={classes.AvatarShopType} style={{backgroundColor: shopType.color}}>
                                    <Icon className={classes.ShopTypeIcon}>
                                        {shopType.icon}
                                    </Icon>
                                </Avatar>
                        )}
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="h5" align="left" display="block">
                        {shop.shopName}
                    </Typography>
                    <Typography variant="caption" align="left" className={classes.LabelCoordinates}>
                        {shop.lat}, {shop.lat}
                    </Typography>

                    <Container className={classes.ContainerRating}>
                        <Rating
                            emptySymbol={<StarBorderIcon className={classes.IconRating}/>}
                            fullSymbol={<StarIcon className={classes.IconRating}/>}
                            initialRating={4.5}
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
            <CalificationList/>
        </Container>

        {/* The user already has a rating of this shop? */
        !Califications.findOne({ 'author.id': activeUser._id, shop_id : shop._id })
            &&  <Container className={classes.ContainerMakeComment}>
                    <Button
                        variant="contained"
                        color="primary"
                    >
                        Calificar
                    </Button>
                </Container>
        }

        </>
    )
}

const mapStatetoProps = state => {
    return {
        activeUser: state.user,
        shop: state.shopSelected
    }
}

const mapDispatchToProps = {
    openShopDetails,
}

export default connect(mapStatetoProps, mapDispatchToProps)(DetailShop)