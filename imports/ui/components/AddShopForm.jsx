/** Libraries */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
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
    ListItem
} from '@material-ui/core';

/** API & Utils */
import { shopTypesList } from '../../utils/shoptypes'
import { Shops } from '../../api/Shops';
import { openAddShopForm, setNewShopData, clearShopData } from '../../actions'

/** Icons */
import CloseIcon from '@material-ui/icons/Close';
import RoomIcon from '@material-ui/icons/Room';


/** Styles */
import theme from '../../styles/Theme';
const useStyles = makeStyles(theme => ({
    Container:{
        textAlign: 'center',
    },
    CloseIcon:{
        position: 'absolute',
        top: 5,
        right: 5,
    },
    ButtonSubmit:{
        marginTop: 10,
    }
}));


const AddShopForm = ({ user, newShop, openAddShopForm, setNewShopData, clearShopData }) => {
    const classes = useStyles(); 
    const [ shopName, setShopName ] = useState(newShop.shopName);
    const [ shopType, setShopType ] = useState(newShop.shopType);
    const [ errorFields, setErrorFields ] = useState({
        shopName: false,
        shopType: false
    })

    handleBlur = ( e ) => {
        var { name, value } = e.target;
        setNewShopData({[name]: value});
    }

    handleSubmit = () => {
        //Create a new Shop
        Shops.insert({ ...newShop, 'userId': user._id})

        //Clear shop data
        clearShopData({})

        //Close Form Popup
        openAddShopForm(false)
    }

    exitClick = () => {
        openAddShopForm(false);
    }

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
                    {newShop.lat}, {newShop.lng}
                </Typography>
        
                <FormControl required margin="normal" color="primary" fullWidth error={errorFields.shopName}>
                    <InputLabel htmlFor="form-shopName">Nombre del sitio</InputLabel>
                    <Input  id="form-shopName" 
                            type="text" 
                            name="shopName" 
                            fullWidth
                            value={shopName}
                            onChange={ ( e ) => setShopName(e.target.value) }
                            aria-describedby="form-shopName-errorText"
                            onBlur={ ( e ) => handleBlur(e) }
                            variant="outlined"
                            startAdornment={
                                <InputAdornment position="start">
                                    <RoomIcon />
                                </InputAdornment>
                            }
                    />
                    {errorFields.shopName && <FormHelperText id="form-shopName-errorText" error >Este campo es obligatorio</FormHelperText> }
                </FormControl>

                <FormControl required margin="normal" color="secondary" fullWidth error={errorFields.shopType}>
                    <InputLabel htmlFor="form-shopType">Tipo de establecimiento</InputLabel>
                    <Select id="form-shopType" 
                            type="text" 
                            name="shopType" 
                            fullWidth
                            value={shopType}
                            defaultValue={newShop.shopType}
                            aria-describedby="form-shopType-errorText"
                            onChange={ ( e ) => setShopType(e.target.value) }
                            onBlur={ ( e ) => handleBlur(e) }
                    >
                        {shopTypesList.map( type => {
                            return (
                                <MenuItem key={type.value} value={type.value}>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Icon> {type.icon} </Icon>
                                        </ListItemIcon>
                                        <ListItemText primary={type.label} />
                                    </ListItem>
                                </MenuItem>
                            )
                        })}
                    </Select>
                    {errorFields.shopType && <FormHelperText id="form-shopType-errorText" error >Por favor selecciona un valor</FormHelperText> }
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
    )
}

const mapStateToProps = ( state ) => {
    return {
        newShop: state.newShop,
        user: state.user
    }
}

const mapDispatchtoProps = {
    openAddShopForm,
    setNewShopData,
    clearShopData
}

export default connect(mapStateToProps, mapDispatchtoProps)(AddShopForm);