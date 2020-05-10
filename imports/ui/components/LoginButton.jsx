/** Libraries */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles/';
import { Button, IconButton } from '@material-ui/core';
import firebase from '../../utils/firebaseConfiguration.js';

/** Icons */
import { Icon, InlineIcon } from '@iconify/react';
import google from '@iconify/icons-mdi/google';
import facebook from '@iconify/icons-mdi/facebook';

/** Styles */
const useStyles = makeStyles(theme => ({
    Button_LoginFacebook:{
        marginLeft: theme.spacing(2),
        backgroundColor: '#3a5997',
        color: '#fff',
        '&:hover':{
            backgroundColor: '#365899'
        }
    },
    Button_LoginGoogle:{
        marginLeft: theme.spacing(2),
        backgroundColor: '#fff',
    },    
}));


export default LoginButton = () => {
    const classes = useStyles();

    facebookLogin = () => {
        let provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then( result => {
            console.log(result);            
        })
    }

    googleLogin = () => {
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then( result => {
            console.log(result);   
            firebase.auth().currentUser.getIdToken(true).then( idToken => {
                console.log(idToken)
                // Send token to your backend via HTTPS
                // ...
            }).catch( error => {
                console.log(error)
            });         
        })
    }


    return(
        <>
            <Button  
                variant="contained"
                className={classes.Button_LoginFacebook}
                onClick={facebookLogin}
                startIcon={<InlineIcon icon={facebook}/>}
            >
                Ingresar Con Facebook
            </Button>
            <Button  
                variant="contained"
                className={classes.Button_LoginGoogle}
                onClick={googleLogin}
                startIcon={<InlineIcon icon={google}/>}
            >
                Ingresar Con Google
            </Button>
        </>
    )
};